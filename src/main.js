import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible';
import { Button } from 'vant';
import '@/plugins/vant';

Vue.config.productionTip = false
Vue.use(Button);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
