import axios from "axios";

const token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json"
};

if (token) {
  headers["authorization"] = "Bearer " + token;
}

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    const res = error.response;
    console.log("❌ RESPONSE ERROR:", {
      status: res?.status,
      data: res?.data,
      message: res?.data?.error || res?.data?.message || res?.data,
    });

    return Promise.reject(error);
  }
);

export default api;
