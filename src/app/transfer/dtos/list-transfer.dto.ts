import { CheckIn } from '@domain/entities/check-in.entity';
import {
  ListFilter,
  ListTransferOutput,
} from '@domain/use-cases/transfer/list-transfer.use-case';
import { Transform } from 'class-transformer';
import { IsDate, IsNumberString, IsObject, IsOptional } from 'class-validator';

import { OrderByValidator } from '../../_shared/validators/order-by.validator';
import {
  EndDateValidator,
  StartDateValidator,
} from '../../_shared/validators/start-and-end-date.validator';

export class ListFilterDto implements ListFilter {
  @IsDate()
  @IsOptional()
  @Transform(EndDateValidator)
  endDate?: Date;
  @IsDate()
  @Transform(StartDateValidator)
  initialDate: Date;
  @IsNumberString()
  @IsOptional()
  limit?: number;
  @IsOptional()
  @IsObject()
  @Transform(OrderByValidator)
  orderBy?: {
    [key in keyof CheckIn]: 'ASC' | 'DESC';
  };
  @IsNumberString()
  @IsOptional()
  page?: number;
}

export class ListTransferOutputDto extends ListTransferOutput {}
