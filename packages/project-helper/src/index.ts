import { inject, type App } from 'vue';
import { FakeWrapperAPI } from './fake-wrapper-api';
import { FakeEventEmitter } from './fake-event-emitter';
import { useMessage } from './use-message';
import { useFloor } from './use-floor';

export const ProjectHelper = {
    acceptVueApp: (app: () => App) => {
        const original = (window as any).acceptVueApp;
        if (original) {
            original(app);
        }
    },

    /**
     * @deprecated 使用 {@link useMessage}
     */
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

    extensionVersion: () => {
        return inject('extensionVersion', '<1.3.0');
    },

    /**
     * @deprecated 使用 {@link useFloor}
     */
    messageId: () => {
        return inject('messageId', 0);
    },

    useMessage,
    useFloor,
};

export { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
