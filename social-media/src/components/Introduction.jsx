"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation';


export default function Introduction() {
    return (
        <div className="flex flex-col-reverse items-center justify-evenly md:flex-row md:gap-12 h-full ">
            {/* Text Content */}
            <div className="text-center md:text-left max-w-xl space-y-4">
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
                <div>
                    <p>Socials</p>
                </div>
            </div>

            {/* Image */}
            <div className="w-60 h-60 rounded-full overflow-hidden border">
                <img
                    src="https://avatars.githubusercontent.com/u/126214032?v=4"
                    alt="Vu's avatar"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}
