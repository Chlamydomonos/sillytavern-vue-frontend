import { inject, type App } from 'vue';
import { FakeWrapperAPI } from './fake-wrapper-api';
import { FakeEventEmitter } from './fake-event-emitter';

export const ProjectHelper = {
    acceptVueApp: (app: () => App) => {
        (window as any).acceptVueApp(app);
    },

    initialMessage: () => {
        return inject('initialMessage', '');
    },

    eventEmitter: () => {
        return inject('frontendEventEmitter', FakeEventEmitter);
    },

    tavernContext: () => {
        const getter = inject('tavernContext');
        return (getter as () => any)();
    },

    wrapperApi: () => {
        return inject('wrapperApi', FakeWrapperAPI);
    },
};
