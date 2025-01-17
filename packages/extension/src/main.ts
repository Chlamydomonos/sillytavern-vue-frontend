import 'element-plus/theme-chalk/dark/css-vars.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const extensionsSettingsElem = document.getElementById('extensions_settings');
const settingDiv = document.createElement('div');
settingDiv.id = 'vue-frontend-settings';
const appElem = extensionsSettingsElem!.appendChild(settingDiv);

const htmlRes = document.evaluate('/html', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
const htmlElem = htmlRes.singleNodeValue;
if (htmlElem) {
    (htmlElem as HTMLElement).classList.add('dark');
}

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount(appElem);
