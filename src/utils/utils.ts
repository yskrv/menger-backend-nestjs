import { randomBytes } from 'crypto';

export const generateRequestId = (): string => {
  return randomBytes(16).toString('hex');
}

const pad = (num: number) => num.toString().padStart(2, '0');

export const formatDateWithOffset = (date: Date, offset: string): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}

