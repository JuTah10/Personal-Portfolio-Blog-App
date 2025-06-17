"use client"
import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function BlogPost({ posts }) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (posts) setLoading(false);
    }, [posts])


    if (loading) return (
        <div className='flex justify-center items-center animate-spin'>
            <AiOutlineLoading3Quarters />
        </div>
    );

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="mb-4 border p-4 rounded">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}
