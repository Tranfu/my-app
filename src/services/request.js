import http from "./http";

export default {
  // We'll be able to invoke the method on our components this way.
  // await request.get( '/authenticate', { email, password } );
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      http
        .get(url, {
          params,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
