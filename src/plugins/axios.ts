import axios from "axios";

export const api = axios.create({
  baseURL: "https://railway-react-bulletin-board.herokuapp.com",
});

api.interceptors.response.use(
  (res) => {
    if (res && res.config && res.config.baseURL) {
      console.log(res.config.baseURL + res.config.url, res);
    }
    return res;
  },
  (err) => {
    console.error(err.response);
    throw err;
  }
);
