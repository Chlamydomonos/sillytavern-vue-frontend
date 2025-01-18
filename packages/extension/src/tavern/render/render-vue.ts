import { getContext } from 'sillytavern-extension-api';
import { renderSingleVueApp } from './render-single-vue-app';

export const renderVue = () => {
    const chat = getContext().chat;

    const chatDiv = document.getElementById('chat') as HTMLDivElement | undefined;
    if (!chatDiv) {
        return;
    }

    for (const node of chatDiv.childNodes) {
        if (node instanceof HTMLDivElement) {
            const isMsg = node.classList.contains('mes');
            if (!isMsg) {
                continue;
            }

            const rendered = node.attributes.getNamedItem('vue-rendered');
            if (rendered) {
                continue;
            }

            const isUser = node.attributes.getNamedItem('is_user');
            const isSystem = node.attributes.getNamedItem('is_system');
            if (!isUser || !isSystem) {
                continue;
            }
            const isUserValue = isUser.value;
            const isSystemValue = isSystem.value;
            if (isUserValue == 'true' || isSystemValue == 'true') {
                continue;
            }

            const mesId = parseInt(node.attributes.getNamedItem('mesid')?.value ?? '-1');
            if (mesId < 0) {
                continue;
            }

            console.log(`尝试渲染消息#${mesId}...`);

            renderSingleVueApp(mesId, chat[mesId].mes, node);
        }
    }
};
