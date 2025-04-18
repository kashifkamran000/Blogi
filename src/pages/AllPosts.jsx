import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await appwriteService.getPosts([]);
                console.log("Posts response:", postsResponse);

                if (Array.isArray(postsResponse)) {
                    setPosts(postsResponse);
                } else {
                    console.error("Unexpected posts response format:", postsResponse);
                    setPosts([]);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <h1 className='text-3xl text-center font-medium p-4 mb-4'>All Posts</h1>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
