# SillyTavern的Vue前端插件

这个插件可以用Vue前端替换SillyTavern自带的消息渲染界面。就是这样。还处于早期阶段，可能不太好用。

## 使用方法

- 创建一个以Vite为构建工具的Vue项目（如果使用`npm`的话，只需要运行`npm init vue@latest`）。
- 运行`npm install @sillytavern-vue-frontend/project-helper --registry https://npm.chlamydomonos.xyz/`，安装SillyTavern Vue前端库。
- 在`main.ts`中，移除`.mount('#app')`或类似代码。从`@sillytavern-vue-frontend/project-helper`中导入`ProjectHelper`对象，使用`ProjectHelper.acceptVueApp`函数来把Vue APP暴露给插件。
- 用Vite构建项目得到`dist`文件夹。在SillyTavern中打开角色卡并绑定世界书后，点击Vue前端插件的“上传Vue前端到世界书”按钮上传该文件夹。注意，只有`index-XXXXXXXX.css`和`index-XXXXXXXX.js`文件会被上传。额外的css、js文件以及图片等资源文件不会上传。
- 刷新窗口后，角色输出的每条消息都会被替换为一个Vue前端实例。

具体的示例参见[示例项目](https://github.com/Chlamydomonos/sillytavern-vue-frontend-example)

## 接口

声明：接口还处于早期阶段，将在后续设计更多接口。

前端中可用的接口位于包`@sillytavern-vue-frontend/project-helper`导出的成员`ProjectHelper`中。其类型定义如下：

```ts
interface ProjectHelper
{
    // 注册Vue APP
    acceptVueApp: (app: () => App) => void;

    // 前端创建那一刻对应的SillyTavern消息。如果消息内容发生改变会通过事件通知，此函数的返回值不会变化。
    initialMessage: () => string;

    // 事件系统
    eventEmitter: () => FrontendEventEmitter;

    // 原始的SillyTavern上下文。由于其类型过于复杂，暂时是any。
    tavernContext: () => any;

    // Wrapper API
    wrapperApi: () => WrapperAPI;

    // 注册Vue世界书
    registerVarWorldInfo: <T extends Record<string, any>>(predicate: (vars: T) => boolean, name: string) => void;

    // 插件版本号
    extensionVersion: () => string;
}
```

目前的接口通过[Vue依赖注入](https://cn.vuejs.org/guide/components/provide-inject)提供。因此在非Vue环境下使用接口会出现问题。

### Wrapper API

Wrapper API是正在开发中的把SillyTavern API简化后的接口。目前其类型声明如下：

```ts
interface WrapperAPI {
    // 调用SillyTavern的渲染系统把传给前端的原始消息渲染成HTML
    renderMessage(message: string): string;

    // 获得和当前楼层绑定的变量系统
    messageVars: () => Record<string, any>;

    // 保存聊天记录，同时更新用messageVars获得的变量
    saveChat: () => Promise<void>;

    // 获取Vue世界书
    getVueBook: () => Record<string, { content: string; depth: number }>;

    // 获取User名字
    getUserName: () => string;

    // 获取User头像路径
    getUserAvatarPath: () => string;

    // 获取Char头像路径
    getCharAvatarPath: () => string;

    // 统计Token数量
    countTokens: (str: string, padding?: number) => Promise<number>;

    // 获取原始聊天记录（未经正则修改）
    getRawChat: () => { role: string; content: string }[];
}
```

## 事件系统

事件系统正在开发中。目前的声明如下：

```ts
interface FrontendEventEmitter {
    on(eventName: string, listener: (...args: any[]) => void): void;
    off(eventName: string, listener: (...args: any[]) => void): void;
}
```

通过`on`监听一个事件，通过`off`取消监听。

目前可以监听的事件如下：

| 事件名 | 监听器类型 | 描述 |
| - | - | - |
| `messageUpdated` | `(newMessage: string, updateReason: MessageUpdateReason) => void` | 在前端对应的消息更新后触发。 |
| `initVariables` | `(currentMessage: string) => void` | 在楼层变量需要初始化时触发。 |
| `updateVariables` | `(oldVariables: Record<string, any>, currentMessage: string) => void` | 在楼层变量需要更新时触发。 |
| `promptReady` | `(chat: { role: string; content: string }[], dryRun: boolean) => void` | 在Prompt即将发送给AI时触发。 |

## 楼层变量与Vue世界书

通过上述接口可以定义楼层变量。

在角色世界书中创建名为`Vue-XXX`的条目，它就成为Vue世界书。在代码中使用`registerVarWorldInfo`注册Vue世界书时应该去掉`Vue-`前缀。

目前Vue世界书只支持固定深度注入。其他注入方式将不被识别。
