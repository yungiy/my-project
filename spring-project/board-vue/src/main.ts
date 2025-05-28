import {createApp} from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './app/routes';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VueQueryPlugin);
app.mount('#app');