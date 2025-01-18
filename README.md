# SillyTavern的Vue前端插件

这个插件可以用Vue前端替换SillyTavern自带的消息渲染界面。就是这样。还处于早期阶段，可能不太好用。

## 使用方法

提前声明：本插件还处于早期阶段，使用起来非常不方便，暂时不建议使用。

- 创建一个以Vite为构建工具的Vue项目。
- 在该项目中使用本插件创建的`window.acceptVueApp`函数把Vue APP暴露给插件。
  该函数的声明如下：
  ```ts
  function acceptVueApp(app: () => import('vue').App): void;
  ```
  在Typescript项目中可以通过创建一个`.d.ts`文件来在`Window`接口下声明这个函数。
- 用Vite构建项目得到css文件和js文件。在角色卡对应的世界书中创建`vue-css`和`vue-js`两个条目，把文件的内容复制到其中。
- 刷新窗口后，角色输出的每条消息都会被替换为一个Vue前端实例。

## 接口

声明：接口还处于极早期阶段，将在后续设计更多接口。

目前的接口通过[Vue依赖注入](https://cn.vuejs.org/guide/components/provide-inject)提供。对于Typescript项目还不具有类型，将会在后续更新中解决这一问题。

简单来说，在Vue应用中可以通过`inject('注入名', 默认值)`来获得由本插件注入的内容。默认值不是重要的选项，填写任何和接口类型一致的值即可。

以下是接口的列表：

| 注入名 | 接口描述 | 类型 |
| - | - | - |
| `initialMessage` | 这个前端创建那一刻对应的消息（如果在历史消息中即为完整的一条消息，流式传输中为空字符串） | `string` |
| `frontendEventEmitter` | 事件系统 | [`FrontendEventEmitter`](#事件系统) |
| `wrapperApi` | Wrapper API | [`WrapperAPI`](#wrapper-api) |
| `tavernContext` | 原始的SillyTavern上下文 | `any`（具体类型过于复杂，查看[https://github.com/SillyTavern/SillyTavern/blob/release/public/scripts/st-context.js](https://github.com/SillyTavern/SillyTavern/blob/release/public/scripts/st-context.js)） |

### Wrapper API

Wrapper API是正在开发中的把SillyTavern API简化后的接口。目前其类型声明如下：

```ts
interface WrapperAPI {
    renderMessage(message: string): string;
}
```

目前只提供了`renderMessage`这一接口，可以调用酒馆的渲染系统把传给前端的原始消息渲染成HTML。

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
