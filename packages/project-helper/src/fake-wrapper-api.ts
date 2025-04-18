import { WrapperApi } from './wrapper-api';

export const FakeWrapperAPI: WrapperApi = {
    renderMessage(content) {
        return `<p>${content}</p>`;
    },
    messageVars() {
        return {};
    },
    async saveChat() {},
    getVueBook() {
        return {};
    },
    getUserName() {
        return 'User';
    },
    getUserAvatarPath() {
        return '/assets/user-avatar.png';
    },
    getCharAvatarPath() {
        return '/assets/char-avatar.png';
    },
    async countTokens(str, padding) {
        return 0;
    },
};
