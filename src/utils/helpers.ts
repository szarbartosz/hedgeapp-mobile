import 'dayjs/locale/pl';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale('pl');

export const formattedDate = (date: string, format: string) =>
  dayjs.utc(date).isValid() ? dayjs.utc(date).format(format) : 'Nieprawidłowa data';

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return null;
};

export const calculateDaysLeft = (dates: string[]) => {
  let minDaysLeft = Number.MAX_SAFE_INTEGER;

  for (const date of dates) {
    const parsedDate = new Date(date).getTime();

    if (!isNaN(parsedDate)) {
      const now = new Date().getTime();
      const diffTime = parsedDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      minDaysLeft = Math.min(diffDays, minDaysLeft);
    }
  }

  return minDaysLeft;
};
