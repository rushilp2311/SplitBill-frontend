import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import Sidebar from "components/Sidebar";
import Profile from "components/Profile";
import { Toast } from "components";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = "SplitBill - Dashboard";
  }, []);

  return (
    <>
      <div className="h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-64 flex flex-col flex-1 h-full">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex-1 px-4 flex justify-end sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">View notifications</span>
                </button>
                <Profile />
              </div>
            </div>
          </div>
          <main className="flex-1 flex-shrink h-[calc(100vh-64px)]">
            <Outlet />
          </main>
        </div>
        <Toast />
      </div>
    </>
  );
}
