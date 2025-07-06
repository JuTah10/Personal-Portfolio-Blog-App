"use client"
import React from 'react'
import { usePathname } from 'next/navigation';

import BlogPost from './BlogPost'

import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function BlogPostClient({ user, posts }) {
    const pathname = usePathname();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (posts) setLoading(false);
    }, [posts])

    React.useEffect(() => {
        const hash = window.location.hash.replace('#', '')
        if (hash) {
            setTimeout(() => {
                document.getElementById(hash)?.classList.add('ring-2', 'ring-red-500')
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })


            }, 50)
        }
    }, [pathname])

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
