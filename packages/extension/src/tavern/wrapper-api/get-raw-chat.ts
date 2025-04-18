import { getContext } from 'sillytavern-extension-api';

export const getRawChat = () => {
    const chat = getContext().chat;
    const rawChat: { role: string; content: string }[] = [];
    for (const item of chat) {
        const role = item.is_user ? 'user' : 'assistant';
        if (item.swipes && item.swipe_id > item.swipes.length) {
            continue;
        }
        const content = item.swipes ? item.swipes[item.swipe_id] : item.mes;
        rawChat.push({ role, content });
    }
    return rawChat;
};
