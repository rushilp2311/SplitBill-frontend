import { createContext, useEffect, useState } from "react";
import { authService, groupService } from "services";

type GroupContextType = {
  groupList: any[];
  fetchGroups: () => void;
};

const GroupContext = createContext({} as GroupContextType);

export const GroupProvider = ({ children }: any) => {
  const [groupList, setGroupList] = useState([]);

  const fetchGroups = async () => {
    const currentUser: any = authService.getCurrentUser();
    const groups = await groupService.getGroupByMemberId(currentUser.id);
    setGroupList(groups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ groupList, fetchGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
