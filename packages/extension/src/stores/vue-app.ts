import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { App } from 'vue';
import type { FrontendEventEmitter } from '@sillytavern-vue-frontend/frontend-event-emitter';

export const useVueAppStore = defineStore('vue-app', () => {
    const vueApp = shallowRef<(() => App) | undefined>(undefined);
    const chatApps = shallowRef<Record<number, FrontendEventEmitter>>({});

    return { vueApp, chatApps };
});
