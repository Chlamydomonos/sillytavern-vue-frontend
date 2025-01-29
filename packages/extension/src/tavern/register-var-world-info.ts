import { useWorldInfoStore } from '@/stores/world-info';

export const registerVarWorldInfo = <T extends Record<string, any>>(predicate: (vars: T) => boolean, name: string) => {
    const store = useWorldInfoStore();
    store.worldInfo?.push({ predicate, name });
};
