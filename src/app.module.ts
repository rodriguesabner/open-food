import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    CronModule,
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        dbName: process.env.MONGO_DB,
        uri: process.env.MONGO_URI,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
      }),
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
