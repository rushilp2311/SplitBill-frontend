import { authService } from "services";
import http from "./httpService";

const apiEndpoint = "/user";

export async function registerUser(user: any) {
  const result = await http.post(`${apiEndpoint}`, user);
  return result;
}

export async function findUserByEmail(email: string) {
  const result = await http.get(`${apiEndpoint}/${email}`);
  return result.data;
}

export async function findExpenseForUser() {
  const currentUser: any = authService.getCurrentUser();
  const result = await http.get(`${apiEndpoint}/expenses/${currentUser.id}`);
  return result.data;
}

export async function fetchUsersByIds(userIds: string[]) {
  const result = await http.get(`${apiEndpoint}`, {
    params: {
      userIds: JSON.stringify(userIds),
    },
  });
  return result.data;
}
