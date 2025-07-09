"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

import { Github, Linkedin, Mail } from 'lucide-react';


export default function Introduction() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };
    return (
        <div className="mx-4 h-[calc(100vh-66px)] pb-20 flex flex-col-reverse items-center justify-evenly md:flex-row md:gap-12">
            {/* Text Content */}
            <motion.div
                className="text-center md:text-left max-w-xl space-y-4"
                initial={{ opacity: 0, x: 100, y: 100, filter: 'blur(8px)', scale: 0.7 }}
                animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <h1 className="text-5xl font-bold">
                    <TypeAnimation
                        sequence={[
                            500,
                            "Hi, Vu here."
                        ]}
                        speed={5}

                    />

                </h1>
                <p className="text-lg font-medium">
                    Computer Science Student & Software Engineer
                </p>
                <div>
                    I love building web apps, full-stack platforms, AI-powered tools, random stuff, and anything that challenges me to grow.
                </div>
                <p>
                    I'm especially fascinated by large-scale, high-impact products.
                </p>
                <motion.div
                    className="flex gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[<Github />, <Linkedin />, <Mail />].map((Icon, index) => (
                        <motion.div
                            className='hover:scale-125 cursor-pointer hover:transition-transform hover:duration-150'
                            key={index}
                            variants={itemVariants}
                            onClick={() =>
                                window.open(
                                    index === 0
                                        ? "https://github.com/JuTah10"
                                        : index === 1
                                            ? "https://www.linkedin.com/in/vu-nguyen-5a739026b/"
                                            : "mailto:vn22dy@brocku.ca"
                                )
                            }
                        >
                            {Icon}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
                initial={{ opacity: 0, x: -100, y: 100, filter: 'blur(8px)', scale: 0.7 }}
                animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-60 h-60 rounded-full overflow-hidden border"
            >
                <img
                    src="https://avatars.githubusercontent.com/u/126214032?v=4"
                    alt="Vu's avatar"
                    className="object-cover w-full h-full"
                />
            </motion.div>



        </div>
    )
}
