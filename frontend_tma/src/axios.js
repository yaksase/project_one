import axios from "axios";
import WebApp from "@twa-dev/sdk";

const axiosInstance = axios.create({
  baseURL: 'https://5000-yaksase-projectone-oe8n4j61bwv.ws-eu115.gitpod.io',
  headers: {
    Authorization: `tma ${WebApp.initData}`
  }
});

export default axiosInstance;