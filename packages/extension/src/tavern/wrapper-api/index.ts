import type { App } from 'vue';
import { renderMessage } from './render-message';
import { messageVars } from './message-vars';
import { saveChat } from './save-chat';
import { useWorldInfoStore } from '@/stores/world-info';
import { getContext } from 'sillytavern-extension-api';
import { getUserAvatar, user_avatar } from 'sillytavern-persona-api';
import { getCharAvatarPath } from './get-char-avatar-path';
import { getRawChat } from './get-raw-chat';
import { cardVars } from './card-vars';
import { saveCard } from './save-card';

export const createWrapperApi = (app: App, charName: string, mesId: number) => {
    app.provide('wrapperApi', {
        renderMessage: renderMessage(charName, mesId),
        messageVars: messageVars(mesId),
        saveChat: saveChat(mesId),
        getVueBook: () => useWorldInfoStore().vueBook,
        getUserName: () => getContext().name1,
        getUserAvatarPath: () => getUserAvatar(user_avatar),
        getCharAvatarPath,
        countTokens: (str: string, padding?: number) => getContext().getTokenCountAsync(str, padding),
        getRawChat,
        cardVars,
        saveCard,
    });
};
