import { registerDecorator, ValidationOptions } from "class-validator";
import { MessageType } from "@models";

export const IsMessageType = (validationOptions?: ValidationOptions) : PropertyDecorator => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isMessageType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) : boolean | Promise<boolean> {
          return typeof value === 'string' && (value === MessageType.TEXT || value === MessageType.STICKER || value === MessageType.VOICE);
        }
      }
    })
  }
}
