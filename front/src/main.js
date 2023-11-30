import './assets/main.css'
import 'virtual:windi.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ElButton } from 'element-plus';


const app = createApp(App)
app.use(ElButton)

app.use(createPinia())
app.use(router)

app.mount('#app')
