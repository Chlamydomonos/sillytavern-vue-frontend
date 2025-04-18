import { useSettingsStore } from '@/stores/setting';
import { useVueAppStore } from '@/stores/vue-app';
import { getContext } from 'sillytavern-extension-api';
import { messageVars } from './wrapper-api/message-vars';
import { getContent } from './get-content';

export const emitVarEvent = async (mesId: number, forceUpdate: boolean = true) => {
    const { settings } = useSettingsStore();
    if (!settings.enabled) {
        return;
    }

    const currentApp = useVueAppStore().chatApps[mesId];
    if (!currentApp) {
        return;
    }

    const currentEmitter = currentApp.emitter;

    const context = getContext();
    const chat = context.chat;
    let lastMesId: number | undefined;
    for (let i = mesId - 1; i >= 0; i--) {
        const mes = chat[i];
        if (!mes.is_user && !mes.is_system) {
            lastMesId = i;
        }
    }

    let hasSavedVars = false;
    messageVars(mesId, (h) => {
        hasSavedVars = h;
    });
    if (hasSavedVars && !forceUpdate) {
        return;
    }

    console.log('Try emit var event, mesId:', mesId, 'last mesId:', lastMesId);

    if (lastMesId == undefined) {
        await currentEmitter.emit('initVariables', getContent(chat, mesId));
        return;
    }

    const oldVars = messageVars(lastMesId)();
    await currentEmitter.emit('updateVariables', oldVars, getContent(chat, mesId));
};
