import { TransformFnParams } from 'class-transformer';

import { DateUtils } from '../../../domain/utils/date.utils';

export function StartDateValidator(params: TransformFnParams) {
  const { value } = params;
  if (value) {
    const date = DateUtils.generateBrazilTimezoneDate(value, 'start');
    return date;
  }
  return value;
}

export function EndDateValidator(params: TransformFnParams) {
  const { value } = params;
  if (value) {
    const date = DateUtils.generateBrazilTimezoneDate(value, 'end');
    return date;
  }
  return value;
}
