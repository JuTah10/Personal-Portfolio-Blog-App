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
    const nextButtonRef = React.useRef(null)

    React.useEffect(() => {
        const interval = setInterval(() => {
            nextButtonRef?.current.click();
        }, 7000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            key="projects"

        >
            <div className='flex items-center gap-4'>
                <h1 className='text-2xl md:text-4xl font-bold'>/ projects</h1>
                <hr className='hidden md:block w-[30%] mt-4' />
            </div>

            {/* Slider */}
            <Carousel
                className="h-[500px] my-12 border rounded-3xl mx-8"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    <CarouselItem>1</CarouselItem>
                    <CarouselItem>2</CarouselItem>
                    <CarouselItem>3</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext ref={nextButtonRef} />
            </Carousel>
        </motion.div>
    )
}
