import { Injectable, Logger } from '@nestjs/common';
import { CronLog } from './schemas/cron.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Product } from '../products/schemas/products.schema';
import { CronUtils } from './cron.utils';

@Injectable()
class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectModel('CronLog')
    private readonly cronLogModel: Model<CronLog>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly cronUtils: CronUtils,
  ) {}

  @Cron(process.env.CRON_EXPRESSION || CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSyncProducts() {
    const startTime = new Date();
    let productsProcessed = 0;

    try {
      this.logger.log('Starting import products cron job');
      const tmpDir = this.cronUtils.createTmpDir();
      const tasksDownloadFile = [];

      const files: string[] = await this.cronUtils.fetchFilesList();

      this.logger.log('Downloading files... This may take a while.');

      for (let i = 0; i < files.length; i++) {
        tasksDownloadFile.push(
          this.cronUtils.downloadAndSaveFile(files[i], tmpDir),
        );
      }

      this.logger.log('Files downloaded. Processing files...');

      const filePaths: string[] =
        await this.cronUtils.getJsonFilePaths(tasksDownloadFile);

      const products = await this.cronUtils.processFiles(filePaths);
      productsProcessed = products.length;

      this.logger.log('Products processed. Importing products...');

      for (const product of products) {
        const existingProduct = await this.productModel.findOne({
          code: product.code,
        });
        if (!existingProduct) {
          await this.productModel.create(product);
        }
      }

      await this.createLog('success', productsProcessed, startTime);
      this.logger.log('Products imported successfully.');
    } catch (error) {
      this.logger.error('Error importing products', error);
      await this.createLog(
        'failure',
        productsProcessed,
        startTime,
        error.message,
      );
    }
  }

  async createLog(
    status: string,
    productsProcessed: number,
    startedAt: Date,
    error?: string,
  ) {
    const log = new this.cronLogModel({
      status,
      productsProcessed,
      error,
      startedAt,
      endedAt: new Date(),
    });
    return log.save();
  }
}

export { CronService };
