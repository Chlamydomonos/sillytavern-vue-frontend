type TavernV2DataWorldInfoEntry = {
    keys: string[];
    secondary_keys?: string[];
    comment: string;
    content: string;
    constant: boolean;
    selective: boolean;
    insertion_order: number;
    enabled: boolean;
    position: import('./enums').EntryPosition;
    role?: import('./enums').ExtensionPromptRole;
    depth?: number;
    extensions: TavernV2DataWorldInfoEntryExtensionInfos;
    id: number;
};

type TavernV2DataWorldInfoEntryExtensionInfos = {
    position: number;
    exclude_recursion: boolean;
    probability: number;
    useProbability: boolean;
    depth: number;
    selectiveLogic: number;
    group: string;
    group_override: boolean;
    group_weight: number;
    prevent_recursion: boolean;
    delay_until_recursion: boolean;
    scan_depth: number;
    match_whole_words: boolean;
    use_group_scoring: boolean;
    case_sensitive: boolean;
    automation_id: string;
    role: number;
    vectorized: boolean;
    display_index: number;
};

type TavernV2WorldInfoBook = {
    name: string;
    entries: TavernV2DataWorldInfoEntry[];
};

type TavernV2CharData = {
    name: string;
    description: string;
    character_version: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creator_notes: string;
    tags: string[];
    system_prompt: string;
    post_history_instructions: string;
    creator: string;
    alternate_greetings: string[];
    character_book: TavernV2WorldInfoBook;
    extensions: TavernV2CharDataExtensionInfos;
};

type TavernV2CharDataExtensionInfos = {
    talkativeness: number;
    fav: boolean;
    world: string;
    depth_prompt: {
        depth: number;
        prompt: string;
        role: 'system' | 'user' | 'assistant';
    };
    regex_scripts: TavernRegexScriptData[];
    pygmalion_id?: string;
    github_repo?: string;
    source_url?: string;
    chub?: { full_path: string };
    risuai?: { source: string[] };
    sd_character_prompt?: { positive: string; negative: string };
};

type TavernRegexScriptData = {
    id: string;
    scriptName: string;
    findRegex: string;
    replaceString: string;
    trimStrings: string[];
    placement: number[];
    disabled: boolean;
    markdownOnly: boolean;
    promptOnly: boolean;
    runOnEdit: boolean;
    substituteRegex: number;
    minDepth: number;
    maxDepth: number;
};

type TavernV1CharData = {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creatorcomment: string;
    tags: string[];
    talkativeness: number;
    fav: boolean | string;
    create_date: string;
    data: TavernV2CharData;
    chat?: string;
    avatar?: string;
    json_data?: string;
};
