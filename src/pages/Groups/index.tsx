import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Loading } from "components";
import Button from "components/Button";
import GroupContext from "contexts/GroupContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Groups = () => {
  const { groupList } = useContext(GroupContext);

  return (
    <div>
      {/* Page Heading */}
      <div className="mt-4 flex flex-1 flex-col justify-end px-4 sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl">
        <div>
          <nav className="sm:hidden" aria-label="Back">
            <Link
              to="/"
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
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
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
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Your Groups
            </h2>
          </div>
          <div className="mt-4 hidden flex-shrink-0 md:mt-0 md:ml-4 md:flex">
            <Link to="/addgroup">
              <Button leftIcon={<PlusCircleIcon className="w-5" />}>
                Add Group
              </Button>
            </Link>
          </div>
          <div className="flex flex-shrink-0 md:mt-0 md:ml-4 md:hidden">
            <Link to="/addgroup">
              <Button>
                <PlusCircleIcon className="w-5" />
              </Button>
            </Link>
          </div>
        </div>
        {groupList ? (
          groupList.length > 0 ? (
            <div className="mt-12 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden rounded border-b border-gray-200 shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Description
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Members
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Total Expenses
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {groupList.map((group) => (
                          <tr key={group._id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {group.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {group.description}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {group.members?.length}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {group?.totalExpenses}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <Link to={`/group/detail/${group._id}`}>
                                <Button
                                  type="link"
                                  rightIcon={
                                    <ChevronRightIcon className="w-5" />
                                  }
                                >
                                  Open{" "}
                                </Button>
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
          ) : (
            <div className="mt-10 flex h-52 w-full flex-col items-center justify-center border-2 border-dashed">
              <UserGroupIcon className="w-10 stroke-1" />
              <p className="mt-1 w-full text-center text-xl font-semibold sm:text-3xl">
                No Groups
              </p>
              <p className="text-md mt-2 text-gray-600 sm:text-lg">
                Add group to split the bills
              </p>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Groups;
