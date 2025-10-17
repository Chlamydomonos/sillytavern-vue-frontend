import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number, callback?: (hasSavedVars: boolean) => void) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    const swipes = mes.swipes?.length ?? 1;
    let hasSavedVars = true;

    if (!Array.isArray(mes.variables)) {
        mes.variables = [{}];
    }

    while (mes.variables.length < swipes) {
        mes.variables.push({});
    }

    if (Object.keys(mes.variables[mes.swipe_id ?? 0]).length == 0) {
        hasSavedVars = false;
    }

    if (callback) {
        callback(hasSavedVars);
    }

    return mes.variables[mes.swipe_id ?? 0];
};
