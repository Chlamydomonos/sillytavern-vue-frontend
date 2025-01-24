import { FrontendEventEmitter } from '@sillytavern-vue-frontend/frontend-event-emitter';

export const FakeEventEmitter = {
    on(..._args: any[]) {},
} as FrontendEventEmitter;
