import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

import 'nprogress/nprogress.css'

import 'virtual:windi.css'

import './permission'

//全局引入并使用该自定义指令
import permission from '@/directives/permission.js'
app.use(permission)

app.mount('#app')