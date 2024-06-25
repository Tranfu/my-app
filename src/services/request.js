// https://dev.to/antoniojuniordev/5-tips-to-improve-backend-integration-react-with-axios-b3p
// https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/#get-request-with-axios
// https://www.digitalocean.com/community/tutorials/react-axios-react
// https://vue3js.cn/interview/vue/axios.html
// https://umijs.org/docs/max/request#request
import http from "./http";

export default {
  // We'll be able to invoke the method on our components this way.
  // await request.get( '/authenticate', { email, password } );
  async get(url, params = {}) {
    try {
      const response = await http.get(url, {
        params,
      });
      return response;
    } catch (err) {
      return false;
    }
  },
  async post(url, send) {
    try {
      const response = await http.post(url, send);
      return response;
    } catch (err) {
      return false;
    }
  },
  async put(url, send) {
    try {
      const response = await http.put(url, send);
      return response;
    } catch (err) {
      return false;
    }
  },
  async delete(url) {
    try {
      await http.delete(url);
      return true;
    } catch (err) {
      return false;
    }
  },
};
