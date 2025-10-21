import { inject, ref } from 'vue';
import { FakeEventEmitter } from './fake-event-emitter';

export const useFloor = () => {
    const initialFloor = inject('messageId', 0);
    const initialIsBottom = inject('isBottom', false);
    const eventEmitter = inject('frontendEventEmitter', FakeEventEmitter);
    const floor = ref(initialFloor);
    const isBottom = ref(initialIsBottom);
    eventEmitter.on('floorChanged', (f, i) => {
        floor.value = f;
        isBottom.value = i;
    });

    return { floor, isBottom };
};
