import 'dayjs/locale/pl';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

import {
  AxeIcon,
  LaptopIcon,
  PuzzleIcon,
  ScaleIcon,
  SparklesIcon,
  SproutIcon,
  TreesIcon,
  UserSearchIcon,
} from '@/assets/icons';
import { CircleCheckIcon } from '@/assets/icons/lucid/circle-check';
import { FileCheckIcon } from '@/assets/icons/lucid/file-check';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale('pl');

export const formattedDate = (date: string, format: string) =>
  dayjs.utc(date).isValid() ? dayjs.utc(date).format(format) : 'Nieprawidłowa data';

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 1:
      return SparklesIcon;
    case 2:
      return TreesIcon;
    case 3:
      return LaptopIcon;
    case 4:
      return FileCheckIcon;
    case 5:
      return PuzzleIcon;
    case 6:
      return UserSearchIcon;
    case 7:
      return ScaleIcon;
    case 8:
      return AxeIcon;
    case 9:
      return SproutIcon;
    case 10:
      return CircleCheckIcon;
    default:
      return SparklesIcon;
  }
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return null;
};
