import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import axios from 'axios';
import { CHALLENGE_API_TOKEN } from 'src/constants';
import { CronSchema } from './schemas/cron.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Product, ProductsSchema } from '../products/schemas/products.schema';
import { CronUtils } from './cron.utils';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }]),
    MongooseModule.forFeature([{ name: 'CronLog', schema: CronSchema }]),
  ],
  providers: [
    CronService,
    CronUtils,
    {
      provide: CHALLENGE_API_TOKEN,
      useFactory: () => {
        return axios.create({
          baseURL: process.env.URL_CHALLENGES_CODE,
        });
      },
    },
  ],
  exports: [CronService],
})
export class CronModule {}
