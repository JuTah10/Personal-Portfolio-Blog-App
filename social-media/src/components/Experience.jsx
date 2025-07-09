"use client"
import React from 'react'
import { motion } from 'framer-motion';

export default function Experience() {
    const [displayExperience, setDisplayExperience] = React.useState("AMAZON");
    const experience = [
        {
            company: "AMAZON",
            title: "Software Development Engineer @ Amazon",
            duration: "JUL 2022 - PRESENT",
            description: [
                "Led development of end-to-end region build automation across Route 53 (AWS's DNS web service). This enabled the launch of customer-facing global services in new regions within a day, a significant reduction from the previous time-frame of a month.",
                "Re-built Route 53's core domain management and DNS systems to provide a better user experience to millions of customers."
            ]

        },
        {
            company: "WATTPAD",
            title: "Associate Engineer @ Wattpad",
            duration: "MAY 2020 - APR 2021",
            description: [
                "Developed a responsive React web page (the new Story Details) from scratch, both on client and server side, for an app with massive scale (2 billion daily requests).",
                "Iteratively built web experiences for 80 million users across high-traffic pages.",
                "Collaborated with senior engineers and product management following best practices for the full software development life cycle, including coding standards, code reviews, source control management, build processes, testing, and operations."
            ]

        }
    ];
    const match = experience.find(((exp) => exp.company === displayExperience))
    return (
        <motion.div>
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ experience</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>
            <div className='sm:flex my-12 text-md md:text-lg space-y-4 md:mx-10'>
                {/* Tabs */}
                <div>
                    {experience.map((exp) => {
                        return (
                            <div
                                key={exp.title}
                                onClick={() => setDisplayExperience(exp.company)}
                            >
                                {exp.company}
                            </div>
                        )
                    })}
                </div>


                <div>
                    <h1>{match?.title}</h1>
                    <p>{match?.duration}</p>
                </div>


            </div>
        </motion.div>
    )
}
