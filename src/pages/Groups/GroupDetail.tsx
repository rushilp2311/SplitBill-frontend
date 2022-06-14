import {
  ExclamationIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Breadcrumb, SearchMember } from "components";
import Button from "components/Button";
import Loading from "components/Loading";
import ToastContext from "contexts/ToastContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { expenseService, groupService } from "services";
import EditMembers from "./EditMembers";

const GroupDetail = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [deleteMember, setDeleteMember] = useState("");

  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>({});
  const [memberList, setMemberList] = useState<any[]>(group.members);
  const { showToast } = useContext(ToastContext);

  const fetchGroupById = async () => {
    const result = await groupService.getGroupById(groupId);
    if (result) {
      setGroup(result);
      setMemberList(result.members);
    } else {
      showToast("Group not found", "error");
      navigate("/groups");
    }
  };

  const fetchExpenses = async () => {
    if (!groupId) return;
    const result = await expenseService.getExpensesByGroupId(groupId);
    console.log(result);
  };

  useEffect(() => {
    fetchGroupById();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddMember = async (memberId?: string) => {
    console.log("Called", memberId);
    if (memberId) {
      await groupService.addMember(group._id, memberId);
    }
  };

  const handleMemberDelete = async (memberId?: string) => {
    console.log("Called");
    if (memberId) {
      const result = await groupService.removeMember(group._id, memberId);
      if (result) {
        showToast("Member removed", "success");
        fetchGroupById();
        setOpen(false);
        return;
      }
    }
    showToast("Something went wrong", "error");
  };

  if (!group._id) return <Loading />;

  return (
    <>
      <div className="mt-4 h-full flex-1 px-4 flex flex-col  sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
        {/* Page Header */}
        <div>
          <Breadcrumb
            paths={[
              { name: "Groups", to: "/groups" },
              { name: "Group Detail", to: `/group/details/${group._id}` },
            ]}
          />
          <div className="mt-2 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {group.name}
              </h2>
            </div>
            <div className="hidden md:flex mt-4 flex-shrink-0 md:mt-0 md:ml-4">
              <Link to={`/group/${group._id}/addexpense`}>
                <Button leftIcon={<PlusCircleIcon className="w-5" />}>
                  Add Expense
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
        </div>
        <div className="mt-6 sm:grid sm:grid-cols-4 sm:space-x-4 flex flex-col h-full">
          <div className="sm:col-span-2 border h-full w-full">
            {/* Expense List */}
          </div>
          <div className="flex flex-col sm:col-span-2 justify-between">
            <div className="mt-2">
              <SearchMember
                memberList={memberList}
                setMemberList={setMemberList}
                handleAdd={handleAddMember}
              />
            </div>
            <div className="border shadow-sm rounded">
              <p className=" uppercase font-semibold p-2 text-sm text-white rounded-t bg-gray-800">
                Members
              </p>
              <div className="p-2 divide-y-2">
                {memberList &&
                  memberList.length > 0 &&
                  memberList.map((member: any) => (
                    <div
                      key={member._id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm text-gray-700 font-semibold mt-1 ">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      <div>
                        <TrashIcon
                          className="w-5 text-red-600"
                          onClick={() => {
                            setOpen(true);
                            setTitle(`Remove ${member.name}`);
                            setDeleteMember(member._id);
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-6 p-2 border-2 border-dashed border-red-200 shadow-sm rounded">
              <p className="uppercase text-red-600 font-semibold text-sm">
                Danger Zone
              </p>

              <Button type="secondaryDanger" width="w-full" margin="mt-4">
                Delete Group
              </Button>
            </div>
          </div>
        </div>
        <EditMembers
          title={title}
          memberId={deleteMember}
          icon={<ExclamationIcon className="w-5 text-red-600" />}
          open={open}
          setOpen={setOpen}
          text="Are you sure you want to delete this member?"
          buttonText="Delete"
          buttonType="danger"
          handleDelete={handleMemberDelete}
        />
      </div>
    </>
  );
};

export default GroupDetail;
