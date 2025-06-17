"use client"
import React from 'react'
import BlogPost from './BlogPost'

import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function BlogPostClient({ user, posts }) {
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
        <>
            {posts?.map((post) => {
                return <BlogPost key={post.id} post={post} user={user} />
            })}
        </>
    )
}
