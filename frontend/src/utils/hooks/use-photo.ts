import {useEffect, useState} from "react";
import defaultAvatar from "./../../assets/images/default-photo.jpg";
import axios from 'axios';

export const usePhoto = (propsPhoto: string) => {
  const [photo, setPhoto] = useState<string>()

  useEffect(() => {
    const path = 'http://localhost:3001' + propsPhoto;
    axios.get(path)
      .then(() => setPhoto(path))
      .catch(() => setPhoto(defaultAvatar))
  }, [])

  return photo;
}