import Sidebar from "@/components/Sidebar";
export default function BlogLayout({ children }) {
  return (
   
      <main>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="hidden lg:block lg:col-span-3">
                <Sidebar />
              </div>
              <div className="lg:col-span-9">
                {children}
              </div>
            </div>

          </div>
        </div>
      </main>

  );
}
