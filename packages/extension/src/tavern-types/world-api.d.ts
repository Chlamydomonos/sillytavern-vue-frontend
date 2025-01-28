declare module 'sillytavern-world-api' {
    export function loadWorldInfo(
        name: string
    ): Promise<{ entries: Record<number, TavernV2DataWorldInfoEntry> } | null>;

    export function createWorldInfoEntry(
        name: string,
        data: {
            entries: Record<number, TavernV2DataWorldInfoEntry>;
        }
    ): TavernV2DataWorldInfoEntry | undefined;

    export function saveWorldInfo(
        name: string,
        data: {
            entries: Record<number, TavernV2DataWorldInfoEntry>;
        },
        immediately?: boolean
    ): Promise<void>;
}
