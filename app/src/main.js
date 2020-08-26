import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import App from './App.vue';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import api from '@/api/api';

import helper from '@/helper';
Vue.use(helper);

import money from 'v-money';
Vue.use(money, { precision: 4 });

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
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
