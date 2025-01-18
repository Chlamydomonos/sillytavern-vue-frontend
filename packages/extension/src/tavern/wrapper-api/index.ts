import type { App } from 'vue';
import { renderMessage } from './render-message';

export const createWrapperApi = (app: App, charName: string, mesId: number) => {
    app.provide('wrapperApi', {
        renderMessage: renderMessage(charName, mesId),
    });
};
