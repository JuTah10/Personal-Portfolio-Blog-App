"use client"
import React from 'react'
import { motion } from 'framer-motion'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { FolderClosed, Github, ExternalLink } from 'lucide-react'


export default function Projects() {
    const displaySliderItems = [{
        link: "/HomePage.avif",
        name: "vnwear",
        description: "A modern e-commerce platform for browsing, buying, and securely checking out products - with built-in admin functionality to manage inventory and listings.",
        languagesUsed: "REACT, EXPRESS.JS, POSTGRESQL, DOCKER",
        github: "",
        live: ""
    },
    {
        link: "/HomePage.avif",
        name: "blog page",
        description: "test",
        languagesUsed: "",
        github: "",
        live: ""
    },
    {
        link: "/HomePage.avif",
        name: "portfolio",
        description: "test",
        languagesUsed: "",
        github: "",
        live: ""
    }]

    const additionalProjects = [
        {
            name: "portfolio",
            description: "A modern e-commerce platform for browsing, buying, and securely checking out products - with built-in admin functionality to manage inventory and listings.",
            languagesUsed: "React, Express.JS, Postgresql, Docker",
            github: "",
            live: ""
        },
        {
            name: "portfolio",
            description: "test",
            languagesUsed: "",
            github: "",
            live: ""
        },
        {
            name: "portfolio",
            description: "test",
            languagesUsed: "",
            github: "",
            live: ""
        },
        {
            name: "portfolio",
            description: "test",
            languagesUsed: "",
            github: "",
            live: ""
        }
    ]
    const nextButtonRef = React.useRef(null);
    const [count, setCount] = React.useState(0);
    const [hovered, setHovered] = React.useState(false);


    const [api, setApi] = React.useState();

    const [current, setCurrent] = React.useState(0)




    React.useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                nextButtonRef?.current.click();
            }, 7000)
            return () => clearInterval(interval)
        }
    }, [hovered])


    React.useEffect(() => {
        if (!api) {
            return
        }
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())

        })
    }, [api])

    React.useEffect(() => {
        setCount(current)
    }, [current]);



    return (
        <motion.div
            key="projects"
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ projects</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>

            {/* Slider */}
            <Carousel
                setApi={setApi}
                className="relative w-fit h-fit my-12 mx-4 xl:mx-28 space-y-6"
                opts={{
                    align: "start",
                    loop: true,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <CarouselContent className="max-h-[500px]">
                    {displaySliderItems.map((item, index) => {
                        return (
                            <CarouselItem key={index}>
                                <img src={item.link} className='max-h-full w-full rounded-3xl brightness-75' />
                                <div className='absolute bottom-5 md:bottom-10 w-full flex flex-col items-center text-center gap-2 text-white'>
                                    <h1 className='text-lg md:text-2xl font-bold'>{item.name}</h1>
                                    <p className='hidden md:block max-w-1/2 text-xs font-bold'>{item.description}</p>
                                    <div className='text-xs font-bold text-emerald-500'>{item.languagesUsed}</div>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>

                {/* slider tracker */}
                <div className='flex justify-center items-center gap-2'>
                    {displaySliderItems.map((_, index) => {
                        return (
                            <div key={index} className={`${index === count ? "bg-current" : "bg-accent brightness-95"} w-7 h-[3px] flex-shrink-0`} />
                        )
                    })}
                </div>

                {/* Slider Buttons */}
                <div
                    onClick={() => setCount((prev) => (prev === 0 ? 2 : prev - 1))}
                >
                    <CarouselPrevious
                        className="absolute left-10 bottom-1/2 cursor-pointer" />
                </div>
                <div
                    onClick={() => setCount((prev) => (prev === 2 ? 0 : prev + 1))}
                >
                    <CarouselNext className="absolute right-10 bottom-1/2 cursor-pointer" ref={nextButtonRef} />
                </div>

            </Carousel>

            {/* Additional Projects */}

            <div className="h-[900px] sm:h-[800px] mx-4 xl:mx-28 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 ">

                {additionalProjects.map((project, index) => (
                    <motion.div key={index} className="bg-accent rounded-3xl p-5 space-y-4">
                        {/* Header */}
                        <div className='flex justify-between items-center'>
                            <FolderClosed className='w-7 h-7' />
                            <div className='flex gap-2 items-center'>
                                {project.github &&
                                    <Github className='w-5 h-5 hover:scale-125 cursor-pointer hover:transition-transform hover:duration-150' />
                                }
                                {project.live &&
                                    <ExternalLink className='w-5 h-5 hover:scale-125 cursor-pointer hover:transition-transform hover:duration-150' />
                                }


                            </div>
                        </div>

                        <h1 className='text-xl md:text-2xl font-bold '>
                            {project.name}
                        </h1>
                        <p className='text-sm sm:text-md'>
                            {project.description}
                        </p>
                        <p className='text-sm sm:text-md mt-15'>
                            {project.languagesUsed}
                        </p>
                    </motion.div>
                ))}

            </div>


        </motion.div>
    )
}
