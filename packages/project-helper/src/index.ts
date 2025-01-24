import { inject, type App } from 'vue';
import type { FrontendEventEmitter } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { WrapperApi } from './wrapper-api';
import { FakeWrapperAPI } from './fake-wrapper-api';

export const ProjectHelper = {
    acceptVueApp: (app: () => App) => {
        (window as any).acceptVueApp(app);
    },

    initialMessage: () => {
        return inject('initialMessage', '');
    },

    eventEmitter: () => {
        return inject('frontendEventEmitter', undefined as any as Omit<FrontendEventEmitter, 'emit'>);
    },

    tavernContext: () => {
        const getter = inject('tavernContext');
        return (getter as () => any)();
    },

    wrapperApi: () => {
        const api = inject('wrapperApi', undefined as any as WrapperApi);
        if (!api) {
            console.log('获取Wrapper API失败');
            return FakeWrapperAPI;
        }
        console.log('获取Wrapper API:', api);
        return api;
    },
};
