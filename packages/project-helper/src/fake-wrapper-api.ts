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
};
