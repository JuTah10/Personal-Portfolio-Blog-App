import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function BlogLayout({ children }) {
  return (  
        <main
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      Side bar
                    </div>
                    <div className="lg:col-span-9">
                      {children}
                    </div>
                  </div>

                </div>
              </main>       
        </main>
      
  );
}
