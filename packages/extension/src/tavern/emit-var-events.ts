import { getContext } from 'sillytavern-extension-api';
import { emitVarEvent } from './emit-var-event';

export const emitVarEvents = (start: number = 0, forceUpdate: boolean = true) => {
    const context = getContext();
    const chat = context.chat;
    for (const [mesId, mes] of chat.entries()) {
        if (!mes.is_system && !mes.is_user && mesId >= start) {
            emitVarEvent(mesId, forceUpdate);
        }
    }
};
