import { getContext } from 'sillytavern-extension-api';

export const renderMessage = (charName: string, mesId: number) => (content: string) =>
    getContext().messageFormatting(content, charName, false, false, mesId);
