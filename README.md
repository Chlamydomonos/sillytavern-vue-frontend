# SillyTavern的Vue前端插件

这个插件可以用Vue前端替换SillyTavern自带的消息渲染界面。就是这样。还处于早期阶段，可能不太好用。

## 使用方法

提前声明：本插件还处于早期阶段，使用起来非常不方便，暂时不建议使用。

- 创建一个以Vite为构建工具的Vue项目（如果使用`npm`的话，只需要运行`npm init vue@latest`）。
- 运行`npm install @sillytavern-vue-frontend/project-helper --registry https://npm.chlamydomonos.xyz/`，安装SillyTavern Vue前端库。
- 在`main.ts`中，移除`.mount('#app')`或类似代码。从`@sillytavern-vue-frontend/project-helper`中导入`ProjectHelper`对象，使用`ProjectHelper.acceptVueApp`函数来把Vue APP暴露给插件。
- 用Vite构建项目得到css文件和js文件。在角色卡对应的世界书中创建`vue-css`和`vue-js`两个条目，把文件的内容复制到其中。
- 刷新窗口后，角色输出的每条消息都会被替换为一个Vue前端实例。

具体的示例参见[示例项目](https://github.com/Chlamydomonos/sillytavern-vue-frontend-example)

## 接口

声明：接口还处于极早期阶段，将在后续设计更多接口。

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
}
```

目前的接口通过[Vue依赖注入](https://cn.vuejs.org/guide/components/provide-inject)提供。因此在非Vue环境下使用接口会出现问题。

### Wrapper API

Wrapper API是正在开发中的把SillyTavern API简化后的接口。目前其类型声明如下：

```ts
interface WrapperAPI {
    renderMessage(message: string): string;
}
```

目前只提供了`renderMessage`这一接口，可以调用SillyTavern的渲染系统把传给前端的原始消息渲染成HTML。

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
| `messageUpdated` | `(newMessage: string) => void` | 在前端对应的消息更新后触发。（更新原因可能为流式传输或者编辑消息） |
