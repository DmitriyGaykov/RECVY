import {Controller, Get, Query} from '@nestjs/common';
import { Sticker } from '@models';
import { StickersService } from './stickers.service';
import { AuthAs } from '@decorators';
import { Roles } from '../users/roles';
import {TryParseIntPipe} from "@pipes";

@Controller('stickers')
@AuthAs(Roles.user)
export class StickersController {
  constructor(private readonly stickersService: StickersService) {}
  @Get()
  async getStickers(@Query('page', TryParseIntPipe) page: number): Promise<Sticker[]> {
    return await this.stickersService.getStickers(page);
  }
}
