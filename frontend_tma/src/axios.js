import axios from "axios";
import WebApp from "@twa-dev/sdk";

const axiosInstance = axios.create({
  baseURL: 'https://5000-yaksase-projectone-ua4fqkc9ha9.ws-eu116.gitpod.io',
  headers: {
    Authorization: `tma ${WebApp.initData}`
  }
});

axiosInstance.interceptors.response.use(
  res => res,
  error => {
    console.log(error);
    const popupButtons = [{type: 'destructive', text: 'Close', id: 'popupClose'}, {type: 'cancel'}]
    if (error.response) {
      if (error.response.status == 401 && error.response.data['message'] == 'Init data has been expired') {
        WebApp.showPopup({
          title: 'Session has been expired', 
          message: 'Please reopen the app.',
          buttons: popupButtons
        })
      }
    }
    else {
      WebApp.showPopup({
        title: 'Network error occured',
        message: 'Please try again later.',
        buttons: popupButtons
      })
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;