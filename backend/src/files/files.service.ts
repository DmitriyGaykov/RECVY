import { Injectable, Scope } from "@nestjs/common";
import * as fs from "fs";
import { MemoryStoredFile } from "nestjs-form-data";
import * as path from "path";

@Injectable({
  scope: Scope.REQUEST
})
export class FilesService {
  static readonly usersPath : string = path.resolve(__dirname, '../../public/img/users');
  static readonly stickersPath : string = path.resolve(__dirname, '../../public/img/stickers');

  async saveUserFile(file : MemoryStoredFile) : Promise<void> {
    return fs.promises.writeFile(path.resolve(FilesService.usersPath, file.originalName), file.buffer);
  }

  async saveStickerFile(file : MemoryStoredFile) : Promise<void> {
    return fs.promises.writeFile(path.resolve(FilesService.stickersPath, file.originalName), file.buffer);
  }

  rename(file : MemoryStoredFile, newName : string) : void {
    file.originalName = newName + '.' + this.getExt(file)
  }

  getExt(fileName : MemoryStoredFile) : string {
    return fileName['fileType'].ext;
  }

  async deleteUserFile(name : string) : Promise<void> {
    return fs.promises.unlink(path.resolve(FilesService.usersPath, name))
  }

  async deleteStickerFile(name: string) : Promise<void> {
    return fs.promises.unlink(path.resolve(FilesService.stickersPath, name));
  }

  getNameForUserImg(name : string) : string {
    return `/static/img/users/${name}`
  }
}
