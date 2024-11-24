import { Controller, Get } from '@nestjs/common';
import { OcurrenceService } from './ocurrence.service';

@Controller('ocurrences')
export class OcurrenceController {
  constructor(private readonly ocurrenceService: OcurrenceService) {}

  @Get()
  findAll() {
    return this.ocurrenceService.findAll();
  }
}
