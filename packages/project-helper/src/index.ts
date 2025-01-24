import { inject, type App } from 'vue';
import { FakeWrapperAPI } from './fake-wrapper-api';
import { FakeEventEmitter } from './fake-event-emitter';
import { FrontendEventEmitter } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { WrapperApi } from './wrapper-api';

const ProjectHelperInner = {
    initialMessage: undefined as string | undefined,
    eventEmitter: undefined as FrontendEventEmitter | undefined,
    tavernContext: undefined as (() => any) | undefined,
    wrapperAPI: undefined as WrapperApi | undefined,
};

export const ProjectHelper = {
    acceptVueApp: (app: () => App) => {
        (window as any).acceptVueApp(app);
    },

    initialMessage: () => {
        if (!ProjectHelperInner.initialMessage) {
            ProjectHelperInner.initialMessage = inject('initialMessage', '');
        }
        return ProjectHelperInner.initialMessage;
    },

    eventEmitter: () => {
        if (!ProjectHelperInner.eventEmitter) {
            ProjectHelperInner.eventEmitter = inject('frontendEventEmitter', FakeEventEmitter);
        }
        return ProjectHelperInner.eventEmitter;
    },

    tavernContext: () => {
        if (!ProjectHelperInner.tavernContext) {
            ProjectHelperInner.tavernContext = inject('tavernContext');
        }
        return ProjectHelperInner.tavernContext!();
    },

    wrapperApi: () => {
        if (!ProjectHelperInner.wrapperAPI) {
            ProjectHelperInner.wrapperAPI = inject('wrapperApi', FakeWrapperAPI);
        }
        return ProjectHelperInner.wrapperAPI;
    },
};
