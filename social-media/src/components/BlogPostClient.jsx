"use client"
import React from 'react'
import BlogPost from './BlogPost'
import { fetchPosts } from '@/actions/post'


export default function BlogPostClient() {
    let posts = null
    React.useEffect(() => {
        async function fetchPost() {
            posts = await fetchPosts();
        }
        fetchPost();

    }, [posts])
    return (
        <>
            {posts.map((post) => {
                return <BlogPost key={post.id} post={post} user={user} />
            })}
        </>
    )
}
