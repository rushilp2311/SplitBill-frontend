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
