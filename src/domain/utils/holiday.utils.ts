interface Holiday {
  date: Date;
  name: string;
  type: holidayType;
}

export type holidayType = 'municipal' | 'national' | 'optional' | 'state';

export const getHolidays = (date: Date): Holiday[] => {
  const refDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return holidaysForYear(refDate.getFullYear()).filter(
    (holiday) => holiday.date.getTime() == refDate.getTime(),
  );
};

export const isNationalHoliday = (date: Date): boolean => {
  const holidays = getHolidays(date).filter((h) => h.type == 'national');
  return holidays && holidays.length > 0;
};

export const holidaysForYear = (year: number): Array<Holiday> => {
  const easterSunday = calculateEasterSunday(year);
  return [
    {
      date: new Date(year, 0, 1),
      name: 'Confraternização mundial',
      type: 'national',
    },
    {
      date: calculateCarnival(easterSunday),
      name: 'Carnaval',
      type: 'optional',
    },
    {
      date: calculateGoodFriday(easterSunday),
      name: 'Sexta-feira Santa',
      type: 'national',
    },
    {
      date: easterSunday,
      name: 'Páscoa',
      type: 'national',
    },
    {
      date: new Date(year, 3, 21),
      name: 'Tiradentes',
      type: 'national',
    },
    {
      date: new Date(year, 4, 1),
      name: 'Dia do trabalho',
      type: 'national',
    },
    {
      date: calculateCorpusChristi(easterSunday),
      name: 'Corpus Christi',
      type: 'national',
    },
    {
      date: new Date(year, 8, 7),
      name: 'Independência do Brasil',
      type: 'national',
    },
    {
      date: new Date(year, 9, 12),
      name: 'Nossa Senhora Aparecida',
      type: 'national',
    },
    {
      date: new Date(year, 10, 2),
      name: 'Finados',
      type: 'national',
    },
    {
      date: new Date(year, 10, 15),
      name: 'Proclamação da República',
      type: 'national',
    },
    {
      date: new Date(year, 11, 25),
      name: 'Natal',
      type: 'national',
    },
  ];
};

function calculateEasterSunday(year: number): Date {
  const goldenNumber: number = year % 19;
  const century: number = Math.floor(year / 100);
  const yearInCentury: number = year % 100;
  const leapCycle: number = Math.floor(century / 4);
  const leapYearCorrection: number = century % 4;
  const epactParameter: number = Math.floor((century + 8) / 25);
  const solarCorrection: number = Math.floor(
    (century - epactParameter + 1) / 3,
  );
  const lunarParameter: number =
    (19 * goldenNumber + century - leapCycle - solarCorrection + 15) % 30;
  const additionalLunarCorrection: number = Math.floor(yearInCentury / 4);
  const additionalSolarCorrection: number = yearInCentury % 4;
  const dayOfTheWeekCorrection: number =
    (32 +
      2 * leapYearCorrection +
      2 * additionalLunarCorrection -
      lunarParameter -
      additionalSolarCorrection) %
    7;
  const solarCycleCorrection: number = Math.floor(
    (goldenNumber + 11 * lunarParameter + 22 * dayOfTheWeekCorrection) / 451,
  );
  const month: number = Math.floor(
    (lunarParameter + dayOfTheWeekCorrection - 7 * solarCycleCorrection + 114) /
      31,
  );
  const day: number =
    ((lunarParameter +
      dayOfTheWeekCorrection -
      7 * solarCycleCorrection +
      114) %
      31) +
    1;
  return new Date(year, month - 1, day);
}

function calculateGoodFriday(easter: Date): Date {
  const date = new Date(easter);
  date.setDate(date.getDate() - 2);
  return date;
}

function calculateCarnival(easter: Date): Date {
  const date = new Date(easter);
  date.setDate(date.getDate() - 47);
  return date;
}

function calculateCorpusChristi(easter: Date): Date {
  const date = new Date(easter);
  date.setDate(date.getDate() + 60);
  return date;
}
