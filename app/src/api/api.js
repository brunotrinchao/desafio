import axios from 'axios';
import urls from './url';

const Api = {
  install(Vue) {
    const instance = axios.create({
      baseURL: urls.BASE_API,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      loader: '.conteudo-pagina',
      exibirErro: true
    });

    Vue.prototype.$api = instance;
  }
};

export default Api;
