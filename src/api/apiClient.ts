import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { baseUrl } from "./config";

const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  const { response } = error as unknown as AxiosError;
  if (response) {
    return Promise.reject(response.data);
  }
  return Promise.reject(error);
};

apiClient.interceptors.response.use(onResponse, onErrorResponse);
apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    req.headers.authorization = `Bearer ${JSON.parse(token)}`;
  }
  return req;
});

export default apiClient;
