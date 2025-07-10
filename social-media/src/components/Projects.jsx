"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function Projects() {
    return (
        <motion.div
            key="projects"
        >
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ projects</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>
        </motion.div>
    )
}
