import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { StickersDbService } from "./stickers-db.service";
import { Sticker } from "@models";
import {changeSticker, getSkipAndTake} from "../utils/scripts";

@Injectable()
export class StickersService {
  constructor(
    private readonly stickersDbService : StickersDbService
  ) {}

  async getStickers(page: number) : Promise<Sticker[]> {
    try {
      const { skip, take } = getSkipAndTake(page, 15);
      const stickers = await this.stickersDbService.getStickers(skip, take);
      return stickers.map(el => changeSticker(el));
    } catch (e : unknown) {
      throw new InternalServerErrorException(e);
    }
  }
}
