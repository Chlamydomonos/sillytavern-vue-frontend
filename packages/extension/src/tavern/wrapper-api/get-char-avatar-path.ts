import { getContext } from 'sillytavern-extension-api';

const charsPath = '/characters/';

export const getCharAvatarPath = () => {
    const context = getContext();
    const charId = context.characterId;
    // const thumbnailPath = getThumbnailUrl('avatar', characters[this_chid].avatar);
    const avatar = context.characters[charId].avatar;
    if (!avatar) {
        return '/img/ai4.png';
    }
    const thumbnailPath = context.getThumbnailUrl('avatar', avatar);
    const targetAvatarImg = thumbnailPath.substring(thumbnailPath.lastIndexOf('=') + 1);
    return charsPath + targetAvatarImg;
};
