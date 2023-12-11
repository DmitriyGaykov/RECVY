import {Body, Controller, Get, Header, Post, Query, Res, UsePipes} from '@nestjs/common';
import {AuthAs} from "@decorators";
import {Roles} from "../../users/roles";
import {SaveVoiceDto} from "./dto/save-voice.dto";
import {AppValidationPipe} from "@pipes";
import {AudiosService} from "./audios.service";
import {FormDataRequest} from "nestjs-form-data";
import {IsVoiceMessageExistGuard} from "@guards";

@Controller('audios')
@AuthAs(Roles.user, [IsVoiceMessageExistGuard])
export class AudiosController {
  constructor(
    private readonly audiosService: AudiosService
  ) {}
  @Get()
  async getVoiceMessage(@Query('messageid') messageid : string): Promise<Buffer>   {
    return await this.audiosService.getVoiceMessage(messageid);
  }
  @Post()
  @UsePipes(AppValidationPipe)
  @FormDataRequest()
  async saveVoice(@Body() dto : SaveVoiceDto, @Query('messageid') messageid : string) : Promise<void> {
    return await this.audiosService.saveVoice(dto, messageid);
  }
}
