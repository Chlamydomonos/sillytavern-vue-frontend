import { getContext } from 'sillytavern-extension-api';

export const getRawChat = () =>
    getContext().chat.map((c) => {
        const role = c.is_user ? 'user' : 'assistant';
        const content = c.swipes ? c.swipes[c.swipe_id] : c.mes;
        return { role, content };
    });
