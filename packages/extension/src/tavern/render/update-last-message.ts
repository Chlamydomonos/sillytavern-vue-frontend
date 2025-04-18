import { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { renderSingleVueApp } from './render-single-vue-app';

export const updateLastMessage = async (content: string) => {
    const chatDiv = document.getElementById('chat') as HTMLDivElement | undefined;
    if (!chatDiv) {
        return;
    }
    const lastMes = chatDiv.querySelector('.last_mes');
    if (lastMes instanceof HTMLDivElement) {
        const mesIdAttr = lastMes.attributes.getNamedItem('mesid');
        if (!mesIdAttr) {
            return;
        }
        const mesId = parseInt(mesIdAttr.value);

        await renderSingleVueApp(mesId, content, lastMes, MessageUpdateReason.STREAM);
    }
};
