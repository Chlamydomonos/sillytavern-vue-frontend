import { useVueAppStore } from '@/stores/vue-app';
import { getContext } from 'sillytavern-extension-api';

export const handleMessageSent = async (mesId: number) => {
    const chat = getContext().chat;
    const { chatApps } = useVueAppStore();
    for (let i = mesId; i >= 0; i--) {
        if (!chat[i].is_user && !chat[i].is_system && chatApps[i]) {
            await chatApps[i].emitter.emit('messageSent', chat[mesId].mes);
            break;
        }
    }
};
