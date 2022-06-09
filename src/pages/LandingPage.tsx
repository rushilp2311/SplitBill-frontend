import {
  DocumentReportIcon,
  UserGroupIcon,
  CollectionIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Header from "../components/Header";
import Button from "../components/Button";
import HashNodeLogo from "../images/hashnode.png";
import { ReactComponent as PieChart } from "../images/pie-chart.svg";
import { ReactComponent as CircleGroup } from "../images/circle-group.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const features = [
  {
    name: "Group Expenses",
    description: "Share your expenses among group of friends with ease.",
    icon: UserGroupIcon,
  },
  {
    name: "Manage Expenses",
    description:
      "Keep track of your expenses. Manage whom you owe and also who owes you.",
    icon: CollectionIcon,
  },
  {
    name: "Share it Individually",
    description: "Share the bill with your friends individually.",
    icon: UserIcon,
  },

  {
    name: "Expense Reporting",
    description: "Track all your expenses with our reporting service.",
    icon: DocumentReportIcon,
  },
];

export default function LandingPage() {
  useEffect(() => {
    document.title = "SplitBill | Home";
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative sm:overflow-hidden">
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-gray-800">
                    Split bills with your friends
                  </span>
                  <span className="block text-blue-600">
                    without any hassle
                  </span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-500 sm:max-w-3xl">
                  Split bills with your friends easily and efficiently. Register
                  today with your friends
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-10 sm:flex sm:justify-center">
                  <Link to="/signup" className="w-full">
                    <Button width="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Cloud */}
        <div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
              Checkout the article on
            </p>
            <div className="mt-6">
              <div className="flex justify-center">
                <img src={HashNodeLogo} alt="hashnode" className="max-w-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Alternating Feature Sections */}
        <div className="relative pt-16 pb-32 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 " />
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <PieChart className="h-12 w-12" />
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Stay on top of your bills
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      No need to remember the expenses. Use{" "}
                      <span className="font-bold">Split Bill</span> to keep
                      track of your bills and share your expenses with your
                      friends.
                    </p>
                    <div className="mt-6">
                      <Link to="/signup">
                        <Button margin="m-0">Get Started</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <CircleGroup />
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Create Groups for easy management
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Want to share your expenses with group of friends? No
                      worries create groups and share it easily.
                    </p>
                    <div className="mt-6">
                      <Button>Get Started</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Feature Section */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Our Features
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-200">
              SplitBill has lots of features. Explore the features below to know
              what you are missing out on.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-blue-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="mt-12 xl:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Follow Me
              </h3>
              <div className="mt-6 w-fit flex justify-between items-center">
                <div>
                  <a
                    href="https://github.com/rushilp2311"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 text-gray-600 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                <a
                  href="https://rushilpatel.hashnode.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={HashNodeLogo} alt="hashnode" className="h-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              Heavily inspired by Tailwind UI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
