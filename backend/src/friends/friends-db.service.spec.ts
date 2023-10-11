import { Test, TestingModule } from '@nestjs/testing';
import { FriendsDbService } from './friends-db.service';
import { DbModule } from "../db/db.module";
import { ExceptionManagerModule } from "../exception-manager/exception-manager.module";
import { SubscribersService } from "../subscribers/subscribers.service";
import { SubscribersDbService } from "../subscribers/subscribers-db.service";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";

describe('FriendsDbService', () => {
  let serviceF: FriendsDbService;
  let serviceS: SubscribersDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExceptionManagerModule, DbModule.register('app-user')],
      providers: [FriendsDbService, ExceptionManagerService],
    }).compile();

    serviceF = module.get<FriendsDbService>(FriendsDbService);

    const module2: TestingModule = await Test.createTestingModule({
      imports: [ExceptionManagerModule, DbModule.register('app-user')],
      providers: [SubscribersService, SubscribersDbService, ExceptionManagerService],
    }).compile();

    serviceS = module2.get<SubscribersDbService>(SubscribersDbService);
  });

  it('should be defined', () => {
    expect(serviceS).toBeDefined();
    expect(serviceF).toBeDefined();
  });

  const id1: string = 'FcE82KBb2M5ra9oEV376939239j3czdv9237dTAZXt54EqS8VA'
  const id2: string = '52M0bHg6TE3eZp3XAIYR8dOPPqDTh0DFjg63JI7u8mZx98FJDN';

  it('should be friend', async () => {
    try {
      await serviceS.subscribe(id1, id2);
      expect(true).toBe(true);

      await serviceF.addFriend(id2, id1);
      expect(true).toBe(true);

      const friends = await serviceF.getFriendsOf(id1);
      expect(friends).toBeDefined();
      expect(friends.length).toBeGreaterThan(0);
      expect(friends.map(el => el.id).includes(id2)).toBe(true);

      let subs = await serviceS.getSubscribersOf(id2);
      expect(subs).toBeDefined();
      expect(subs.length).toBeGreaterThan(0);
      expect(subs.map(el => el.id).includes(id1)).toBe(false);

      await serviceF.deleteFromFriends(id1, id2);
      expect(true).toBe(true);
      subs = await serviceS.getSubscribersOf(id1);
      expect(subs).toBeDefined();
      expect(subs.length).toBeGreaterThan(0);
      expect(subs.map(el => el.id).includes(id2)).toBe(true);

      await serviceS.describe(id1, id2);
      expect(true).toBe(true);
    } catch (e) {
      expect(e).toBeUndefined()
    }
  });
});
