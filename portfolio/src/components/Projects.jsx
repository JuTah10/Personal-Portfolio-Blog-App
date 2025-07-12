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
        github: "https://github.com/JuTah10/react-ecommerce-clothing-store",
        live: "https://react-ecommerce-clothing-store.onrender.com/"
    },
    {
        link: "/BlogScreenShoot.avif",
        name: "blog page",
        description: "A full-stack blog where admin can publish posts and users can like or comment. It includes a login system with optional guest access, notifications feature for post interactions, and user profiles to update info and track past activity.",
        languagesUsed: "Next.js, Prisma, Clerk, Tailwind CSS",
        github: "https://github.com/JuTah10/Personal-Portfolio-Blog-App",
        live: ""
    },
    {
        link: "/Portfolio.avif",
        name: "portfolio",
        description: "A personal portfolio showcasing projects, posts, and skills. It features smooth UI/UX powered by modern frameworks and animation libraries for a polished, interactive experience.",
        languagesUsed: "React.js, Tailwind CSS, ShadCN, Framer Motion, Material UI",
        github: "https://github.com/JuTah10/Personal-Portfolio-Blog-App",
        live: ""
    }]

    const additionalProjects = [
        {
            name: "CoExistenceNetworkedGame",
            description: "A networked multiplayer card game inspired by rock-paper-scissors using sockets and threads to support concurrent 2-player matches with a Swing GUI client.",
            languagesUsed: "Java, Java Swing, Socket Programming, Multithreading",
            github: "https://github.com/JuTah10/CoExistenceNetworkedGame",
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
        <div key="projects" className='mb-20'>
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
                                <img src={item.link} className='h-full w-full rounded-3xl brightness-75' />
                                <div className='absolute bottom-5 md:bottom-10 w-full flex flex-col items-center text-center gap-2 text-white'>
                                    <h1 className='text-lg md:text-2xl font-bold'>{item.name}</h1>
                                    <p className='hidden md:block max-w-1/2 text-xs font-bold'>{item.description}</p>
                                    <div className='text-[10px] sm:text-xs font-bold text-emerald-500 max-w-[70%]'>{item.languagesUsed}</div>
                                    <div className='flex gap-2 items-center'>
                                        {item.github &&
                                            <Github
                                                className='w-5 h-5 hover:scale-125 cursor-pointer hover:transition-transform hover:duration-150'
                                                onClick={() =>
                                                    window.open(item.github)
                                                }
                                            />
                                        }
                                        {item.live &&
                                            <ExternalLink
                                                className='w-5 h-5 hover:scale-125 cursor-pointer hover:transition-transform hover:duration-150'
                                                onClick={() =>
                                                    window.open(item.live)
                                                }
                                            />
                                        }
                                    </div>

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

            <div className="h-[900px] sm:h-[700px] mx-4 xl:mx-28 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-2 ">

                {additionalProjects.map((project, index) => (
                    <motion.div
                        key={index} className="bg-accent rounded-3xl p-5 space-y-4 hover:-translate-y-2 "
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >

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

                        <h1 className='text-xl md:text-2xl font-bold break-words'>
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
        </div>
    )
}
