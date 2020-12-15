import Vue from 'vue';
import router from '@/router/index';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import { auth } from './utils/firebase';

Vue.use(BootstrapVue);

Vue.config.productionTip = false

export default auth.onAuthStateChanged(() => {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
});