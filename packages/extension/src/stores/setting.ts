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

    watch(settings, (s) => {
        console.log('Settings Changed');
        extension_settings['vue-frontend'] = { ...s };
        tavernContext.saveSettingsDebounced();
    });

    return { settings };
});
