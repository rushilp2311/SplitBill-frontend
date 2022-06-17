import {
  ExternalLinkIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { FiMaximize2 } from "react-icons/fi";
import Button from "components/Button";
import { ReactComponent as RecieptRed } from "../images/reciept-red.svg";
import { ReactComponent as CashGreen } from "../images/cash-green.svg";
import { ReactComponent as Group } from "../images/group.svg";
import { ReactComponent as MoneyBag } from "../images/MoneyBag.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GroupContext from "contexts/GroupContext";
import { Loading } from "components";
import { BarChart, PieChart } from "components/Graph";

const Home = () => {
  const { groupList } = useContext(GroupContext);

  return (
    <div className="my-10 flex-1 px-4 sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl">
      {/* Group Overview */}
      <div className="my-12">
        <div className="flex justify-between border-b pb-6">
          <h1 className="text-2xl font-bold">Your Groups</h1>
          {groupList.length > 3 && (
            <Link to="/groups">
              <Button
                type="link"
                rightIcon={<ExternalLinkIcon className="w-5" />}
              >
                View All{" "}
              </Button>
            </Link>
          )}
        </div>
        {groupList ? (
          <div className="mt-6 grid w-full space-y-3 sm:place-content-center sm:place-items-center sm:space-y-0 md:grid-cols-2 lg:grid-cols-3">
            {groupList.slice(0, 3).map((group) => (
              <div
                key={group._id}
                className="flex h-56 w-3/4 min-w-full flex-col justify-between  rounded border-2 sm:min-w-0"
              >
                <div className="p-2 py-3 px-6">
                  <div className="mb-3 flex flex-col  justify-between border-b pb-2">
                    <p className=" truncate text-2xl font-bold text-gray-800 ">
                      {group.name}
                    </p>
                    <p className="mt-2 truncate text-sm text-gray-500">
                      {group.description}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-sm font-semibold uppercase text-gray-500">
                      <span className="mr-2">
                        <MoneyBag className="h-6 w-6" />
                      </span>
                      Total Expenses :
                      <span className="ml-1 text-2xl font-semibold text-gray-800">
                        {group.totalExpenses}
                      </span>
                    </p>
                  </div>
                  <div className="mt-3 flex flex-col items-start">
                    <p className="flex items-center text-sm font-semibold uppercase text-gray-500">
                      <span className="mr-2">
                        <Group className="h-6 w-6" />
                      </span>
                      Members :
                      <span className="ml-1 text-2xl font-semibold text-gray-800">
                        {group.members.length}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end bg-gray-100 p-2">
                  <Link to={`/group/detail/${group._id}`}>
                    <Button
                      type="link"
                      rightIcon={<ExternalLinkIcon className="w-5" />}
                    >
                      Open
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {groupList.length < 3 && (
              <>
                <Link to="/addgroup" className="h-56 sm:w-3/4">
                  <div className="flex h-56 min-w-full cursor-pointer flex-col items-center  justify-center rounded border-2 border-dashed hover:bg-gray-50 sm:min-w-0">
                    <p>
                      <PlusCircleIcon className="mb-4 w-10 stroke-1 text-gray-600" />{" "}
                    </p>
                    <p className="text-2xl font-medium text-gray-600">
                      Add Group
                    </p>
                  </div>
                </Link>
              </>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      {/* Expense Overview */}
      <div className="mt-12">
        <div className="border-b pb-6">
          <h1 className="text-2xl font-bold">Expense Overview</h1>
        </div>

        <div className="grid-col-1 mt-6 grid space-y-3 sm:place-content-center sm:place-items-center sm:space-y-0 md:grid-cols-2">
          <div className="min-w-full  md:pl-8">
            <PieChart />
          </div>
          <div className="min-w-full  md:pl-8">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
