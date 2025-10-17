import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number, callback?: (hasSavedVars: boolean) => void) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    let hasSavedVars = true;

    if (!mes.variables) {
        mes.variables = {};
    }

    if (Object.keys(mes.variables).length == 0) {
        hasSavedVars = false;
    }

    if (callback) {
        callback(hasSavedVars);
    }
    return mes.variables;
};
