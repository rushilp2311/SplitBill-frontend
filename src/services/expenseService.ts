import http from "./httpService";

const apiEndpoint = "/expense";

export async function addExpense(expense: any) {
  const result = await http.post(`${apiEndpoint}`, expense);
  return result.data;
}

export async function getExpensesByGroupIdAndMemberId(
  groupId: string,
  memberId: string
) {
  const result = await http.get(
    `${apiEndpoint}/group/${groupId}/member/${memberId}`
  );
  return result.data;
}

export async function settleExpense(expenseId: string, memberId: string) {
  const result = await http.post(
    `${apiEndpoint}/${expenseId}/settle/${memberId}`
  );
  return result.data;
}

export async function revertExpense(expenseId: string, memberId: string) {
  const result = await http.post(
    `${apiEndpoint}/${expenseId}/revert/${memberId}`
  );
  return result.data;
}
