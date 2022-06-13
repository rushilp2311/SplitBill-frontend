import { PlusCircleIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import GroupContext from "contexts/GroupContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Groups = () => {
  const { groupList } = useContext(GroupContext);
  const people = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      role: "Admin",
    },
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      role: "Admin",
    },
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      role: "Admin",
    },
    // More people...
  ];
  return (
    <div>
      {/* Page Heading */}
      <div className="mt-4 flex-1 px-4 flex flex-col justify-end sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
        <div>
          <nav className="sm:hidden" aria-label="Back">
            <a
              href="#"
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ChevronLeftIcon
                className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Back
            </a>
          </nav>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
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
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Groups
                  </p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Your Groups
            </h2>
          </div>
          <div className="hidden md:flex mt-4 flex-shrink-0 md:mt-0 md:ml-4">
            <Link to="/addgroup">
              <Button leftIcon={<PlusCircleIcon className="w-5" />}>
                Add Group
              </Button>
            </Link>
          </div>
          <div className="flex-shrink-0 flex md:hidden md:mt-0 md:ml-4">
            <Link to="/addgroup">
              <Button>
                <PlusCircleIcon className="w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Members
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupList.map((group) => (
                      <tr key={group._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {group.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {group.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {group.members?.length}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/group/detail/${group._id}`}>
                            <Button type="link">Open</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
