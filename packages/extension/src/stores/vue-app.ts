import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import type { App } from 'vue';
import type { FrontendEventEmitter } from '@sillytavern-vue-frontend/frontend-event-emitter';

type VueApp = {
    app: App;
    emitter: FrontendEventEmitter;
};

export const useVueAppStore = defineStore('vue-app', () => {
    const vueApp = shallowRef<(() => App) | undefined>(undefined);
    const chatApps = shallowRef<Record<number, VueApp>>({});

    return { vueApp, chatApps };
});
