import { message as Message } from 'antd';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { t } from '@/locales/i18n'; // Translation function for i18n
import userStore from '@/store/userStore'; // User store to manage user info and tokens

import { Result } from '#/api'; // Custom result type from the API
import { ResultEnum } from '#/enum'; // Enum for API result statuses

// Create an axios instance for making requests
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // Set the base API URL
  timeout: 50000, // Request timeout of 50 seconds
  headers: { 'Content-Type': 'application/json;charset=utf-8' }, // Default headers
});

// Request interceptor to modify the request before sending
axiosInstance.interceptors.request.use(
  (config) => {
    // Add the Authorization token before sending the request
    const token = userStore.getState().userToken; // Get the token from user store
    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`; // Add Bearer token to Authorization header
    }
    return config; // Return modified config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Response interceptor to process the response after receiving
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result>) => {
    if (!res.data) throw new Error(t('sys.api.apiRequestFailed')); // If there's no data, throw an error

    const { status, data, message } = res.data;
    // Check if the business request was successful
    const hasSuccess = data && Reflect.has(res.data, 'status') && status === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data; // Return the data if successful
    }

    // Handle business request error
    throw new Error(message || t('sys.api.apiRequestFailed')); // Throw error with message or fallback text
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {}; // Extract response and message from error

    const errMsg = response?.data?.message || message || t('sys.api.errorMessage'); // Extract error message
    Message.error(errMsg); // Display error message using Ant Design's message component

    const status = response?.status;
    if (status === 401) {
      userStore.getState().actions.clearUserInfoAndToken(); // Clear user info and token if unauthorized (401)
    }
    return Promise.reject(error); // Reject the promise with the error
  },
);

class APIClient {
  // Method for GET requests
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' }); // Send GET request
  }

  // Method for POST requests
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' }); // Send POST request
  }

  // Method for PUT requests
  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' }); // Send PUT request
  }

  // Method for DELETE requests
  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }); // Send DELETE request
  }

  // General request method
  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config) // Send request using axiosInstance
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as T); // Resolve the response
        })
        .catch((e: Error | AxiosError) => {
          reject(e); // Reject the promise if there's an error
        });
    });
  }
}

export default new APIClient(); // Export API client instance
