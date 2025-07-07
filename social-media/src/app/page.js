export default function Home() {
  return (
    <div className="mx-4 h-[calc(100vh-66px)] pb-20">
      {/* Introduction Level */}
      <div className="flex flex-col-reverse items-center justify-evenly md:flex-row md:gap-12 h-full ">

        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl space-y-4">
          <h1 className="text-4xl font-bold">Hi, Vu here.</h1>
          <p className="text-lg font-medium">
            Computer Science Student & Software Engineer
          </p>
          <p>
            I love building — web apps, full-stack platforms, AI-powered tools, and anything that challenges me to grow.
          </p>
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
    </div>
  );
}
