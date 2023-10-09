import { Test, TestingModule } from '@nestjs/testing';
import { PhotosDbService } from "./photos-db.service";
import { PhotosService } from "./photos.service";
import { DbModule } from "../db/db.module";
import { ExceptionManagerModule } from "../exception-manager/exception-manager.module";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

describe('PhotosService', () => {
  let service: PhotosDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule.register('app-user'), ExceptionManagerModule],
      providers: [PhotosDbService, ExceptionManagerService],
    }).compile();

    service = module.get<PhotosDbService>(PhotosDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const photo = 'hello-mit.jpg';
  it('should be returned id', async () => {
    try {
      const id: string = '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22';
      await service.addPhotoToUser(id, photo);
      expect(true).toBe(true);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be exception', async () => {
    const img = 'hello-mit.test';
    try {
      const id: string = '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22';
      await service.addPhotoToUser(id, img);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.photo).toBeDefined();
    }
  })

  it('should be deleted', async () => {
    try {
      const id: string = '81L086RIcklaeZJUciC6zJDUS1q565x1N28V799gazpCTmcD22';
      await service.deletePhotoFromUser(id, photo);
      expect(true).toBe(true);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  })
});
