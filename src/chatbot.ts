import { msalInstance } from "./authConfig.ts";
import { TextDecoder } from 'text-encoding';
import { v4 as uuidv4 } from 'uuid';

interface AuthResponse {
  code: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

interface groupIdResponse {
  statusCode: number,
  body: {
    data: {
      userNo: string,
      userName: string,
      userType: number,
      is_ad_user: boolean,
      is_org_group_admin: boolean,
      roles: [
        {
          groupId: string,
          group: string,
          role: string,
          isOverUsageLimit: boolean,
        }
      ],
      permissionSettings: [],
    }
  },
}

interface modelIdResponse {
  statusCode: number,
  body: [{
    data: {
      id: string,
      provider: string,
      model: number,
      model_id: boolean,
      lite_model: boolean,
      type: string,
      api_parameter: {},
    }
  }]
}

function generateUUID(): string{
  const result = uuidv4();
  return result;
}

export const uuid = generateUUID();
export const api_key = 'zv9lMX/Gk2O+gzaw2bAgwctEaAXrpYFS/0znbcIuf3o=';

export async function azureAuthenticateChatbot(): Promise<string> {
  const options: RequestInit = {
    method: "GET",
    headers: { "accept": "text/plain" },
  };

  const response = await fetch("https://s-chatbot-adminapi.giantcycling.com/Api/Auth/AzureAuthenticate", options);
  const data: any = await response.body?.getReader().read();
  const reader = new TextDecoder().decode(data.value);

  return reader;
}

export async function authenticateChatbot(name: string, password: string): Promise<any> {
  const options: RequestInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "accept": `text/json`,
    },
    body: JSON.stringify({
      username: name,
      userPassport: password,
    }),
  };

  const response = await fetch("https://s-chatbot-adminapi.giantcycling.com/Api/Auth/Authenticate", options);
  const data: any = await response.body?.getReader().read();
  const reader = new TextDecoder().decode(data.value);

  if (reader) {
    document.cookie = `chatbotAccessToken=${data.data.accessToken}; path=/; secure; HttpOnly; SameSite=Strict`;
    document.cookie = `chatbotRefreshToken=${data.data.refreshToken}; path=/; secure; HttpOnly; SameSite=Strict`;
  } else {
    console.error("Chatbot Authentication Failed:", data.message);
  }
}

export async function refreshChatbotToken(accessToken: string): Promise<void> {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
  };
  const response = await fetch(
    `https://chatbot-adminapi.giantcycling.com/api/auth/RefreshToken?refreshToken=${uuid}`, options
  );

  const data: AuthResponse = await response.json();
  if (data.code === 20000 && data.data) {
    sessionStorage.setItem("chatbotAccessToken", data.data.accessToken);
    sessionStorage.setItem("chatbotRefreshToken", data.data.refreshToken);
  } else {
    console.error("Token Refresh Failed:", data.message);
  }
}

export async function getUserPermission(accessToken: string): Promise<any> {
  const options: RequestInit = {
    method: "POST",
    headers: { "Authorization": `Bearer ${accessToken}` },
  };

  const response = await fetch("https://s-chatbot.giantcycling.com/api/Auth/getUserPermission", options);
  console.log(response);
}

export async function getGroupId(api_key: string) {
  const options: RequestInit = {
    method: "GET",
    headers: { "accept": "application/json", "Authorization": `Bearer ${api_key}` },
  };
  const response = await fetch("https://s-chatbot-adminapi.giantcycling.com/userinfo", options);
  const reader: groupIdResponse = JSON.parse(new TextDecoder().decode((await response.body?.getReader().read())?.value));
  return reader.body.data.roles[0].groupId;
}

export async function getModelId(group_id: string) {
  const options: RequestInit = {
    method: "GET",
    headers: { "accept": "application/json" },
  };
  const response = await fetch(`https://s-chatbot-adminapi.giantcycling.com/llms?group_id=${group_id}`, options);
  console.log(response);
  const reader: modelIdResponse = JSON.parse(new TextDecoder().decode((await response.body?.getReader().read())?.value));
  return reader.body[0].data.model_id;
}

export async function sendMessageToBot(message: string) {
  const group_id = await getGroupId(api_key);
  const model_name = await getModelId(group_id);
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${api_key}` },
    body: JSON.stringify({
      conversation_id: uuid,
      group_id: group_id,
      message: {
        content: {
          prompts: message,
          files: [],
          workspace: {},
        }
      },
      model: model_name,
      config: {
        max_tokens: 2000,
        top_p: 0.8,
        top_k: 3,
        temperature: 0.9,
      },
    }),
  };
  const response = await fetch('https://s-chatbot-adminapi.giantcycling.com/chat', options);
  console.log(response);
}

export async function logout(): Promise<void> {
  await fetch("https://chatbot-adminapi.giantcycling.com/api/auth/Logout", {
    method: "POST",
    headers: { "Authorization": `Bearer ${sessionStorage.getItem("chatbotAccessToken")}` },
    body: JSON.stringify({ idle: true }),
  });

  sessionStorage.clear();
  await msalInstance.logoutPopup();
  window.location.href = "/login";
}
