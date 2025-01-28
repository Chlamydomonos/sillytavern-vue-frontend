import { Events } from './events';

type ListenerDict = {
    [key in keyof Events]?: Set<Events[key]>;
};

type ArgTypes<T extends keyof Events> = Events[T] extends (...args: infer U) => any ? U : never;

export class FrontendEventEmitter {
    private listeners: ListenerDict = {};

    on<T extends keyof Events>(event: T, listener: Events[T]) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set() as any;
        }
        this.listeners[event]!.add(listener);
    }

    off<T extends keyof Events>(event: T, listener: Events[T]) {
        if (this.listeners[event]) {
            if (this.listeners[event].has(listener)) {
                this.listeners[event].delete(listener);
            }
        }
    }

    emit<T extends keyof Events>(event: T, ...args: ArgTypes<T>) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => (listener as (...args: any[]) => void)(...args));
        }
    }
}

export { MessageUpdateReason } from './events';
