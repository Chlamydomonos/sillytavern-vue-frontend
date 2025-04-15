interface TavernContext {
    saveSettingsDebounced: () => void;
    messageFormatting: (
        mes: string,
        ch_name: string,
        isSystem: boolean,
        isUser: boolean,
        messageId: number,
        sanitizerOverrides?: object
    ) => string;
    event_types: TavernEventTypes;
    eventSource: TavernEventEmitter;
    characterId: number;
    characters: TavernV1CharData[];
    chat: Chat[];
    saveChat: () => Promise<void>;
    setExtensionPrompt: SetExtensionPrompt;
    registerMacro: (key: string, value: string | ((nonce: string) => string), description?: string) => void;
    name1: string;
    getThumbnailUrl: (type: string, file: string) => string;
}

declare module 'sillytavern-extension-api' {
    export const extension_settings: Record<string, any>;
    export function getContext(): TavernContext;
}
