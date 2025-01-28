import { reloadVue } from '@/tavern/reload-vue';
import { cleanVue } from '@/tavern/render/clean-vue';
import { renderVue } from '@/tavern/render/render-vue';
import { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';
import { defineStore } from 'pinia';
import { extension_settings, getContext } from 'sillytavern-extension-api';
import { reactive, watch } from 'vue';

export interface Settings {
    enabled: boolean;
}

export const useSettingsStore = defineStore('settings', () => {
    const tavernContext = getContext();

    const defaultSettings: Settings = {
        enabled: true,
    };

    const settings = reactive(defaultSettings);
    if (extension_settings['vue-frontend']) {
        const saved = extension_settings['vue-frontend'];
        for (const key in saved) {
            (settings as any)[key] = saved[key];
        }
    }

    watch(settings, async (s) => {
        if (s.enabled) {
            await reloadVue();
            renderVue(MessageUpdateReason.UNKNOWN);
        } else {
            cleanVue();
        }
        extension_settings['vue-frontend'] = { ...s };
        tavernContext.saveSettingsDebounced();
    });

    return { settings };
});
