import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-1/3"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                            <i class="fa-regular fa-pen-to-square" style={{fontSize: '2rem', color: "#333333", cursor: "pointer", marginRight: '1.5rem'}}></i>
                            </Link>
                            <i class="fa-regular fa-trash-can" onClick={deletePost} style={{fontSize: '2rem', color: "#333333", cursor: "pointer", marginRight: '1rem'}}></i>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-semibold text-text-color mt-10">{post.title}</h1>
                </div>
                <div className="browser-css">
                    <p className="leading-loose text-lg text-text-color">
                    {parse(post.content)}
                    </p>
                    
                    </div>
            </Container>
        </div>
    ) : null;
}