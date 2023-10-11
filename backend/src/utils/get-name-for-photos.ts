import { User } from "@models";
import { FilesService } from "../files/files.service";

export const changePhotoPathFor = (user : User) : User => {
  if(user.photos) {
    user.photos = user.photos.map(ph => new FilesService().getNameForUserImg(ph))
  }
  return user;
};