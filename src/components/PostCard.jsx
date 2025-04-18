import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const previewUrl = appwriteService.getFilePreview(featuredImage);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full rounded-xl p-4 hover:bg-light-main duration-200 border border-solid ' style={{ height: '450px'}}>
                <div className='w-full h-4/5 flex justify-center mb-4'>
                    <img 
                        src={previewUrl} 
                        alt={title} 
                        className='rounded-xl object-cover h-full w-full' 
                        onError={(e) => e.target.style.display = 'none'} 
                        
                    />
                </div>
                <h2 className='text-2xl font-medium pt-2 h-1/5'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;



