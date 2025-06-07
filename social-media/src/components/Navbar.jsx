import React from 'react'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50'>
            <div className='max-w-[80%] mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <Link
                            href="/"
                            className='text-xl font-bold text-primary font-mono tracking-wider'
                        >
                            Vu Nguyen
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

