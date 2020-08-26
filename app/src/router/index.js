import Vue from 'vue';
import VueRouter from 'vue-router';
import Contas from '../components/contas/index.vue';
import Transacoes from '../components/transacoes/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Contas',
    component: Contas
  },
  {
    path: '/transacoes',
    name: 'Transacoes',
    component: Transacoes
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
