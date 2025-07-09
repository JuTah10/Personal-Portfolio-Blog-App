"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';



export default function Aboutme() {
    let x = 1;
    const recentLanguages = ["JavaScript", "React.js", "Java", "SQL", "Python", "C++"]
    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='mx-[20px] lg:mx-[10%]'
        >
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ about me</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>

            <div className='my-12 text-md md:text-lg space-y-4'>
                <p>I'm a 3rd-year Computer Science student at Brock University and currently working as a Front-End Web Developer / Administrative Technology Assistant at the university.</p>
                <p >Here are some languages I have been working with:</p>
                <div className='grid grid-cols-2 max-w-[300px]'>
                    {recentLanguages.map((language, index) => {
                        // if index is an odd number 
                        if (index % 2 === 0) {
                            return (
                                <motion.div
                                    key={language}
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, y: 200 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.0, delay: index * 0.1, ease: "easeOut" }} // 1
                                >
                                    <Triangle className='rotate-90 size-2 fill-accent-foreground' />
                                    <span>{language}</span>
                                </motion.div>
                            )

                        }
                        else { //even
                            return (
                                <motion.div
                                    key={language}
                                    className='flex items-center gap-2'
                                    initial={{ opacity: 0, y: 200 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.0, delay: (index - 1) * 0.1, ease: "easeOut" }} // 1
                                >
                                    <Triangle className='rotate-90 size-2 fill-accent-foreground' />
                                    <span>{language}</span>
                                </motion.div>
                            )
                        }

                    })}
                </div>
                <p>When I’m not coding, I enjoy learning about AI, exploring new developer tools. I also play a lot of video games.</p>
            </div>

        </motion.div >
    )
}
