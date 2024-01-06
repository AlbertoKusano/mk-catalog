import { TransformFnParams } from 'class-transformer';

export function OrderByValidator(params: TransformFnParams) {
  const { value } = params;
  if (value) {
    const orderBy: {
      [key: string]: 'ASC' | 'DESC';
    } = {};

    value?.split(',').forEach((order) => {
      const [field, direction] = order.split(':');
      orderBy[field] = direction.toUpperCase() as 'ASC' | 'DESC';
    });
    return orderBy;
  }
  return value;
}
