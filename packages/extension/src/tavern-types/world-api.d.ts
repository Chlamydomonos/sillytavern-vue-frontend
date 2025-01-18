declare module 'sillytavern-world-api' {
    export function loadWorldInfo(
        name: string
    ): Promise<{ entries: Record<number, TavernV2DataWorldInfoEntry> } | null>;
}
