// https://dev.to/antoniojuniordev/5-tips-to-improve-backend-integration-react-with-axios-b3p
// https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/#get-request-with-axios
// https://www.digitalocean.com/community/tutorials/react-axios-react
// https://vue3js.cn/interview/vue/axios.html
// https://umijs.org/docs/max/request#request

import Axios from "axios";

const http = Axios.create({
  baseURL: process.env.BASE_URL,
});

// Add headers to all requests
http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (!token) return config;
  if (config?.headers) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

// Redirect unauthorized or unauthenticated user
http.interceptors.response.use(
  (value) => {
    return Promise.resolve(value);
  },
  (error) => {
    const { isAxiosError = false, response = null } = error;

    if (isAxiosError && response && response.status === 401) {
      // User redirection rule for login page
      return Promise.reject(error);
    }
    if (isAxiosError && response && response.status === 403) {
      // User redirection rule for disallowed page
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// Request retry pattern
let counter = 1;
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status >= 500 &&
      counter < Number(process.env.REACT_APP_RETRY)
    ) {
      counter++;
      return http.request(error.config);
    }
    counter = 1;
    return Promise.reject(error);
  },
);

export default http;
