import { getContext } from 'sillytavern-extension-api';

export const cardVars = (): Record<string, any> => {
    const context = getContext();
    const char = context.characters[context.characterId];
    if (!char) {
        return {};
    }
    const extensions = char.data.extensions as Record<string, any>;
    if (!extensions.vueFrontendData) {
        extensions.vueFrontendData = {};
    }
    return extensions.vueFrontendData;
};
