import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Breadcrumb = ({ paths }: any) => {
  return (
    <div>
      <nav className="sm:hidden" aria-label="Back">
        <Link
          to={paths[0].to}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon
            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Back
        </Link>
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div className="flex">
              <Link
                to="/"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Home
              </Link>
            </div>
          </li>
          {paths.map((path: any) => {
            return (
              <li key={path.to}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <Link to={path.to}>
                    <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      {path.name}
                    </p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
