import { Sticker } from "@models";

export const changeSticker = (sticker : Sticker) : Sticker => {
  return {
    ...sticker,
    sticker: '/static/img/stickers/' + sticker.sticker
  }
}

export const getStickerPath = (sticker : string) : string => {
  return `/img/stickers/${sticker}`;
}