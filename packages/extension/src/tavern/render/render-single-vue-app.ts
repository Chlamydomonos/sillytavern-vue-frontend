import { useSettingsStore } from '@/stores/setting';
import { useVueAppStore } from '@/stores/vue-app';
import { FrontendEventEmitter, MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { getContext } from 'sillytavern-extension-api';
import { createWrapperApi } from '../wrapper-api';

export const renderSingleVueApp = (
    mesId: number,
    content: string,
    mes: HTMLDivElement,
    reason: MessageUpdateReason
) => {
    const { vueApp, chatApps } = useVueAppStore();
    const { settings } = useSettingsStore();
    if (!vueApp || !settings.enabled) {
        return;
    }

    const context = getContext();

    const mesBlock = mes.querySelector('.mes_block');
    if (!mesBlock) {
        return;
    }

    const chName = mesBlock.querySelector('.ch_name');
    if (!chName) {
        return;
    }

    const mesText = mesBlock.querySelector('.mes_text');
    if (!mesText) {
        return;
    }
    (mesText as HTMLDivElement).hidden = true;

    const vueAppDiv = mesBlock.querySelector('.vue-frontend-app');
    if (vueAppDiv instanceof HTMLDivElement) {
        vueAppDiv.hidden = false;
        chatApps[mesId].emit('messageUpdated', content, reason);
        return;
    }

    const newApp = vueApp();
    newApp.provide('initialMessage', content);
    const newDiv = document.createElement('div');
    newDiv.classList.add('vue-frontend-app');
    newDiv.style.paddingRight = '30px';
    chName.insertAdjacentElement('afterend', newDiv);
    const newEventEmitter = new FrontendEventEmitter();
    chatApps[mesId] = newEventEmitter;
    newApp.provide('frontendEventEmitter', newEventEmitter);
    newApp.provide('tavernContext', getContext);
    createWrapperApi(newApp, context.characters[context.characterId].name, mesId);
    newApp.mount(newDiv);

    const observer = new MutationObserver(() => {
        const isEditing = document.getElementById('curEditTextarea');
        if (isEditing && isEditing.parentNode == mesText) {
            (mesText as HTMLDivElement).hidden = false;
            newDiv.hidden = true;
        }
    });

    observer.observe(mesText, { childList: true, subtree: true, characterData: true });
};
