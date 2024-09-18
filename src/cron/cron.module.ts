import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import axios from 'axios';
import { CHALLENGE_API_TOKEN } from 'src/constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    CronService,
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
