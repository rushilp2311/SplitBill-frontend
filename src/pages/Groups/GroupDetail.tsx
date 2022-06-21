import {
  ExclamationIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Breadcrumb, SearchMember, Tabs } from "components";
import Button from "components/Button";
import Loading from "components/Loading";
import GroupContext from "contexts/GroupContext";
import ToastContext from "contexts/ToastContext";
import { DeleteGroupModal } from "pages";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authService, groupService } from "services";
import EditMembers from "./EditMembers";
import ExpenseList from "./Expense/ExpenseList";

const GroupDetail = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [deleteMember, setDeleteMember] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { groupId } = useParams();
  const {
    group,
    expenseList,
    fetchExpenses,
    fetchGroupById,
    memberList,
    settledExpenseList,
    setMemberList,
  } = useContext(GroupContext);

  const { showToast } = useContext(ToastContext);

  const currentUser: any = authService.getCurrentUser();

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId);
    }
  }, []);

  useEffect(() => {
    if (groupId) {
      fetchExpenses(groupId);
    }
  }, []);

  const groupDeleteTitle = useMemo(() => {
    return `Delete ${group.name}`;
  }, [group]);

  const handleAddMember = async (memberId?: string) => {
    if (memberId) {
      const result = await groupService.addMember(group._id, memberId);
      if (result) {
        window.location.reload();
      }
    }
  };

  const handleMemberDelete = async (memberId?: string) => {
    if (group.members.length === 1) {
      showToast("Cannot delete last member", "error");
      setOpen(false);
      return;
    }
    if (memberId) {
      const result = await groupService.removeMember(group._id, memberId);
      if (result) {
        showToast("Member removed", "success");
        fetchGroupById(groupId);
        setOpen(false);

        if (memberId === currentUser.id) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
        return;
      }
    }
    showToast("Something went wrong", "error");
  };

  const handleGroupDelete = async () => {
    if (groupId) {
      const result: any = await groupService.deleteMember(groupId);

      if (result.data) {
        showToast("Group Deleted", "success");
        setOpenDeleteModal(false);
        setTimeout(() => {
          window.location.href = "/groups";
        }, 500);
        return;
      }
    }

    showToast("Something went wrong", "error");
  };

  if (!group._id) return <Loading />;

  return (
    <>
      <div className="flex h-[calc(100vh-64px)] flex-1 flex-col px-4 pt-3  sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl">
        {/* Page Header */}
        <div>
          <Breadcrumb
            paths={[
              { name: "Groups", to: "/groups" },
              { name: "Group Detail", to: `/group/details/${group._id}` },
            ]}
          />
          <div className="mt-2 flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                {group.name}
              </h2>
            </div>
            <div className="mt-4 hidden flex-shrink-0 md:mt-0 md:ml-4 md:flex">
              <Link to={`/group/${group._id}/addexpense`}>
                <Button leftIcon={<PlusCircleIcon className="w-5" />}>
                  Add Expense
                </Button>
              </Link>
            </div>
            <div className="flex flex-shrink-0 md:mt-0 md:ml-4 md:hidden">
              <Link to={`/group/${group._id}/addexpense`}>
                <Button>
                  <PlusCircleIcon className="w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-6 sm:grid sm:h-[calc(100vh-180px)] sm:grid-cols-4 sm:space-x-4">
          <div className="w-full overflow-y-auto sm:col-span-2">
            {/* Expense List */}
            <p className="mb-2 text-sm font-medium uppercase text-gray-500">
              Expense List
            </p>
            <Tabs
              tabs={[
                {
                  label: "Active",
                  content: (
                    <>
                      <ExpenseList expenseList={expenseList} />
                    </>
                  ),
                },
                {
                  label: "Settled",
                  content: (
                    <ExpenseList expenseList={settledExpenseList} settled />
                  ),
                },
              ]}
            />
          </div>
          <div className="flex flex-col justify-start sm:col-span-2">
            <div className="my-2">
              <p className="text-sm font-medium uppercase text-gray-500">
                Add Member
              </p>
              <SearchMember
                memberList={memberList}
                setMemberList={setMemberList}
                handleAdd={handleAddMember}
              />
            </div>
            <div className="my-2 rounded border shadow-sm ">
              <p className=" rounded-t bg-gray-800 p-2 text-sm font-semibold uppercase text-white">
                Members
              </p>
              <div className="divide-y-2 p-2">
                {memberList &&
                  memberList.length > 0 &&
                  memberList.map((member: any) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="mt-1 text-sm font-semibold text-gray-700 ">
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
            <div className="my-2 mt-6 rounded border-2 border-dashed border-red-200 p-2 shadow-sm">
              <p className="text-sm font-semibold uppercase text-red-600">
                Danger Zone
              </p>

              <Button
                type="secondaryDanger"
                width="w-full"
                margin="mt-4"
                onClick={() => setOpenDeleteModal(true)}
              >
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
        <DeleteGroupModal
          title={groupDeleteTitle}
          memberId={groupId}
          icon={<ExclamationIcon className="w-5 text-red-600" />}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          text="Are you sure you want to delete this group? All expense related to this group will be deleted."
          buttonText="Delete"
          buttonType="danger"
          handleDelete={handleGroupDelete}
        />
      </div>
    </>
  );
};

export default GroupDetail;
