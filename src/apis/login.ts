import { msalInstance } from "../authConfig.ts";

export default async function login() {
    const response = await msalInstance.loginPopup({
      scopes: ["User.Read"],
    });
    sessionStorage.setItem("aadAccessToken", response.accessToken);
}
