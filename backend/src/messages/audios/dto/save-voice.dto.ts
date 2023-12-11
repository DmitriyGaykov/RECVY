import {MemoryStoredFile} from "nestjs-form-data";

export class SaveVoiceDto {
  audio: MemoryStoredFile;
}