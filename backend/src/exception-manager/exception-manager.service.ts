import { Injectable } from '@nestjs/common';
import { IFieldError } from "./interfaces/field-error.interface";

@Injectable()
export class ExceptionManagerService {
  generateErrorFromDbTextError(text: string) : IFieldError {
    const etext = text.replace('Произошла ошибка: ', '');
    const setOfErrors = etext.split('&')

    const fieldErrors: IFieldError = {};

    setOfErrors.forEach(error => {
      const [key, value] = error.split(':');
      fieldErrors[key] = value;
    })

    return fieldErrors;
  }

  generateNotAuthError() : IFieldError {
    return {
      error: 'Пользователь не авторизован'
    }
  }

  generateFieldError(key: string, value: string) : IFieldError {
    return {
      [key]: value
    }
  }

  static generateException(key : string, value : string) : string {
    return `${key}:${value}`
  }

  static unionExceptions(errors : string[]) : string {
    return errors.join('&');
  }
}
