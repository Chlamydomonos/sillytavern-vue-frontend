import { useSettingsStore } from '@/stores/setting';
import { getContext } from 'sillytavern-extension-api';
import { createWorldInfoEntry, loadWorldInfo, saveWorldInfo } from 'sillytavern-world-api';
import { reloadVue } from './reload-vue';
import { renderVue } from './render/render-vue';
import { cleanVue } from './render/clean-vue';
import { MessageUpdateReason } from '@sillytavern-vue-frontend/frontend-event-emitter';

export const uploadFrontend = async () => {
    try {
        let directoryHandle = (await (window as any).showDirectoryPicker()) as FileSystemDirectoryHandle;
        if (directoryHandle.name == 'dist') {
            directoryHandle = await directoryHandle.getDirectoryHandle('assets');
        }

        let cssHandle: FileSystemHandle | undefined;
        let jsHandle: FileSystemHandle | undefined;
        for await (const [name, handle] of (directoryHandle as any).entries() as AsyncIterableIterator<
            [string, FileSystemHandle]
        >) {
            if (name.startsWith('index')) {
                if (name.endsWith('.css')) {
                    cssHandle = handle;
                }
                if (name.endsWith('.js')) {
                    jsHandle = handle;
                }
            }
        }

        if (!cssHandle || !jsHandle) {
            throw Error();
        }

        if (cssHandle.kind != 'file' || jsHandle.kind != 'file') {
            throw Error();
        }

        const cssFile = await (cssHandle as FileSystemFileHandle).getFile();
        const jsFile = await (jsHandle as FileSystemFileHandle).getFile();
        const cssContent = await cssFile.text();
        const jsContent = await jsFile.text();

        try {
            const context = getContext();
            const currentCharacter = context.characters[context.characterId];
            if (!currentCharacter) {
                alert('未找到角色');
                return;
            }

            const bookName = currentCharacter.data?.character_book?.name;
            if (!bookName) {
                alert('角色世界书不存在，请先创建并绑定角色世界书');
                return;
            }

            const worldInfo = await loadWorldInfo(bookName);
            if (!worldInfo) {
                alert('读取角色世界书失败');
                return;
            }

            let vueCssEntry: TavernV2DataWorldInfoEntry | undefined;
            let vueJsEntry: TavernV2DataWorldInfoEntry | undefined;

            for (const key in worldInfo.entries) {
                const entry = worldInfo.entries[key];
                if (entry.comment == 'vue-css') {
                    vueCssEntry = entry;
                }
                if (entry.comment == 'vue-js') {
                    vueJsEntry = entry;
                }
            }

            if (!vueCssEntry) {
                vueCssEntry = createWorldInfoEntry(bookName, worldInfo);
            }
            if (!vueJsEntry) {
                vueJsEntry = createWorldInfoEntry(bookName, worldInfo);
            }

            if (!vueCssEntry || !vueJsEntry) {
                alert('创建世界书条目失败');
                return;
            }

            vueCssEntry.comment = 'vue-css';
            vueJsEntry.comment = 'vue-js';
            vueCssEntry.content = cssContent;
            vueJsEntry.content = jsContent;
            await saveWorldInfo(bookName, worldInfo);

            const { settings } = useSettingsStore();
            if (settings.enabled) {
                cleanVue();
                await reloadVue();
                await renderVue(MessageUpdateReason.UNKNOWN);
            }
            alert('成功上传Vue前端');
        } catch (e) {
            console.log('Err uploading vue frontend');
            console.log(e);
            if (e instanceof Error) {
                console.log('stack trace:');
                console.log(e.stack);
            }
            alert('未知问题');
        }
    } catch (e) {
        console.log('Err uploading vue frontend');
        console.log(e);
        alert('无法从指定文件夹上传Vue前端，请检查输入目录是否正确');
    }
};
