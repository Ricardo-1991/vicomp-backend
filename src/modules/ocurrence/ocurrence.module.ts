import { Module } from '@nestjs/common';
import { OcurrenceService } from './ocurrence.service';
import { OcurrenceController } from './ocurrence.controller';

@Module({
  providers: [OcurrenceService],
  controllers: [OcurrenceController],
})
export class OcurrenceModule {}
