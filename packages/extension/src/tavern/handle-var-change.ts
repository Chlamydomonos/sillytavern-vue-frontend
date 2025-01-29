import { useWorldInfoStore } from '@/stores/world-info';
import { ExtensionPromptPosition } from '@/tavern-types/enums';
import { getContext } from 'sillytavern-extension-api';

export const handleVarChange = async (vars: Record<string, any>) => {
    const { worldInfo, vueBook } = useWorldInfoStore();
    const context = getContext();
    try {
        for (const item of worldInfo) {
            if (item.name in vueBook && item.predicate(vars)) {
                const entry = vueBook[item.name];
                context.setExtensionPrompt(
                    `Vue-${item.name}`,
                    entry.content,
                    ExtensionPromptPosition.IN_CHAT,
                    entry.depth
                );
            } else {
                context.setExtensionPrompt(`Vue-${item.name}`, '', ExtensionPromptPosition.AFTER_STORY, 0);
            }
        }
    } catch (e) {
        console.log(e);
    }
};
