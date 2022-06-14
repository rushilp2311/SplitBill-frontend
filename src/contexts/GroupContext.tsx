import { createContext, useEffect, useState } from "react";
import { authService, groupService } from "services";

type GroupContextType = {
  groupList: any[];
  fetchGroups: () => void;
  getGroupById: (groupId: string) => any;
};

const GroupContext = createContext({} as GroupContextType);

export const GroupProvider = ({ children }: any) => {
  const [groupList, setGroupList] = useState<any>([]);

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

  return (
    <GroupContext.Provider value={{ groupList, fetchGroups, getGroupById }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
