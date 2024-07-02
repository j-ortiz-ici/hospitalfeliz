import { Module } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { ReceptionController } from './reception.controller';

@Module({
  providers: [ReceptionService],
  controllers: [ReceptionController]
})
export class ReceptionModule {}
