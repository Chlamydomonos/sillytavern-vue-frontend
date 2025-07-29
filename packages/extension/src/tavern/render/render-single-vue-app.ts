import { useSettingsStore } from '@/stores/setting';
import { useVueAppStore } from '@/stores/vue-app';
import { FrontendEventEmitter, MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { getContext } from 'sillytavern-extension-api';
import { createWrapperApi } from '../wrapper-api';
import { version } from '@/lib/version';

export const renderSingleVueApp = async (
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

    const mesTexts = mesBlock.querySelectorAll('.mes_text');
    let mesText: Element | null = null;
    for (const text of mesTexts) {
        if (!text.closest('.vue-frontend-app')) {
            mesText = text;
            break;
        }
    }

    if (!mesText) {
        return;
    }
    (mesText as HTMLDivElement).hidden = true;

    const vueAppDiv = mesBlock.querySelector('.vue-frontend-app');
    if (vueAppDiv instanceof HTMLDivElement) {
        vueAppDiv.hidden = false;
        await chatApps[mesId].emitter.emit('messageUpdated', content, reason);

        let isBottom = true;
        if (mesId < context.chat.length - 1) {
            for (let i = mesId + 1; i < context.chat.length; i++) {
                if (!context.chat[i].is_user) {
                    isBottom = false;
                    break;
                }
            }
        }
        await chatApps[mesId].emitter.emit('floorChanged', mesId, isBottom);

        return;
    }

    const newApp = vueApp();
    newApp.provide('extensionVersion', version);
    newApp.provide('messageId', mesId);
    newApp.provide('initialMessage', content);
    const newDiv = document.createElement('div');
    newDiv.classList.add('vue-frontend-app');
    newDiv.style.paddingRight = '30px';
    chName.insertAdjacentElement('afterend', newDiv);
    const newEventEmitter = new FrontendEventEmitter();
    chatApps[mesId] = { app: newApp, emitter: newEventEmitter };
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
