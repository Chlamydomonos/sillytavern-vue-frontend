export type WrapperApi = {
    renderMessage: (content: string) => string;
    messageVars: () => Record<string, any>;
    saveChat: () => Promise<void>;
};
