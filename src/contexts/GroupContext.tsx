import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, expenseService, groupService } from "services";
import ToastContext from "./ToastContext";

type GroupContextType = {
  groupList: any[];
  fetchGroups: () => void;
  getGroupById: (groupId: string) => any;
  fetchGroupById: (groupId?: string) => void;
  fetchExpenses: (groupId?: string) => void;
  memberList: any[];
  expenseList: any[];
  settledExpenseList: any[];
  setMemberList: any;
  group: any;
};

const GroupContext = createContext({} as GroupContextType);

export const GroupProvider = ({ children }: any) => {
  const [groupList, setGroupList] = useState<any>([]);
  const [group, setGroup] = useState<any>({});
  const [memberList, setMemberList] = useState<any[]>(group.members);
  const [expenseList, setExpenseList] = useState<any[]>([]);
  const [settledExpenseList, setSettledExpenseList] = useState<any[]>([]);

  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const fetchGroups = async () => {
    const currentUser: any = authService.getCurrentUser();
    const groups = await groupService.getGroupByMemberId(currentUser.id);
    setGroupList(groups);
  };

  const getGroupById = (id: string) => {
    return groupList.find((group: any) => group._id === id);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const currentUser: any = authService.getCurrentUser();

  const fetchGroupById = async (groupId?: string) => {
    if (!groupId) return;
    const result = await groupService.getGroupById(groupId);
    if (result) {
      setGroup(result);
      setMemberList(result.members);
    } else {
      showToast("Group not found", "error");
      navigate("/groups");
    }
  };

  const fetchExpenses = async (groupId?: string) => {
    if (!groupId) return;
    const { activeExpenses, settledExpenses } =
      await expenseService.getExpensesByGroupIdAndMemberId(
        groupId,
        currentUser.id
      );

    if (activeExpenses || settledExpenses) {
      setExpenseList(activeExpenses || []);
      setSettledExpenseList(settledExpenses || []);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        groupList,
        fetchGroups,
        getGroupById,
        expenseList,
        fetchExpenses,
        fetchGroupById,
        memberList,
        settledExpenseList,
        setMemberList,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
