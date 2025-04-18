import { Events } from './events';

type ListenerDict = {
    [key in keyof Events]?: Set<Events[key]>;
};

type ArgTypes<T extends keyof Events> = Events[T] extends (...args: infer U) => any ? U : never;

type AsyncAble<T extends (...args: any) => void> = T extends (...args: infer U) => void
    ? ((...args: U) => void) | ((...args: U) => Promise<void>)
    : never;

export class FrontendEventEmitter {
    private listeners: ListenerDict = {};

    on<T extends keyof Events>(event: T, listener: AsyncAble<Events[T]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set() as any;
        }
        this.listeners[event]!.add(listener);
    }

    off<T extends keyof Events>(event: T, listener: AsyncAble<Events[T]>) {
        if (this.listeners[event]) {
            if (this.listeners[event].has(listener)) {
                this.listeners[event].delete(listener);
            }
        }
    }

    async emit<T extends keyof Events>(event: T, ...args: ArgTypes<T>) {
        if (this.listeners[event]) {
            await Promise.all(
                this.listeners[event]
                    .values()
                    .map((listener) => (listener as (...args: any[]) => void | Promise<void>)(...args))
            );
        }
    }
}

export { MessageUpdateReason } from './events';
