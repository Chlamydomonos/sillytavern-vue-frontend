import { inject, type App } from 'vue';
import { FakeWrapperAPI } from './fake-wrapper-api';
import { FakeEventEmitter } from './fake-event-emitter';

export const ProjectHelper = {
    acceptVueApp: (app: () => App) => {
        const original = (window as any).acceptVueApp;
        if (original) {
            original(app);
        }
    },

    initialMessage: () => {
        return inject('initialMessage', '');
    },

    eventEmitter: () => {
        return inject('frontendEventEmitter', FakeEventEmitter);
    },

    tavernContext: () => {
        const getter = inject('tavernContext');
        return getter as () => any;
    },

    wrapperApi: () => {
        return inject('wrapperApi', FakeWrapperAPI);
    },

    registerVarWorldInfo: <T extends Record<string, any>>(
        predicate: (vars: T) => boolean,
        arg: string | ((vars: T) => { content: string; depth: number })
    ) => {
        const original = (window as any).registerVarWorldInfo;
        if (original) {
            original(predicate, arg);
        }
    },
};

export { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
