import './assets/main.css';
import { getContext } from 'sillytavern-extension-api';

import { createApp } from 'vue';
import App from './App.vue';

const tavernContext = getContext();

const extensionsSettingsElem = document.getElementById('#extensions_settings');
const appElem = extensionsSettingsElem!.appendChild(new HTMLDivElement());

createApp(App).mount(appElem);
