import { getContext } from 'sillytavern-extension-api';

export const messageVars = (mesId: number) => () => {
    const context = getContext();
    const mes = context.chat[mesId];
    if (!mes.swipes) {
        if (!mes.extra) {
            mes.extra = {};
        }
        if (!mes.extra.vueFrontendVars) {
            mes.extra.vueFrontendVars = {};
        }
        return mes.extra.vueFrontendVars as Record<string, any>;
    } else {
        const swipeInfo = mes.swipe_info[mes.swipe_id];
        if (!swipeInfo.extra) {
            swipeInfo.extra = {};
        }
        if (!swipeInfo.extra.vueFrontendVars) {
            swipeInfo.extra.vueFrontendVars = {};
        }
        return swipeInfo.extra.vueFrontendVars as Record<string, any>;
    }
};
