import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CronSchema } from '../cron/schemas/cron.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CronLog', schema: CronSchema }]),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
