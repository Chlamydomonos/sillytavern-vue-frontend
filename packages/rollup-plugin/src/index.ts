export function plugin() {
    return {
        name: 'plugin-for-this-project',
        resolveId(source: string) {
            if (source == 'sillytavern-extension-api') {
                return { id: '../../../../../../../extensions.js', external: true };
            }
            if (source == 'sillytavern-world-api') {
                return { id: '../../../../../../../world-info.js', external: true };
            }
            return null;
        },
    };
}
