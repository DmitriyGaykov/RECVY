import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersDbService } from './subscribers-db.service';
import { DbModule } from "../db/db.module";
import { ExceptionManagerModule } from "../exception-manager/exception-manager.module";
import { SubscribersService } from "./subscribers.service";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

describe('SubscribersDbService', () => {
  let service: SubscribersDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule.register('app-user'), ExceptionManagerModule],
      providers: [SubscribersService, SubscribersDbService, ExceptionManagerService],
    }).compile();

    service = module.get<SubscribersDbService>(SubscribersDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const idUser1: string = '2qTCdhN8W1uy5e472oO7lh3227sc4N4kJsqke96W28giJ5v46E';
  const idUser2: string = '8wDWTI85iJCP1dXw0qP7X331C3s9z1eV4K21Kh430A33904m86';

  it('should be subscribed', async () => {
    try {
      await service.subscribe(idUser1, idUser2);
      expect(true).toBe(true);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be subscriber of' , async () => {
    try {
      const subs = await service.getSubscribersOf(idUser2);
      expect(subs).toBeDefined();
      expect(subs.length).toBeGreaterThan(0);
      expect(subs.map(el => el.id).includes(idUser1)).toBe(true);
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  });

  it('should be described', async () => {
    try {
      await service.describe(idUser1, idUser2);
      expect(true).toBe(true);

      const subs = await service.getSubscribersOf(idUser2);
      expect(subs).toBeDefined();
      expect(subs.map(el => el.id).includes(idUser1)).toBe(false);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  })

  it('should be exceptions', async () => {
    try {
      await service.subscribe('1', '2'); // no users with id 1 and 2
      expect(true).toBe(false);
    } catch (e : any) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      await service.subscribe(idUser1, idUser1);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      await service.subscribe(idUser1, idUser2);
      await service.subscribe(idUser1, idUser2);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      await service.describe(idUser2, idUser1);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      await service.describe('1', '2');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      await service.describe(idUser1, idUser1);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.error).toBeDefined();
    }

    try {
      const users = await service.getSubscribersOf(idUser2, 1, -2);
      expect(users).toBeUndefined();
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.take).toBeDefined();
    }
  })
});
