import { useSettingsStore } from '@/stores/setting';
import { useVueAppStore } from '@/stores/vue-app';
import { getContext } from 'sillytavern-extension-api';
import { loadWorldInfo } from 'sillytavern-world-api';
import type { App } from 'vue';

const cleanVue = () => {
    const store = useVueAppStore();
    document.getElementById('vue-css')?.remove();
    store.vueApp = undefined;
    store.chatApps = {};
};

/**
 * 重新加载Vue APP。在聊天切换后运行。从角色世界书中寻找vue-css和vue-js这两项，并且创建Vue APP。
 */
export const reloadVue = async () => {
    const { settings } = useSettingsStore();
    const store = useVueAppStore();
    if (!settings.enabled) {
        return;
    }

    console.log('尝试重新加载vue');

    const context = getContext();
    const currentCharacter = context.characters[context.characterId];
    if (!currentCharacter) {
        console.log('未找到角色');
        cleanVue();
        return;
    }

    const bookName = currentCharacter.data?.character_book?.name;
    if (!bookName) {
        console.log('角色世界书不存在');
        cleanVue();
        return;
    }

    const bookEntries = (await loadWorldInfo(bookName))?.entries;
    if (!bookEntries) {
        console.log('读取角色世界书失败');
        cleanVue();
        return;
    }

    let jsContent: string | undefined;
    let cssContent: string | undefined;

    for (const key in bookEntries) {
        const entry = bookEntries[key];

        if (entry.comment == 'vue-js') {
            jsContent = entry.content;
        }
        if (entry.comment == 'vue-css') {
            cssContent = entry.content;
        }
    }

    if (!jsContent || !cssContent) {
        console.log('世界书中不存在vue前端');
        cleanVue();
        return;
    }

    console.log('找到vue-js和vue-css，尝试创建Vue APP');

    (window as any).acceptVueApp = (app: () => App) => {
        store.vueApp = app;
    };

    store.vueApp = undefined;
    try {
        eval(jsContent);
    } catch (e) {
        console.log('创建Vue APP失败');
        cleanVue();
        return;
    }
    if (!store.vueApp) {
        console.log('未发现Vue APP');
        cleanVue();
        return;
    }
    console.log('成功创建Vue APP');

    const styleElem = document.createElement('style');
    styleElem.id = 'vue-css';
    styleElem.textContent = cssContent;
    document.head.appendChild(styleElem);
    console.log('已挂载Vue APP对应的CSS文件');

    store.chatApps = {};
    console.log('已清空现有APP列表，准备重新渲染');
};
