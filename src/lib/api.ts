import axios from "axios";

const Api = {
  MAIN: axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://diet-virid.vercel.app/api",
  }),
};

export default Api;
