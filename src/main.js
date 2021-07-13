import { createApp } from 'vue';
import App from './App.vue';
import './assets/sass/main.scss';
import i18n from './util/i18n';

const app = createApp(App);
app.use(i18n);
app.mount('#app');
