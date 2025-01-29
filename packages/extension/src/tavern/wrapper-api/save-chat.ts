import { getContext } from 'sillytavern-extension-api';
import { handleVarChange } from '../handle-var-change';
import { messageVars } from './message-vars';

export const saveChat = (mesId: number) => {
    const context = getContext();
    const chat = context.chat;
    const original = context.saveChat;
    return async () => {
        if (mesId == chat.length - 1) {
            handleVarChange(messageVars(mesId));
            await original();
            return;
        }

        let hasCharAfter = false;
        for (let i = mesId; i < chat.length; i++) {
            if (!chat[i].is_system && !chat[i].is_user) {
                hasCharAfter = true;
                break;
            }
        }
        if (!hasCharAfter) {
            handleVarChange(messageVars(mesId));
            await original();
        }
    };
};
