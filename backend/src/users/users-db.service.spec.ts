import { Test, TestingModule } from '@nestjs/testing';
import { UsersDbService } from './users-db.service';
import { DbModule } from "../db/db.module";
import { IFieldError } from "../exception-manager/interfaces/field-error.interface";
import { ExceptionManagerService } from "../exception-manager/exception-manager.service";
import { ExceptionManagerModule } from "../exception-manager/exception-manager.module";
import { IError } from "../exception-manager/interfaces/error.interface";

describe('UsersDbService', () => {
  let service: UsersDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule.register('app-user'), DbModule.register('visitor'), ExceptionManagerModule],
      providers: [UsersDbService, ExceptionManagerService],
    }).compile();

    service = module.get<UsersDbService>(UsersDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be returned id', async () => {
    try {
      const res = await service.addUser({
        firstname: 'Dimon',
        login: '123322226621',
        lastname: 'Gaykov',
        age: 12,
        password: '123123123'
      });

      expect(res).toBeDefined();
      expect(res).toHaveLength(50);
    } catch (e : unknown) {

    }
  })

  it('should be exception', async () => {
    try {
      const res = await service.addUser({
        firstname: 'D',
        login: '123',
        lastname: 'Gaykov',
        age: 1222,
        password: '123123123'
      });
    } catch (e : unknown) {
      expect(e).toBeDefined();

      const err = e as IFieldError;
      expect(err.firstname).toBeDefined();
      expect(err.login).toBeDefined();
      expect(err.lastname).toBeUndefined();
      expect(err.age).toBeDefined();
      expect(err.password).toBeUndefined();
    }
  })

  it('should be authorized', async () => {
    try {
      const id = await service.signIn({
        login: '123322226621',
        password: '123123123'
      })

      expect(id).toBeDefined();
      expect(id).toHaveLength(50);
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  })

  it('should be not authorized', async () => {
    try {
      const id = await service.signIn({
        login: '6621',
        password: '123123123'
      })
    } catch (e : unknown) {
      expect(e).toBeDefined();

      const err = e as IFieldError;
      expect(err.error).toBeDefined();
    }
  })

  it('should return a user with id', async () => {
    try {
      const id = 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJFS7SsC7B4Pf8zP7fI'
      const user = await service.getUserById(id)

      expect(user).toBeDefined();
      expect(user.id).toEqual(id);
      expect(user.firstname).toBeDefined();
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  })

  it('should be return error', async () => {
    try {
      const id = 'YLZXq6IP91I7A16Qc4wH5dweWJrwht4ZJ7SsC7B4Pf8zP7fI'
      await service.getUserById(id)
    } catch (e: any) {
      expect(e.id).toBeDefined();
    }
  })

  it('get users should be returned array', async () => {
    try {
      const users = await service.getUsers();
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toEqual(true);
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  })

  it('should be returned 2 users', async () => {
    try {
      const users = await service.getUsers(0, 2);
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toEqual(true);
      expect(users).toHaveLength(2);
    } catch (e : unknown) {
      expect(e).toBeUndefined()
    }
  })

  it('should be exception, if skip or take are negative', async () => {
    try {
      const users = await service.getUsers(-1, -2);
      expect(users).toBeUndefined();
    } catch (e : any) {
      expect(e).toBeDefined();
      expect(e.skip).toBeDefined();
      expect(e.take).toBeDefined();
    }
  })

  it('should change name on Vasiliy', async () => {
    try {
      const users = await service.getUsers();
      expect(users).toBeDefined();

      const { id, firstname, lastname } = users.at(0);
      expect(id).toBeDefined();

      const newName = 'Vasiliy';
      const user = await service.editUserInfo({id, firstname: newName});

      expect(
        user.firstname !== firstname &&
        user.lastname === lastname &&
        user.firstname === newName
      ).toEqual(true);
    } catch (e : unknown) {
      expect(e).toBeUndefined()
    }
  })

  it('should be exception in name', async () => {
    try {
      const users = await service.getUsers();
      expect(users).toBeDefined();

      const { id, firstname, lastname } = users.at(0);
      expect(id).toBeDefined();

      const newName = 'aaa';
      const user = await service.editUserInfo({ id, firstname: newName });

      expect(user).toBeUndefined();
    } catch (e: any) {
      expect(e).toBeDefined()
      expect(e.firstname).toBeDefined();
    }
  })

  it('should be returned array with users, that consist Dima', async () => {
    try {
      const searchtext = 'Dima';
      const users = await service.searchUsers(searchtext);

      expect(Array.isArray(users)).toEqual(true);
      expect(users.at(0).firstname === searchtext).toEqual(true)
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  })

  it('search user by lastname', async () => {
    try {
      const users = await service.getUsers();
      expect(users).toBeDefined();

      const { id, lastname } = users.at(-1);
      expect(id).toBeDefined();

      const fusers = await service.searchUsers(lastname);
      expect(fusers).toBeDefined();
      expect(fusers.filter(el => el.lastname === lastname && id === el.id).length > 0).toEqual(true);
    } catch (e : unknown) {
      expect(e).toBeUndefined();
    }
  })
});
