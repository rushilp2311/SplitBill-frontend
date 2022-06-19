import http from "./httpService";

const apiEndpoint = "/group";

export async function addGroup(group: any) {
  const result = await http.post(`${apiEndpoint}`, group);
  return result.data;
}

export async function getGroupByMemberId(memberId: string) {
  const result = await http.get(`${apiEndpoint}/member/${memberId}`);
  return result.data;
}

export async function getGroupById(groupId?: string) {
  const result = await http.get(`${apiEndpoint}/${groupId}`);
  return result.data;
}

export async function removeMember(groupId: string, memberId: string) {
  const result = await http.delete(
    `${apiEndpoint}/${groupId}/member/${memberId}`
  );
  return result.data;
}

export async function addMember(groupId: string, memberId: string) {
  const result = await http.post(
    `${apiEndpoint}/${groupId}/member/${memberId}`
  );
  return result.data;
}

export async function deleteMember(groupId: string) { 
  const result = await http.delete(
    `${apiEndpoint}/${groupId}`
  );
  return result;
}
