import { getContext } from 'sillytavern-extension-api';
import { reloadVue } from './reload-vue';
import { renderVue } from './render/render-vue';
import { updateLastMessage } from './render/update-last-message';
import { cleanVue } from './render/clean-vue';
import { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { emitVarEvent } from './emit-var-event';
import { emitVarEvents } from './emit-var-events';
import { handlePrompt } from './handle-prompt';

export const listenEvents = () => {
    const { event_types, eventSource } = getContext();
    const listeners = {
        [event_types.CHAT_CHANGED]: async () => {
            await reloadVue();
            renderVue(MessageUpdateReason.UNKNOWN);
            emitVarEvents();
        },
        [event_types.MESSAGE_DELETED]: (mesId: number) => {
            cleanVue();
            renderVue(MessageUpdateReason.UNKNOWN);
            emitVarEvents(mesId - 1);
        },
        [event_types.CHARACTER_MESSAGE_RENDERED]: (mesId: number) => {
            renderVue(MessageUpdateReason.STREAM_END);
            emitVarEvent(mesId);
        },
        [event_types.MESSAGE_UPDATED]: (mesId: number) => {
            renderVue(MessageUpdateReason.EDIT);
            emitVarEvents(mesId - 1);
        },
        [event_types.MESSAGE_SWIPED]: (mesId: number) => {
            renderVue(MessageUpdateReason.SWIPE);
            emitVarEvent(mesId);
        },
        [event_types.STREAM_TOKEN_RECEIVED]: updateLastMessage,
        [event_types.CHAT_COMPLETION_PROMPT_READY]: handlePrompt,
    };

    for (const key in listeners) {
        eventSource.on(key, (...args: any[]) => {
            const listener = (listeners as any)[key];
            console.log('Vue frontend: SillyTavern event received:', key);
            console.log('args:', args);
            listener(...args);
        });
    }
};
