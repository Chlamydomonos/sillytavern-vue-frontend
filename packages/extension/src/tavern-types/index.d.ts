interface TavernContext {}

declare module 'sillytavern-extension-api' {
    export function getContext(): TavernContext;
}
