import { inject, ref } from 'vue';
import { FakeEventEmitter } from './fake-event-emitter';

export const useMessage = () => {
    const initialMessage = inject('initialMessage', '');
    const eventEmitter = inject('frontendEventEmitter', FakeEventEmitter);
    const message = ref(initialMessage);

    eventEmitter.on('messageUpdated', (newMessage) => {
        message.value = newMessage;
    });

    return message;
};
