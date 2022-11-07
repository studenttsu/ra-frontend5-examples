
import axios  from 'axios';
import TokenService from './TokenService';
import PubSub from './PubSub';
import { API_PATH, TOKEN_KEY } from '../constants';

const httpClient = axios.create({
  baseURL: API_PATH,
  withCredentials: true
});

httpClient.interceptors.response.use(
  response => response,
  async error => {
      const originalRequest = error.config;
      const hasAccessToken = localStorage.getItem(TOKEN_KEY);

      if (error.response.status === 401 && error.config && !error.config._isRetry && Boolean(hasAccessToken)) {
          originalRequest._isRetry = true;

          try {
              await axios.get(`${API_PATH}/refresh`, {withCredentials: true});
              return httpClient.request(originalRequest);
          } catch (e) {
              // TODO: разлогинить юзера
              console.log('НЕ АВТОРИЗОВАН');
              throw e;
          }
      }

      throw error;
  }
);

type Params = Record<string, string | undefined>;

export class HttpService {
  private baseApi: string = '';

  constructor(baseApiPath: string = API_PATH) {
    this.baseApi = baseApiPath;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  async get(path: string, params?: Params) {
    const response = await httpClient.get(
        `${this.baseApi}/${path}`,
        { params, headers: this.baseHeaders }
    );

    return response.data;
  }

  async post<T>(path: string, data?: T, params?: Params) {
    const response = await httpClient.post(
      `${this.baseApi}/${path}`, data,
        { params, headers: this.baseHeaders }
    );

    return response.data;
  }

  private async _handleResponse(response: Response) {
    const parsedData = await response.json();

    if (response.ok) {
      return parsedData;
    }

    if (response.status === 401) {
      PubSub.emit('logout');
    }

    throw parsedData;
  }
}