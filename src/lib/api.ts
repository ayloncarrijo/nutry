import axios from "axios";

const Api = {
  MAIN: axios.create({
    baseURL: "http://localhost:3000/api",
  }),
};

export default Api;
