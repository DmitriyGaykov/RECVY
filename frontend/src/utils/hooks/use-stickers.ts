import {useDeleteStickerMutation, useGetStickersQuery, useLazyGetStickersQuery} from "../../store";
import {useCallback, useEffect, useState} from "react";
import {Sticker} from "../../models";
import {usePages} from "./use-pages.ts";

export const useStickers = () => {
  const [getStickers , { data, isLoading }] = useLazyGetStickersQuery();
  const [deleteStickerMutation] = useDeleteStickerMutation();
  const [stickers, setStickers] = useState<Sticker[]>([])
  const { page, getYet, setDefault } = usePages();

  const deleteSticker = useCallback(async(stickerid: string) => {
    const resp = await deleteStickerMutation(stickerid);

    if('error' in resp) {
      return alert('Ошибка при удалении!');
    }

    setStickers(stickers.filter(el => el.stickerid !== stickerid));
  }, [setStickers, stickers])

  useEffect(() => {
    getStickers(page);
  }, [page]);

  useEffect(() => {
    if(!data) return;
    setStickers([...stickers, ...data]);
    if(data.length)
      getYet();
  }, [data]);

  useEffect(() => {
    return () => {
      setDefault();
      setStickers([]);
    }
  }, []);

  return {stickers, isLoading, getStickers, deleteSticker};
}