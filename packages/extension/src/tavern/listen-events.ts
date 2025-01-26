import { getContext } from 'sillytavern-extension-api';
import { reloadVue } from './reload-vue';
import { renderVue } from './render/render-vue';
import { updateLastMessage } from './render/update-last-message';
import { cleanVue } from './render/clean-vue';

export const listenEvents = () => {
    const { event_types, eventSource } = getContext();
    const listeners = {
        [event_types.CHAT_CHANGED]: async () => {
            await reloadVue();
            renderVue();
        },
        [event_types.MESSAGE_DELETED]: () => {
            cleanVue();
            renderVue();
        },
        [event_types.CHARACTER_MESSAGE_RENDERED]: renderVue,
        [event_types.USER_MESSAGE_RENDERED]: renderVue,
        [event_types.MESSAGE_UPDATED]: renderVue,
        [event_types.MESSAGE_SWIPED]: renderVue,
        [event_types.STREAM_TOKEN_RECEIVED]: updateLastMessage,
    };

    for (const key in listeners) {
        eventSource.on(key, (...args: any[]) => {
            const listener = (listeners as any)[key];
            console.log('Vue frontend: SillyTavern event received:', key);
            listener(...args);
        });
    }
};
