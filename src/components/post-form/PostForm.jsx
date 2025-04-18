import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Compressor from "compressorjs";
import ProgressBar from "react-topbar-progress-indicator";

ProgressBar.config({
    barColors: {
      "0": "#F72A01", 
      "0.5": "#DFDAF7",       
      "1.0": "#DFDAF7", 
    },
    shadowBlur: 10,
    barThickness: 7,
    shadowColor: "rgba(0, 0, 0, 0.5)",
});

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const [btnDis, setBtnDis] = useState(false); // Use state for button disabled
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.1,
                success(result) {
                    const compressedFile = new File([result], file.name, {
                        type: result.type,
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const submit = async (data) => {
        setBtnDis(true); // Disable the button on submit
        setLoading(true);
        try {
            let compressedFile = null;

            if (data.image[0]) {
                compressedFile = await compressImage(data.image[0]);
            }

            if (post) {
                const file = compressedFile ? await appwriteService.uploadFile(compressedFile) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(compressedFile);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Image compression or upload failed:", error);
        } finally {
            setLoading(false);
            setBtnDis(false); // Re-enable the button after processing
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div>
            {loading && <ProgressBar />}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-main-color" : undefined} className="w-full" disabled={btnDis}>
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
