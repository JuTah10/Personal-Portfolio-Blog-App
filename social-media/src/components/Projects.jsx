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

export default function Projects() {
    const nextButtonRef = React.useRef(null);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            nextButtonRef?.current.click();
        }, 7000)
        return () => clearInterval(interval)
    }, [])


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
                className="relative w-fit h-fit my-12 mx-4 xl:mx-28 "
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="max-h-[500px]">
                    <CarouselItem><img src="/HomePage.avif" className='max-h-full w-full rounded-3xl brightness-75' /></CarouselItem>
                    <CarouselItem>2</CarouselItem>
                    <CarouselItem>3</CarouselItem>
                </CarouselContent>
                <div>
                    <CarouselPrevious
                        className="absolute left-10 top-1/2 cursor-pointer"
                        onClick={() => {
                            setCount(prev => prev - 1)
                            if (count === -1) {
                                setCount(2);
                            }
                        }}
                    />
                </div>
                <div
                   
                    onClick={() => setCount((prev) => (prev === 3 ? 0 : prev + 1))}
                >
                    <CarouselNext  className="absolute right-10 top-1/2 cursor-pointer" ref={nextButtonRef} />
                </div>
            </Carousel>
        </motion.div>
    )
}
