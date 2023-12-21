import {BadRequestException, Injectable} from "@nestjs/common";
import {MemoryStoredFile} from "nestjs-form-data";
import {FilesService} from "../files/files.service";
import {PhotosDbService} from "./photos-db.service";
import {generateString} from "../utils/scripts";
import {User} from "@models";
import {ExceptionManagerService} from "../exception-manager/exception-manager.service";

@Injectable()
export class PhotosService {
  constructor(
    private readonly filesService: FilesService,
    private readonly photosDbService: PhotosDbService,
    private readonly exceptionManagerService: ExceptionManagerService
  ) {
  }

  async addPhoto(userId: string, photo: MemoryStoredFile, photoName?: string): Promise<string> {
    try {
      try {
        const newFileName = photoName || await generateString(250, true);
        this.filesService.rename(photo, newFileName);
      } catch {
        throw this.exceptionManagerService.generateFieldError('error', 'Неверный формат фото')
      }

      await this.photosDbService.addPhotoToUser(userId, photo.originalName);
      await this.filesService.saveUserFile(photo);

      return this.filesService.getNameForUserImg(photo.originalName);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }

  async deletePhoto(user: User, photo: string): Promise<void> {
    try {
      console.log(photo)
      if (!user.photos.includes(this.filesService.getNameForUserImg(photo)))
        throw this.exceptionManagerService.generateFieldError('error', 'У вас нет такого фото!');

      await this.photosDbService.deletePhotoFromUser(user.id, photo);
      await this.filesService.deleteUserFile(photo);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }
}
