import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number, callback?: (hasSavedVars: boolean) => void) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    let hasSavedVars = true;
    if (!mes.swipes) {
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
    } else {
        const swipeInfo = mes.swipe_info[mes.swipe_id];
        if (!swipeInfo.extra) {
            swipeInfo.extra = {};
            hasSavedVars = false;
        }
        if (!swipeInfo.extra.vueFrontendVars) {
            swipeInfo.extra.vueFrontendVars = {};
            hasSavedVars = false;
        }
        if (callback) {
            callback(hasSavedVars);
        }
        return swipeInfo.extra.vueFrontendVars as Record<string, any>;
    }
};
