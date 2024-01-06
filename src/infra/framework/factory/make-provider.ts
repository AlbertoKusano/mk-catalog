import { Provider, Type } from '@nestjs/common';
import { Abstract } from '@nestjs/common/interfaces/abstract.interface';

export type ProvideType = Abstract<any> | Type<any> | string | symbol;

export class MakeProvider {
  static make<T = any>(provide: ProvideType, provider: T | Type<T>): Provider {
    return MakeProvider.isClass(provider)
      ? this.makeAClassProvider(provide, provider)
      : this.makeAValueProvider(provide, provider);
  }
  private static isClass<T = any>(provider: T | Type<T>): provider is Type<T> {
    return (<Type<T>>provider).constructor !== undefined;
  }

  private static makeAClassProvider<T>(
    provide: Abstract<any> | Type<any> | string | symbol,
    provider: Type<T>,
  ) {
    return { provide, useClass: provider };
  }

  private static makeAValueProvider<T>(
    provide: Abstract<any> | Type<any> | string | symbol,
    provider: T,
  ) {
    return { provide, useValue: provider };
  }
}
