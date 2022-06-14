import http from "./httpService";

const apiEndpoint = "/expense";

export async function addExpense(expense: any) {
  const result = await http.post(`${apiEndpoint}`, expense);
  return result.data;
}

export async function getExpensesByGroupId(groupId: string) {
  const result = await http.get(`${apiEndpoint}/group/${groupId}`);
  return result.data;
}
