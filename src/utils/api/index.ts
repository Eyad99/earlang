import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { KEY_TOKEN_COOKIE, KEY_USER_COOKIE } from '@/variables/constants';
import { ObjToFormData } from '../helpers';
import Cookies from 'js-cookie';

// const baseURL = 'https://erlang4insights.pythonanywhere.com/';
const baseURL = import.meta.env.VITE_BASE_URL;
export interface ApiResponse<T = any> {
	data: T;
	code: number;
	message: string;
}

const api: AxiosInstance = axios.create({
	baseURL,
	timeout: 180000,
	headers: {
		Accept: 'application/json',
	},
});

api.interceptors.request.use(
	(config: any) => {
		config.headers['Authorization'] = Cookies.get(KEY_TOKEN_COOKIE) ? `Bearer ${Cookies.get(KEY_TOKEN_COOKIE)}` : undefined;

		if (Boolean(config.headers.formData)) {
			config.data = ObjToFormData(config.data, undefined, undefined);
			// Set Content-Type to undefined to let Axios set it automatically for FormData
			delete config.headers['Content-Type'];
		}

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response: AxiosResponse<ApiResponse | any>) => response,
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				window.location.href = '/auth/sign-in';
				window && Cookies.remove(KEY_TOKEN_COOKIE);
				window && Cookies.remove(KEY_USER_COOKIE);
			} else {
				// Handle other response errors

				console.error('Error: elseee', error.message);
			}
		} else if (error.request) {
			// Handle request error
			console.error('Request error:', error.request);
		} else {
			// Handle other errors
			console.error('Error:', error.message);
		}

		return Promise.reject(error?.response?.data);
	}
);

export const { get, post, put, delete: destroy, patch } = api;
