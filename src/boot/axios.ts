import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create();

axios.interceptors.request.use(
  function(config) {

    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default boot(({app}) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export {api, axios};
