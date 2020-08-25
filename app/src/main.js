import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import App from './App.vue';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';

import api from '@/api/api';

import helper from '@/helper';
Vue.use(helper);

Vue.use(BootstrapVue);
Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    Vue.use(api, { root: this });
  }
}).$mount('#app');
