import { useVueAppStore } from '@/stores/vue-app';

export const cleanVue = () => {
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

            const mesBlock = node.querySelector('.mes_block');
            if (!mesBlock) {
                return;
            }

            const mesText = mesBlock.querySelector('.mes_text');
            if (!mesText) {
                return;
            }

            (mesText as HTMLDivElement).hidden = false;

            const vueAppDiv = mesBlock.querySelector('.vue-frontend-app');
            if (vueAppDiv) {
                vueAppDiv.remove();
            }
        }
    }

    const { chatApps } = useVueAppStore();

    for (const key in chatApps) {
        delete chatApps[key];
    }
};
