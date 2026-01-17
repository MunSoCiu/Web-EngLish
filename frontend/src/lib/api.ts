import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * Request interceptor: gắn Bearer token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        // Axios v1+ yêu cầu headers là AxiosHeaders
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
