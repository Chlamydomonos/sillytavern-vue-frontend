type ChatBase = {
    is_system: boolean;
    is_user: boolean;
    mes: string;
    name: string;
    send_date: string;
    variables: Record<string, any>;
    extra: Record<string, any>;
};

type ChatSwipes = {
    swipe_id: number;
    swipes: string[];
    swipe_info: {
        send_date: string;
        extra: Record<string, any>;
    }[];
};

type OtherAsUndefined<T, U> = T & {
    [key in keyof Omit<U, keyof T>]: undefined;
};

type Chat = OtherAsUndefined<ChatBase, ChatSwipes> | (ChatBase & ChatSwipes);
