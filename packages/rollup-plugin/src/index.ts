export function plugin() {
    return {
        name: 'plugin-for-this-project',
        resolveId(source: string) {
            if (source == 'sillytavern-extension-api') {
                return { id: '../../../../../../../extensions.js', external: true };
            }
            return null;
        },
    };
}
