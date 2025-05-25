import {createApp} from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './app/routes'

const app = createApp(App);
app.use(router);
app.mount('#app');