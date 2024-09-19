import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CronLog } from '../cron/schemas/cron.schema';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel('CronLog')
    private readonly cronLogModel: Model<CronLog>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getApiDetails() {
    const dbStatus = await this.checkDatabaseStatus();

    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();

    return {
      message: 'Status API',
      dbStatus,
      lastCronExecution: await this.getLastCronExecution(),
      uptime: `${Math.floor(uptime / 60)} minutos e ${Math.floor(uptime % 60)} segundos`,
      memoryUsage: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
      },
    };
  }

  private async checkDatabaseStatus(): Promise<string> {
    try {
      await this.connection.db.command({ ping: 1 });
      return 'Leitura e escrita OK';
    } catch (error) {
      return 'Erro na conexão com o banco de dados';
    }
  }

  private async getLastCronExecution(): Promise<string> {
    const lastCron: CronLog = await this.cronLogModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();

    return lastCron.toJSON()
      ? lastCron.endedAt.toISOString()
      : 'CRON não executado ainda';
  }
}
