import { renderSingleVueApp } from './render-single-vue-app';

export const updateLastMessage = (content: string) => {
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

        renderSingleVueApp(mesId, content, lastMes);
    }
};
