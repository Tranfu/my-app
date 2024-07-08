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
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      http
        .post(url, {
          data,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      http
        .put(url, {
          data,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      http
        .delete(url, {
          data,
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
