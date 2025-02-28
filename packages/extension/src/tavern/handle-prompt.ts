import { useVueAppStore } from '@/stores/vue-app';
import { getContext } from 'sillytavern-extension-api';
import { messageVars } from './wrapper-api/message-vars';

export const handlePrompt = (eventData: { chat: { role: string; content: string }[]; dryRun: boolean }) => {
    const context = getContext();
    const chat = context.chat;
    for (let i = chat.length - 1; i >= 0; i--) {
        const mes = chat[i];
        if (!mes.is_user && !mes.is_system) {
            const eventEmitter = useVueAppStore().chatApps[i];
            eventEmitter.emit('promptReady', eventData.chat, eventData.dryRun);
            return;
        }
    }
};
