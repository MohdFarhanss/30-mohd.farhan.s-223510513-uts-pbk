import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import './styles.css';
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Quasar, {
  config: {},
});

app.config.globalProperties.$successMessage = function (message) {
  alert(message);
};


app.mount('#app');
