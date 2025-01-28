export enum MessageUpdateReason {
    EDIT,
    SWIPE,
    STREAM,
    STREAM_END,
    UNKNOWN,
}

export type Events = {
    messageUpdated: (newMessage: string, updateReason: MessageUpdateReason) => void;
    initVariables: (currentMessage: string) => void;
    updateVariables: (oldVariables: Record<string, any>, currentMessage: string) => void;
};
