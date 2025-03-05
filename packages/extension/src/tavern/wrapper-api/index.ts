import type { App } from 'vue';
import { renderMessage } from './render-message';
import { messageVars } from './message-vars';
import { saveChat } from './save-chat';
import { useWorldInfoStore } from '@/stores/world-info';
import { getContext } from 'sillytavern-extension-api';

export const createWrapperApi = (app: App, charName: string, mesId: number) => {
    app.provide('wrapperApi', {
        renderMessage: renderMessage(charName, mesId),
        messageVars: messageVars(mesId),
        saveChat: saveChat(mesId),
        getVueBook: () => useWorldInfoStore().vueBook,
        getUserName: () => getContext().name1,
    });
};
