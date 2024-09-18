import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductsSchema } from './schemas/products.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UtilsModule } from '../utils/utils.module';
import { UtilsService } from '../utils/utils.service';
import { CHALLENGE_API_TOKEN } from '../constants';
import axios from 'axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductsSchema }]),
    UtilsModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    UtilsService,
    {
      provide: CHALLENGE_API_TOKEN,
      useFactory: () => {
        return axios.create({
          baseURL: process.env.URL_CHALLENGES_CODE,
        });
      },
    },
  ],
})
export class ProductsModule {}
