import { getContext } from 'sillytavern-extension-api';
import { emitVarEvent } from './emit-var-event';

export const emitVarEvents = () => {
    const context = getContext();
    const chat = context.chat;
    for (const [mesId, mes] of chat.entries()) {
        if (!mes.is_system && !mes.is_user) {
            emitVarEvent(mesId);
        }
    }
};
