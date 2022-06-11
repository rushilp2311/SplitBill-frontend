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
