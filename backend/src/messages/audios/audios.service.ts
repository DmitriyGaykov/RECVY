import {HttpException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {SaveVoiceDto} from "./dto/save-voice.dto";
import {join} from "path";
import {FilesService} from "../../files/files.service";

@Injectable()
export class AudiosService {
  private static readonly PATH = join(__dirname, '..', '..', '..', 'voices');

  constructor(
    private readonly filesService: FilesService
  ) {
  }

  async getVoiceMessage(messageid: string): Promise<Buffer> {
    try {
      const fileName = this.generateVoiceMessageName(messageid);
      const path = join(AudiosService.PATH, fileName);

      if (!(await this.filesService.isFileExist(path)))
        throw new NotFoundException();

      return await this.filesService.getFile(path)
    } catch (e: unknown) {
      throw e instanceof HttpException ? e : new InternalServerErrorException();
    }
  }

  async saveVoice({audio}: SaveVoiceDto, messageid: string): Promise<void> {
    try {
      const file = join(AudiosService.PATH, this.generateVoiceMessageName(messageid));
      return await this.filesService.saveFile(file, audio.buffer);
    } catch (e: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async deleteVoice(messageid: string): Promise<void> {
    const file = join(AudiosService.PATH, this.generateVoiceMessageName(messageid));
    return this.filesService.deleteFile(file);
  }

  private generateVoiceMessageName(messageid: string): string {
    return `${messageid.substring(0, 250)}.mp3`;
  }
}
