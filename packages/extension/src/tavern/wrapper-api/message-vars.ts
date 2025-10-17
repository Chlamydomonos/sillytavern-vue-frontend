import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number, callback?: (hasSavedVars: boolean) => void) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    let hasSavedVars = true;

    if (!mes.data) {
        mes.data = {};
        hasSavedVars = false;
    }
    if (!mes.data.vueFrontendVars) {
        mes.data.vueFrontendVars = {};
        hasSavedVars = false;
    }
    if (callback) {
        callback(hasSavedVars);
    }
    return mes.data.vueFrontendVars as Record<string, any>;
};
