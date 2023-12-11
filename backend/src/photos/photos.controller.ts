import { Controller, Delete, Post, Query } from "@nestjs/common";
import { AuthAs, InjectUser, UploadFile } from "@decorators";
import { Roles } from "../users/roles";
import { User } from "@models";
import { FormDataRequest, MemoryStoredFile } from "nestjs-form-data";
import { PhotosService } from "./photos.service";

@Controller('users/photos')
@AuthAs(Roles.user)
export class PhotosController {
  constructor(
    private readonly photosService : PhotosService
  ) {}
  @Post()
  @FormDataRequest()
  async addPhoto(@InjectUser() user : User, @UploadFile('photo') photo : MemoryStoredFile) : Promise<string> {
    return await this.photosService.addPhoto(user?.id, photo);
  }

  @Delete()
  @FormDataRequest()
  async deletePhoto(@InjectUser() user : User, @Query('photoName') photoName : string) : Promise<void> {
    return await this.photosService.deletePhoto(user, photoName);
  }
}
