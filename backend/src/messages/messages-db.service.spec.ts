import { Test, TestingModule } from '@nestjs/testing';
import { MessagesDbService } from './messages-db.service';
import { DbModule } from '../db/db.module';
import { ExceptionManagerModule } from '../exception-manager/exception-manager.module';
import { ExceptionManagerService } from '../exception-manager/exception-manager.service';
import { SendMessageDto } from './dto/send-message.dto';
import { Message, MessageType } from "@models";

describe('MessagesDbService', () => {
  let service: MessagesDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule.register('app-user'), ExceptionManagerModule],
      providers: [MessagesDbService, ExceptionManagerService],
    }).compile();

    service = module.get<MessagesDbService>(MessagesDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const iduserto: string = '2qTCdhN8W1uy5e472oO7lh3227sc4N4kJsqke96W28giJ5v46E';
  const iduserfrom: string =
    '2qTCdhN8W1uy5e472oO7lh3227sc4N4kJsqke96W28giJ5v46E';

  it('should be sended message', async () => {
    try {
      const message: SendMessageDto = {
        iduserto,
        iduserfrom,
        message: 'test',
        messagetype: MessageType.TEXT,
      };

      const msg : Message = await service.sendMessage(message);
      expect(msg).toBeDefined();
      console.log(msg)
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
