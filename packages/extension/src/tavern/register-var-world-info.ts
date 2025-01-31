import { useWorldInfoStore } from '@/stores/world-info';

export const registerVarWorldInfo = <T extends Record<string, any>>(
    predicate: (vars: T) => boolean,
    arg: string | ((vars: T) => { content: string; depth: number })
) => {
    const store = useWorldInfoStore();
    if (typeof arg == 'string') {
        store.worldInfo.push({ predicate, name: arg });
    } else {
        store.worldInfo.push({ predicate, name: `func#${store.nextId()}`, entry: arg });
    }
};
