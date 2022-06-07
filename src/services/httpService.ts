import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["authorization"] =
  localStorage.getItem("token") || "";

axios.interceptors.response.use(undefined, (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
  }

  return Promise.reject(error);
});
function setJwt(jwt: any) {
  axios.defaults.headers.common["authorization"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
