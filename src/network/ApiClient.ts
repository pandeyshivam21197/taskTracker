import axios, {AxiosRequestConfig} from 'axios';
import { requestInterceptors, responseInterceptors } from './interceptors';

class ApiClient {
    private client;

    constructor(config: AxiosRequestConfig) {
        const axiosInstance = axios.create(config)
        axiosInstance.interceptors.request.use(requestInterceptors().onFulfilled, requestInterceptors().onRejected);
        axiosInstance.interceptors.response.use(responseInterceptors().onFulfilled, responseInterceptors().onRejected);

        this.client = axiosInstance;
    }

    public get = (url: string, config: AxiosRequestConfig) => {
        return this.client.get(url, config);
    }

    public post = (data: any, headers: any) => {
        return this.client.request({method: 'POST', data, headers});
    }
}

const apiClient = new ApiClient({baseURL: 'https://test-323.herokuapp.com/v1/graphql', timeout: 10000});
export {apiClient as ApiClient};