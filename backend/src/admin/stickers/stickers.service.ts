import { BadRequestException, Injectable } from "@nestjs/common";
import { StickersDbService } from "./stickers-db.service";
import { MemoryStoredFile } from "nestjs-form-data";
import { FilesService } from "../../files/files.service";
import { changeSticker, generateString } from "../../utils/scripts";
import { ExceptionManagerService } from "../../exception-manager/exception-manager.service";
import { Sticker } from "@models";

@Injectable()
export class StickersService {
  constructor(
    private readonly stickersDbService : StickersDbService,
    private readonly filesService : FilesService,
    private readonly exceptionManagerService : ExceptionManagerService
  ) {}
  async addSticker(sticker : MemoryStoredFile) : Promise<void> {
    try {
      if(!sticker) {
        throw {
          error: 'Файл не пригоден для сохранения'
        }
      }

      const newName = await generateString(90, true);
      this.filesService.rename(sticker, newName);

      await this.stickersDbService.addSticker(sticker.originalName);
      await this.filesService.saveStickerFile(sticker);
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async getStickerById(stickerId : string) : Promise<Sticker> {
    try {
      const sticker = await this.stickersDbService.getStickerById(stickerId);
      return sticker ? changeSticker(sticker) : undefined;
    } catch (e : unknown) {
      throw new BadRequestException(e);
    }
  }

  async deleteSticker(stickerId : string) : Promise<void> {
    try {
      const sticker = await this.stickersDbService.getStickerById(stickerId);
      if(!sticker) {
        throw this.exceptionManagerService.generateFieldError('error', 'Стикера с таким id не существует');
      }
      await this.stickersDbService.deleteSticker(stickerId);
      await this.filesService.deleteStickerFile(sticker.sticker);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }
  }
}
