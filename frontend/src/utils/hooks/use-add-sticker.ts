import {useAddStickerMutation} from "../../store";
import {useLoadPhoto} from "./use-load-photo.ts";

export const useAddSticker = (onAddSticker?: () => void) => {
  const [addStickerMutation] = useAddStickerMutation();

  return useLoadPhoto(files => {
    let fd: FormData;
    const length = files.length;
    const promises: Promise<void>[] = []

    for (let i = 0; i < length; i++) {
      fd = new FormData();
      fd.append('sticker', files[i]);

      promises.push(addStickerMutation(fd)
        .then(res => {
          console.log(res);
        }));
    }

    Promise.all(promises).then(onAddSticker);
  });
}