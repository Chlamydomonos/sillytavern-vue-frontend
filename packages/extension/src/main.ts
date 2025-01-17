import './assets/main.css';
import { getContext } from 'sillytavern-extension-api';

import { createApp } from 'vue';
import App from './App.vue';

const tavernContext = getContext();

createApp(App).mount('#app');
