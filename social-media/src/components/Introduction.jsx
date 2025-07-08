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
        <div className="flex flex-col-reverse items-center justify-evenly md:flex-row md:gap-12 h-full ">
            {/* Text Content */}
            <motion.div
                className="text-center md:text-left max-w-xl space-y-4"
                initial={{ opacity: 0, x: 100, y: 100, filter: 'blur(8px)', scale: 0.7 }}
                animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <h1 className="text-4xl font-bold">
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
                        <motion.div key={index} variants={itemVariants}>
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
