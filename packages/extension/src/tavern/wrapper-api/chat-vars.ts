import { getContext } from 'sillytavern-extension-api';

export const chatVars = (): Record<string, any> => {
    const context = getContext();
    const chatMetadata = context.chatMetadata;
    if (!chatMetadata.variables || typeof chatMetadata.variables !== 'object') {
        chatMetadata.variables = {};
    }
    return chatMetadata.variables;
};
