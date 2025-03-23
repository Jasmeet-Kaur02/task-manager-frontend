import { API_URL } from "../constants";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiClient {
  baseUrl: string = API_URL;

  formatUrl: (endpoint: string) => string = (endpoint) =>
    `${API_URL}${endpoint}`;

  async request(
    method: RequestMethod,
    endpoint = "",
    data: Record<string, unknown> = {}
  ) {
    const url = this.formatUrl(endpoint);

    const contentType = "application/json";
    const apiConfig: RequestInit = {
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
    };
    const token = null;
    const parsedToken = token && JSON.parse(token);

    const tokenObj = { Authorization: `Bearer ${parsedToken}` };
    const configWithToken: RequestInit = {
      ...apiConfig,
      headers: {
        ...apiConfig.headers,
        ...(parsedToken && tokenObj),
      },
    };
    console.log(`${method} REQUEST: ${url}`);
    console.log("HEADER:", configWithToken);
    console.log("DATA:", data);

    const body = method !== "GET" && {
      body: JSON.stringify(data),
    };
    return await fetch(url, {
      ...configWithToken,
      method: method,
      ...body, // body data type must match "Content-Type" header
    })
      .then(async (response) => response.json())
      .catch((error) => error);
  }

  async post(endpoint = "", data = {}) {
    return this.request("POST", endpoint, data);
  }

  async get(endpoint = "", data = {}) {
    return this.request("GET", endpoint, data);
  }

  async delete(endpoint = "", data = {}) {
    return this.request("DELETE", endpoint, data);
  }

  async put(endpoint = "", data = {}) {
    return this.request("PUT", endpoint, data);
  }

  async patch(endpoint = "", data = {}) {
    return this.request("PATCH", endpoint, data);
  }
}
