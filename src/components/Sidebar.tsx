import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  XIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Logo from "components/Logo";
import { classNames } from "utils";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", icon: HomeIcon, current: false },
    { name: "Groups", href: "/groups", icon: UserGroupIcon, current: false },
  ]);
  const { pathname } = useLocation();
  useEffect(() => {
    const updatePathName = pathname.split("/")[1].toLowerCase();
    setNavigation(
      navigation.map((item) => {
        if (
          item.name.toLowerCase() === updatePathName ||
          (pathname === "/" && item.name.toLowerCase() === "home")
        ) {
          item.current = true;
        } else {
          item.current = false;
        }

        return item;
      })
    );
  }, [pathname]);
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Logo />
              </div>
              <nav
                className="mt-20 flex-shrink-0 h-full divide-y divide-gray-300 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-blue-600 text-white"
                          : " text-gray-800 hover:bg-gray-200",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "mr-4 flex-shrink-0 h-6 w-6"
                            : "mr-4 flex-shrink-0 h-6 w-6 text-zinc-600"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow border-r border-gray-300 bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Logo />
          </div>
          <nav
            className="mt-20 flex-1 flex flex-col divide-y divide-blue-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-600 text-white"
                      : "text-gray-800 hover:bg-gray-200",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "mr-4 flex-shrink-0 h-6 w-6"
                        : "mr-4 flex-shrink-0 h-6 w-6 text-zinc-600"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
