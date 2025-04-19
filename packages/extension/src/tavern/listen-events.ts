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
            await renderVue(MessageUpdateReason.UNKNOWN);
            await emitVarEvents();
        },
        [event_types.MESSAGE_DELETED]: async (mesId: number) => {
            cleanVue();
            await renderVue(MessageUpdateReason.UNKNOWN);
            await emitVarEvents(mesId - 1);
        },
        [event_types.CHARACTER_MESSAGE_RENDERED]: async (mesId: number) => {
            await renderVue(MessageUpdateReason.STREAM_END);
            await emitVarEvent(mesId);
        },
        [event_types.MESSAGE_UPDATED]: async (mesId: number) => {
            await renderVue(MessageUpdateReason.EDIT);
            await emitVarEvents(mesId - 1);
        },
        [event_types.MESSAGE_SWIPED]: async (mesId: number) => {
            await renderVue(MessageUpdateReason.SWIPE);
            await emitVarEvent(mesId);
        },
        [event_types.STREAM_TOKEN_RECEIVED]: updateLastMessage,
        [event_types.CHAT_COMPLETION_PROMPT_READY]: handlePrompt,
        [event_types.GENERATION_ENDED]: async (mesId: number) => {
            await renderVue(MessageUpdateReason.STREAM_END);
            await emitVarEvents(mesId);
        },
    };

    for (const key in listeners) {
        eventSource.on(key, async (...args: any[]) => {
            const listener = (listeners as any)[key];
            console.log('Vue frontend: SillyTavern event received:', key);
            console.log('args:', args);
            await listener(...args);
        });
    }
};
