import Introduction from "@/components/Introduction";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
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
