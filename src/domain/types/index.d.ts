export * from './transfer';
export * from './event-stream';

export type UniqueIdentifier = Buffer | string;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: Entity[P];
};

export type PaymentMethod = 'billet' | 'creditCard' | 'pix';
export type GatewayNames = 'mock' | 'pagar-me';
