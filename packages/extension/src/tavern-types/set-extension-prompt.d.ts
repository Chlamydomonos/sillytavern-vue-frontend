type SetExtensionPrompt = (
    key: string,
    value: string,
    position: import('./enums').ExtensionPromptPosition,
    depth: number,
    scan?: boolean,
    role?: import('./enums').ExtensionPromptRole,
    filter?: () => boolean
) => void;
