import { BlockedUser, User } from "@models";
import { FilesService } from "../../files/files.service";

export const changePhotoPathFor = <T extends User>(user : T) : T => {
  if(user.photos) {
    user.photos = user.photos.map(ph => new FilesService().getNameForUserImg(ph))
  }
  return user;
};