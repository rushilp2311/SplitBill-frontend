import { ExternalLinkIcon, UserGroupIcon } from "@heroicons/react/outline";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import Button from "components/Button";
import { ReactComponent as RecieptRed } from "../images/reciept-red.svg";
import { ReactComponent as CashGreen } from "../images/cash-green.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GroupContext from "contexts/GroupContext";
import { Loading } from "components";

const Home = () => {
  const { groupList } = useContext(GroupContext);

  const calculateRemainingMembers = (membersCount: number) => {
    return membersCount - 3;
  };

  return (
    <div className="my-10 flex-1 px-4 sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
      {/* Group Overview */}
      <div className="my-12">
        <div className="flex justify-between pb-6 border-b">
          <h1 className="font-bold text-2xl">Your Groups</h1>
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
        {groupList.length > 1 ? (
          <div className="mt-6 w-full grid lg:grid-cols-3 md:grid-cols-2 space-y-3 sm:space-y-0 sm:place-content-center sm:place-items-center">
            {groupList.slice(0, 3).map((group) => (
              <div
                key={group._id}
                className="h-fit py-3 flex flex-col justify-between border-2 rounded p-2 px-6 w-3/4 sm:min-w-0 min-w-full"
              >
                <div className="mb-5 flex justify-between items-center border-b pb-2">
                  <p className="font-bold text-xl flex items-center ">
                    <UserGroupIcon className="w-6 mr-2" />
                    {group.name}
                  </p>
                  <Link to={`/group/detail/${group._id}`}>
                    <Button type="icon">
                      <ExternalLinkIcon className="w-5 text-gray-500" />
                    </Button>
                  </Link>
                </div>
                <div className="mb-4">
                  <p className="uppercase text-sm font-semibold text-gray-500">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-semibold">
                    {group.totalExpenses}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="uppercase text-sm mb-3 font-semibold text-gray-500">
                    Members:{" "}
                    <span className="ml-2">{group.members.length}</span>
                  </p>
                  {/* <div className="flex -space-x-1 relative z-0 overflow-hidden">
                  {group.members.length > 3 && (
                    <p className="flex justify-center items-center border z-40 border-blue-800 bg-blue-200 h-8 w-8 font-semibold text-blue-700 rounded-full">
                      +{calculateRemainingMembers(group.membersCount)}
                    </p>
                  )}
                  {[...Array(3).keys()].map((i) => (
                    <img
                      className="relative z-30 inline-block h-8 w-8 rounded-full"
                      src="https://xsgames.co/randomusers/avatar.php?g=female"
                      alt=""
                    />
                  ))}
                </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      {/* Expense Overview */}
      <div className="mt-12">
        <div className="pb-6 border-b">
          <h1 className="font-bold text-2xl">Expense Overview</h1>
        </div>

        <div className="mt-6 grid md:grid-cols-2 grid-col-1 space-y-3 sm:space-y-0 sm:place-content-center sm:place-items-center">
          <div className="border-2 rounded p-2 sm:w-3/4 sm:min-w-0 min-w-full md:pl-8">
            <p className="flex items-center font-bold text-xl">
              <RecieptRed className="w-8 mr-3" />
              Your Owing
            </p>
            <div className="w-full  mt-6">
              <p className="text-gray-500 font-semibold text-sm mb-2 uppercase">
                TOTAL OWING
              </p>
              <p className="align-middle text-5xl text-red-600 font-semibold">
                $400.00
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="link" rightIcon={<FiMaximize2 className="w-5" />}>
                Expand
              </Button>
            </div>
          </div>
          <div className="border-2 rounded p-2 sm:w-3/4 sm:min-w-0 min-w-full md:pl-8">
            <p className="flex items-center font-bold text-xl">
              <CashGreen className="w-8 mr-3" />
              Your Lending
            </p>
            <div className="w-full  mt-6">
              <p className="text-gray-500 font-semibold text-sm mb-2 uppercase">
                TOTAL LENDING
              </p>
              <p className="align-middle text-5xl text-green-600 font-semibold">
                $400.00
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="link" rightIcon={<FiMaximize2 className="w-5" />}>
                Expand
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
