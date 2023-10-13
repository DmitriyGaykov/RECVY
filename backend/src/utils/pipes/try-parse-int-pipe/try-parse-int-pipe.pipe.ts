import { ArgumentMetadata, Injectable, ParseIntPipe } from "@nestjs/common";

@Injectable()
export class TryParseIntPipe extends ParseIntPipe {
  constructor() {
    super();
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch {
      return value;
    }
  }
}
