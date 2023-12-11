import { useEffect, useState } from "react";
import defaultAvatar from "./../../assets/images/default-photo.jpg";
import axios from "axios";
import { SERVER_URL } from "../../vite-env.d";

export const usePhoto = (propsPhoto: string, isDynamic?: boolean = false) => {
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    const path = SERVER_URL + propsPhoto;
    axios
      .get(path)
      .then(() => setPhoto(path))
      .catch(() => setPhoto(defaultAvatar));
  }, [isDynamic ? propsPhoto : undefined]);

  return photo;
};
