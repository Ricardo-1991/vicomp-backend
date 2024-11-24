import { Injectable } from '@nestjs/common';
import { ocurrences } from '../../database/ocurrence';

@Injectable()
export class OcurrenceService {
  constructor() {}
  findAll() {
    return ocurrences;
  }
}
