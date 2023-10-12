import { Injectable } from '@nestjs/common';
import { config } from "dotenv";

@Injectable()
export class ConfigService {
  constructor() {
    config();
  }

  get(key: string): string {
    return process.env[key];
  }
}
