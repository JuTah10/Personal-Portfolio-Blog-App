"use client"
import React from "react";
import Introduction from "@/components/Introduction";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start", })
      }, 0)
    }
  }, [pathname])

  return (
    <div>
      <Introduction />
      <div className='mx-[20px] lg:mx-[10%] space-y-30'>
        <AboutMe />
        <Experience />
        <Projects />
      </div>

    </div>
  );
}
