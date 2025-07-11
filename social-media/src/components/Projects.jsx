"use client"
import React from 'react'
import { motion } from 'framer-motion'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi
} from "@/components/ui/carousel"


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
                                    <h1 className='text-xl md:text-2xl font-bold'>{item.name}</h1>
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
                    <motion.div key={index} className=" bg-gray-800 rounded-3xl p-5">
                        {/* Header */}
                        
                    </motion.div>
                ))}

            </div>


        </motion.div>
    )
}
