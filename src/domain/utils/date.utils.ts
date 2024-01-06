import { zonedTimeToUtc } from 'date-fns-tz';

import { isNationalHoliday } from './holiday.utils';

export abstract class DateUtils {
  static addBusinessDays(date: Date, days: number): Date {
    let daysAdded = 0;
    let output = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    while (daysAdded < days) {
      output = this.addDays(output, 1);
      if (
        output.getDay() != 0 &&
        output.getDay() != 6 &&
        !isNationalHoliday(output)
      ) {
        daysAdded++;
      }
    }
    return output;
  }
  static addDays(date: Date, days: number) {
    const result = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    result.setDate(result.getDate() + days);
    return result;
  }
  static addMonth(date: Date, months: number) {
    const result = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    result.setMonth(result.getMonth() + months);
    return result;
  }
  static dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  static generateBrazilTimezoneDate(
    date: string,
    timeType?: 'end' | 'start',
  ): Date {
    const time = timeType === 'start' ? 'T00:00:00.000' : 'T23:59:59.000';
    const splittedDate = date.split('T')[0];
    return zonedTimeToUtc(splittedDate + time, 'America/Sao_Paulo');
  }
}
