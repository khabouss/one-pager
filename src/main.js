import { createApp } from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.min.css'
import store from './store/store.js';

createApp(App).use(store).mount('#app')
