import axios from 'axios'
import {store} from '../store'

store.subscribe(listener)

axios.defaults.baseURL = 'http://localhost:8080/api';

function select(state) {
  return window.localStorage.getItem('access_token')
}

function getLocalRefreshToken() {
  const token = window.localStorage.getItem('refresh_token')
  return token
}


const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// Add a response interceptor
instance.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 403 && !originalRequest._retry) {
  originalRequest._retry = true;
    try {
      console.log('Refreshing token')
      const refreshToken = window.localStorage.getItem('refresh_token');
      console.log(refreshToken)
      const response = await axios.post('/authentication/refresh-token', {}, { 
        headers:
        {
          "Authorization": "Bearer " + refreshToken,
        }
      });
      const token  = response.data;

      window.localStorage.setItem('access_token', token.access_token);
      window.localStorage.setItem('refresh_token', token.refresh_token);

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${token.access_token}`;
      return axios(originalRequest);
    } catch (error) {
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});

function listener() {
  let token = select(store.getState())
  instance.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export { instance }
export default axios