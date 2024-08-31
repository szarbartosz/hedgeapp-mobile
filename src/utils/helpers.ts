import 'dayjs/locale/pl';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale('pl');

export const formattedDate = (date: string, format: string) =>
  dayjs.utc(date).isValid() ? dayjs.utc(date).format(format) : 'Nieprawidłowa data';
