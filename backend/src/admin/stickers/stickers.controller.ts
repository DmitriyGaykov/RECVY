import { Controller, Delete, Post, Query } from "@nestjs/common";
import { AuthAs, UploadFile } from "@decorators";
import { Roles } from '../../users/roles';
import { FormDataRequest, MemoryStoredFile } from "nestjs-form-data";
import { StickersService } from "./stickers.service";

@Controller('/admin/stickers')
@AuthAs(Roles.admin)
export class StickersController {
  constructor(
    private readonly stickersService : StickersService
  ) {}
  @Post()
  @FormDataRequest()
  async addSticker(@UploadFile('sticker') sticker : MemoryStoredFile) : Promise<void> {
    return await this.stickersService.addSticker(sticker);
  }

  @Delete()
  async deleteSticker(@Query('stickerid') stickerid : string) : Promise<void> {
    return await this.stickersService.deleteSticker(stickerid);
  }
}
