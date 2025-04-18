import { getContext } from 'sillytavern-extension-api';
import { cardVars } from './card-vars';

export const saveCard = async () => {
    const context = getContext();
    const vars = cardVars();
    await context.writeExtensionField(context.characterId, 'vueFrontendData', { ...vars });
};
