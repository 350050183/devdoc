import {createApp} from 'vue';
import App from '/@/App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());

app.config.errorHandler = (err) => {
  /* handle error */
  console.log(err);
};
//注册全局组件
// app.component('TodoDeleteButton', TodoDeleteButton)
app.mount('#app');
