// import axios from "axios";
// import { env } from "next-runtime-env";

// import { localeCookieName } from "@assets/definition/locales";

// import { msalInstance } from "@modules/ssoProvider";

// import Cookie from "@plugins/js-cookie";

// const instance = axios.create({
//   baseURL: env("http://localhost:3000") || "",
// });

// // Request
// instance.interceptors.request.use(
//   (config) => {
//     const newConfig = {
//       ...config,
//     };

//     const activeAccount = msalInstance.getActiveAccount();
//     if (activeAccount?.idToken) {
//       newConfig.headers.Authorization = `Bearer ${activeAccount?.idToken}`;
//     }

//     const lang = Cookie.get(localeCookieName);
//     if (lang && !newConfig.headers["lang-code"]) {
//       newConfig.headers["lang-code"] = lang;
//     }
//     return Promise.resolve(newConfig);
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response
// instance.interceptors.response.use(
//   (response) => {
//     if ([200, 201, 202].includes(response.status)) {
//       return Promise.resolve(response);
//     }
//     return Promise.reject(response);
//   },
//   async (error) => {
//     if (error.response?.status) {
//       return Promise.reject(error);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// export default instance;
