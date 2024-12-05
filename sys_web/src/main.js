import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue'; 
import 'ant-design-vue/dist/reset.css';
import 'tailwindcss/tailwind.css'
import axios from 'axios';
import { useAuthStore } from './store/auth'; // 确保正确导入 useAuthStore

const app = createApp(App);
const pinia = createPinia();

app.use(Antd);
app.use(router);
app.use(pinia);

const authStore = useAuthStore(); // 使用 pinia 的实例获取 authStore
if (authStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
}

app.mount('#app');
