import { defineStore } from 'pinia';
import { ref } from 'vue';

export type VarWorldInfo = {
    predicate: (vars: any) => boolean;
    name: string;
};

export type VueBook = {
    content: string;
    depth: number;
};

export const useWorldInfoStore = defineStore('world-info', () => {
    const worldInfo = ref<VarWorldInfo[]>([]);
    const vueBook = ref<Record<string, VueBook>>({});
    return { worldInfo, vueBook };
});
