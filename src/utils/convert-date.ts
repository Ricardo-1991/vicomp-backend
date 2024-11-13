import { BadRequestException } from '@nestjs/common';

export function convertToISODate(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  const isoDate = `${year}-${month}-${day}`;

  if (isNaN(new Date(isoDate).getTime())) {
    throw new BadRequestException('Invalid date format. Use DD/MM/YYYY.');
  }

  return isoDate;
}
