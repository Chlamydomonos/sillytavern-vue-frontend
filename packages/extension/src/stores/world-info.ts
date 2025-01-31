import { defineStore } from 'pinia';
import { ref } from 'vue';

export type VarWorldInfo = {
    predicate: (vars: any) => boolean;
    name: string;
    entry?: (vars: any) => { content: string; depth: number };
};

export type VueBook = {
    content: string;
    depth: number;
};

export const useWorldInfoStore = defineStore('world-info', () => {
    const worldInfo = ref<VarWorldInfo[]>([]);
    const vueBook = ref<Record<string, VueBook>>({});
    const counter = ref(0);
    const nextId = () => {
        counter.value++;
        return counter.value;
    };
    return { worldInfo, vueBook, nextId };
});
