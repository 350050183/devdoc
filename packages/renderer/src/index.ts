import {createApp} from 'vue';
import App from '/@/App.vue';
import {store} from './store/store';

const app = createApp(App);
app.use(store);
app.config.errorHandler = (err) => {
  /* handle error */
  console.log(err);
};
//注册全局组件
// app.component('TodoDeleteButton', TodoDeleteButton)
app.mount('#app');
