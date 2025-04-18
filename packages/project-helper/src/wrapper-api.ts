export type WrapperApi = {
    renderMessage: (content: string) => string;
    messageVars: () => Record<string, any>;
    saveChat: () => Promise<void>;
    getVueBook: () => Record<string, { content: string; depth: number }>;
    getUserName: () => string;
    getUserAvatarPath: () => string;
    getCharAvatarPath: () => string;
    countTokens: (str: string, padding?: number) => Promise<number>;
    getRawChat: () => { role: string; content: string }[];
    cardVars: () => Record<string, any>;
    saveCard: () => Promise<void>;
};
