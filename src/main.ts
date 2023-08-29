import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./style/main.css"
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)

// 挂载
app.mount('#app')
