import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number, callback?: (hasSavedVars: boolean) => void) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    let hasSavedVars = true;

    if (!mes.extra) {
        mes.extra = {};
        hasSavedVars = false;
    }
    if (!mes.extra.vueFrontendVars) {
        mes.extra.vueFrontendVars = {};
        hasSavedVars = false;
    }
    if (callback) {
        callback(hasSavedVars);
    }
    return mes.extra.vueFrontendVars as Record<string, any>;
};
