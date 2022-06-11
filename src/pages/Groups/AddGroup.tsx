import { CheckIcon, UserGroupIcon, XIcon } from "@heroicons/react/outline";
import { Breadcrumb, SearchMember } from "components";
import Button from "components/Button";
import FormInput from "components/FormInput";
import { useState } from "react";

export type MemberType = {
  name: string;
  email: string;
  id: string;
};

const AddGroup = () => {
  const [memberList, setMemberList] = useState<MemberType[]>([]);
  console.log(memberList);

  const handleRemoveMember = (id: string) => {
    setMemberList(memberList.filter((member) => member.id !== id));
  };

  return (
    <div className="mt-4 h-full flex-1 px-4 flex flex-col  sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
      {/* Page Header */}
      <div className="">
        <Breadcrumb
          paths={[
            { name: "Groups", to: "/groups" },
            { name: "Add Group", to: "/addgroup" },
          ]}
        />
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Add Group
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-1 flex-col lg:flex-row justify-evenly items-center lg:justify-between">
        <div className="mt-4 w-full lg:w-3/4 mb-6 lg:mb-0 max-w-md">
          <FormInput
            label="Name*"
            name="groupName"
            type="text"
            placeholder="Enter Group Name"
          />
          <FormInput
            label="Description"
            name="groupName"
            type="text"
            placeholder="Enter Group Description (Optional)"
          />
        </div>
        <div className="w-full lg:w-2/4 mt-2 lg:mt-0">
          <p className="text-xl font-bold">Add Members</p>
          <SearchMember memberList={memberList} setMemberList={setMemberList} />
          {/* Member List */}
          {/* Empty State */}
          {memberList.length < 1 && (
            <div className="text-center mt-2 lg:mt-12 p-2 border-2 rounded border-dashed">
              <div className="flex justify-center">
                <UserGroupIcon className="w-10 stroke-slate-600 stroke-1" />
              </div>
              <h3 className="mt-2 text font-medium text-gray-900">
                No members
              </h3>
              <p className="mt-1 text text-gray-500">
                Add users by searching for them in the search bar above.
              </p>
            </div>
          )}
          {/* END Empty State */}
          {memberList.length > 0 && (
            <div className="mt-4">
              <p className="uppercase font-semibold text-gray-800 mb-3">
                Member List
              </p>
              <div className="flex flex-col">
                {memberList.map((member) => (
                  <div
                    key={member.id}
                    className="flex w-full py-3 flex-row justify-around border-b"
                  >
                    <div className="flex-1">
                      <p className="text font-medium text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <Button
                      type="icon"
                      margin="mr-5"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <XIcon className="text-red-600 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* END Member List */}
        </div>
      </div>
      <div className="flex-1 flex items-end justify-center">
        <Button width="w-1/2">Add Group</Button>
      </div>
    </div>
  );
};

export default AddGroup;
