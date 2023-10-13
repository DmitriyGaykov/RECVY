import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { StickersDbService } from "./stickers-db.service";
import { Sticker } from "@models";
import { changeSticker } from "../utils/scripts";

@Injectable()
export class StickersService {
  constructor(
    private readonly stickersDbService : StickersDbService
  ) {}

  async getStickers() : Promise<Sticker[]> {
    try {
      const stickers = await this.stickersDbService.getStickers();
      return stickers.map(el => changeSticker(el));
    } catch (e : unknown) {
      throw new InternalServerErrorException(e);
    }
  }
}
