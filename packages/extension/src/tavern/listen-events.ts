import { getContext } from 'sillytavern-extension-api';
import { reloadVue } from './reload-vue';
import { renderVue } from './render/render-vue';
import { updateLastMessage } from './render/update-last-message';

export const listenEvents = () => {
    const { event_types, eventSource } = getContext();
    const listeners = {
        [event_types.CHAT_CHANGED]: async () => {
            await reloadVue();
            renderVue();
        },
        [event_types.MESSAGE_DELETED]: renderVue,
        [event_types.CHARACTER_MESSAGE_RENDERED]: renderVue,
        [event_types.USER_MESSAGE_RENDERED]: renderVue,
        [event_types.MESSAGE_UPDATED]: renderVue,
        [event_types.MESSAGE_SWIPED]: renderVue,
        [event_types.STREAM_TOKEN_RECEIVED]: updateLastMessage,
    };

    for (const key in listeners) {
        eventSource.on(key, (listeners as any)[key]);
    }
};
