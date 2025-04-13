import { useVueAppStore } from '@/stores/vue-app';
import { getContext } from 'sillytavern-extension-api';

export const handlePrompt = (eventData: { chat: { role: string; content: string }[]; dryRun: boolean }) => {
    const { vueApp } = useVueAppStore();
    if (!vueApp) {
        return;
    }

    const context = getContext();
    const chat = context.chat;
    for (let i = chat.length - 2; i >= 0; i--) {
        const mes = chat[i];
        if (!mes.is_user && !mes.is_system) {
            const eventEmitter = useVueAppStore().chatApps[i].emitter;
            eventEmitter.emit('promptReady', eventData.chat, eventData.dryRun);
            return;
        }
    }
};
