import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import '@/styles/index.scss';

const extensionsSettingsElem = document.getElementById('extensions_settings');
const settingDiv = document.createElement('div');
settingDiv.id = 'vue-frontend-settings';
const appElem = extensionsSettingsElem!.appendChild(settingDiv);

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount(appElem);
