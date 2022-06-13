import {createApp} from 'vue';
import App from '/@/App.vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.component(key, component);
}

app.config.errorHandler = (err) => {
  /* handle error */
  console.log(err);
};
//注册全局组件
// app.component('TodoDeleteButton', TodoDeleteButton)
app.mount('#app');
