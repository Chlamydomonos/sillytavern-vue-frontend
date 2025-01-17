interface TavernContext {
    saveSettingsDebounced: () => void;
}

declare module 'sillytavern-extension-api' {
    export const extension_settings: Record<string, any>;
    export function getContext(): TavernContext;
}
