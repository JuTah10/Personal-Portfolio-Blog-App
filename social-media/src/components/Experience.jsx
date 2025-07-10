"use client"
import React from 'react'
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Triangle } from 'lucide-react';
import { RoughNotationGroup, RoughNotation } from 'react-rough-notation';

export default function Experience() {
    const [displayExperience, setDisplayExperience] = React.useState("BROCK UNIVERSITY");
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => setShow(true), 1000)
        return () => clearTimeout(timeout)
    }, [show])
    const experience = [
        {
            company: "BROCK UNIVERSITY",
            title: "Front-End Web Developer @ Brock University",
            duration: "SEP 2024 - PRESENT",
            description: [
                {
                    order: "first-first",
                    list: (
                        <RoughNotationGroup show={show}>
                            Increased student engagement and learning outcomes by developing and customizing interactive Brightspace (D2L) course features such as flash cards, accordions, tabs, quizzes, etc. for
                            <RoughNotation
                                className="mx-1"
                                type="box"
                                color="currentColor"
                                animationDelay={700}
                            >
                                3,000+
                            </RoughNotation>
                            students and instructors using
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                            >
                                React
                            </RoughNotation>
                            ,
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                            >
                                Tailwind CSS
                            </RoughNotation>
                            , and
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                                multiline={true}
                            >
                                modern web technologies
                            </RoughNotation>
                            .
                        </RoughNotationGroup>

                    )
                }
                ,

                {
                    order: "first-second",
                    list: (
                        <span key={"first-second"}>
                            <RoughNotationGroup show={show}>
                                Enhanced course functionality and user experience by
                                <RoughNotation
                                    className="mx-1"
                                    type="underline"
                                    color="currentColor"
                                    animationDelay={700}
                                >
                                    identifying
                                </RoughNotation>
                                ,
                                <RoughNotation
                                    className="mx-1"
                                    type="underline"
                                    color="currentColor"
                                    animationDelay={700}
                                >
                                    troubleshooting
                                </RoughNotation>
                                , and
                                <RoughNotation
                                    className="mx-1"
                                    type="underline"
                                    color="currentColor"
                                    animationDelay={700}
                                    multiline={true}
                                >
                                    resolving frontend issues
                                </RoughNotation>
                                in Brightspace for both students and faculty.
                            </RoughNotationGroup>
                        </span>
                    )
                }
            ]

        },
        {
            company: "BROCK UNIVERSITY ",
            title: "Administrative Technology Assistant @ Brock University",
            duration: "SEP 2024 - PRESENT",
            description: [
                {
                    order: "second-first",
                    list: (
                        <RoughNotationGroup show={show}>
                            Improved operational efficiency by implementing and maintaining key administrative features, such as user roles, authentication, email templates, digital tax form processing, etc. using
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                                multiline={true}
                            >
                                Modern Campus Destiny One
                            </RoughNotation>
                            , effectively
                            <RoughNotation
                                className="mx-1"
                                type="box"
                                color="currentColor"
                                animationDelay={700}
                                multiline
                            >
                                doubling workflow speed
                            </RoughNotation>
                            and
                            <RoughNotation
                                className="mx-1"
                                type="box"
                                color="currentColor"
                                animationDelay={700}
                                multiline
                            >
                                streamlining backend operations
                            </RoughNotation>
                            for the department.
                        </RoughNotationGroup>
                    )
                }
                ,
                {
                    order: "second-second",
                    list: (
                        <RoughNotationGroup show={show}>
                            Supported educational technology initiatives by coordinating with internal departments and external vendors to ensure smooth
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                                multiline={true}
                            >
                                project execution
                            </RoughNotation>
                            ,
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                                multiline={true}
                            >
                                system configuration
                            </RoughNotation>
                            , and
                            <RoughNotation
                                className="mx-1"
                                type="underline"
                                color="currentColor"
                                animationDelay={700}
                                multiline={true}
                            >
                                communication
                            </RoughNotation>
                            .
                        </RoughNotationGroup>
                    )
                }
            ]

        }
    ];
    const match = experience.find(((exp) => exp.company === displayExperience))
    const activeIndex = experience.findIndex(exp => exp.company === displayExperience);

    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}

        >
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ experience</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>
            <div className='sm:flex gap-10 my-12 text-md md:text-lg space-y-4 '>
                {/* Tabs */}
                <div className='relative flex flex-col border-r-2 space-y-4 '>
                    <motion.div
                        layoutId="active-indicator"
                        className="absolute right-0 w-0.5 h-9 bg-accent-foreground rounded"
                        style={{
                            top: `${activeIndex * 40}px`,
                            transition: 'top 0.3s ease',
                        }}
                    />
                    {experience.map((exp) => {
                        return (
                            <Button
                                key={exp.title}
                                variant="text"
                                color="inherit"
                                sx={{
                                    whiteSpace: "nowrap", whiteSpace: "nowrap",
                                    fontWeight: displayExperience === exp.company ? 'bold' : 'normal',
                                    color: displayExperience === exp.company ? '' : 'gray',
                                    pr: {
                                        xs: "50%",
                                        sm: "100px"
                                    },
                                    pl: {
                                        sm: "40px"
                                    },


                                }}
                                onClick={() => {
                                    setShow(false);
                                    setDisplayExperience(exp.company)
                                }}

                            >
                                {exp.company}
                            </Button>
                        )
                    })}
                </div>


                <div className='space-y-6'>
                    <div className='space-y-2'>
                        <h1 className='text-xl md:text-2xl font-bold'>{match?.title}</h1>
                        <p className='text-gray-500'>{match?.duration}</p>
                    </div>
                    {match?.description.map((m, index) => {
                        return (
                            <motion.div
                                key={m.order}
                                initial={{ opacity: 0, y: 200 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                                onViewportEnter={() => {
                                    setShow(false);
                                    const timeout = setTimeout(() => setShow(true), 1500)
                                    return () => clearTimeout(timeout)
                                }}
                            >
                                <motion.div
                                    className="flex gap-4"
                                    initial={{ opacity: 0, y: 200 }}
                                    viewport={{ once: true }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}

                                >
                                    <Triangle className="size-2 flex-shrink-0 mt-2 rotate-90 fill-accent-foreground" />
                                    <span>{m.list}</span>
                                </motion.div>
                            </motion.div>


                        )
                    })}

                </div>


            </div>
        </motion.div >
    )
}
