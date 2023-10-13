import { Controller, Get } from '@nestjs/common';
import { Sticker } from '@models';
import { StickersService } from './stickers.service';
import { AuthAs } from '@decorators';
import { Roles } from '../users/roles';

@Controller('stickers')
@AuthAs(Roles.user)
export class StickersController {
  constructor(private readonly stickersService: StickersService) {}
  @Get()
  async getStickers(): Promise<Sticker[]> {
    return await this.stickersService.getStickers();
  }
}
