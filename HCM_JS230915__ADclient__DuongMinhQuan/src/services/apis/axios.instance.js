import axios from "axios";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;