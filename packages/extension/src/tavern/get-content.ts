export const getContent = (chat: Chat[], mesId: number) => {
    let currentContent = '';
    const currentMes = chat[mesId];
    if (currentMes.swipe_id) {
        currentContent = currentMes.swipes[currentMes.swipe_id] ?? '...';
    } else {
        currentContent = chat[mesId].mes;
    }
    return currentContent;
};
