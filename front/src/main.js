import './assets/main.css'
import 'virtual:windi.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElButton } from 'element-plus';

import App from './App.vue'
import router from './router'
import request from "./utils/request";

const app = createApp(App)
app.config.globalProperties.$axios = request;

app.use(ElButton)
app.use(createPinia())
app.use(router)



app.mount('#app')
