import { ApiClient } from "./ApiClient";

const api = new ApiClient();

export const signup = async (body) => await api.post("signup", body);

export const login = async (body) => await api.post("login", body);
