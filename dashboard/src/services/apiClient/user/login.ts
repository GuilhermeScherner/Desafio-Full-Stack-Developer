import axios from "../axios-config";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  name: string;
};

export const login = (request: LoginRequest): Promise<LoginResponse> => {
  const form = new FormData();
  form.append("grant_type", "password");
  form.append("username", request.email);
  form.append("password", request.password);
  return axios.post("user/token", form);
};
