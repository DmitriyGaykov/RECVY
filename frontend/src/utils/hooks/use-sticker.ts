import {useEffect, useState} from "react";
import defaultSticker from './../../assets/images/default-sticker.jpg'
import axios from "axios";

export const useSticker = (stickerPath: string) => {
  const [sticker, setSticker] = useState<string>('');

  useEffect(() => {
    const path : string = 'http://localhost:3001' + stickerPath;
    axios
      .get(path)
      .then(() => setSticker(path))
      .catch(() => setSticker(defaultSticker))
  }, []);

  return [sticker];
}