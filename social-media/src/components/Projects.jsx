"use client"
import React from 'react'
import { hover, motion } from 'framer-motion'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Projects() {
    const displaySliderItems = ["/HomePage.avif", "/", "/"]
    const nextButtonRef = React.useRef(null);
    const [count, setCount] = React.useState(0);
    const [hovered, setHovered] = React.useState(false);

    React.useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                nextButtonRef?.current.click();
            }, 7000)
            return () => clearInterval(interval)
        }
    }, [hovered])


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
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <CarouselContent className="max-h-[500px]">
                    {displaySliderItems.map((item) => {
                        return (
                            <CarouselItem>
                                <img src={item} className='max-h-full w-full rounded-3xl brightness-75' />
                            </CarouselItem>
                        )
                    })}

                </CarouselContent>
                <div
                    onClick={() => setCount((prev) => (prev === -1 ? 2 : prev - 1))}
                >
                    <CarouselPrevious
                        className="absolute left-10 top-1/2 cursor-pointer" />
                </div>
                <div
                    onClick={() => setCount((prev) => (prev === 3 ? 0 : prev + 1))}
                >
                    <CarouselNext className="absolute right-10 top-1/2 cursor-pointer" ref={nextButtonRef} />
                </div>
            </Carousel>
        </motion.div>
    )
}
