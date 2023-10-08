import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionManagerService } from './exception-manager.service';

describe('ExceptionManagerService', () => {
  let service: ExceptionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionManagerService],
    }).compile();

    service = module.get<ExceptionManagerService>(ExceptionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be object with error', () => {
    const error = 'Произошла ошибка: name:name1&age:age2';
    const fieldErrors = service.generateErrorFromDbTextError(error);

    expect(fieldErrors).toBeDefined();
    expect(fieldErrors.name).toEqual('name1');
    expect(fieldErrors.age).toEqual('age2');
  })
});
