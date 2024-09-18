import { Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly consoleUtils: UtilsService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(productDto: ProductDto) {
    return 'This action adds a new product';
  }

  async update(productDto: ProductDto): Promise<Product> {
    const createdCat = new this.productModel(productDto);
    return createdCat.save();
  }

  async changeStatus(productDto: ProductDto): Promise<Product> {
    const createdCat = new this.productModel(productDto);

    //TODO: alterar status do produto para trash.
    return createdCat.save();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSyncProducts() {
    try {
      this.logger.log('Starting import products cron job');
      const tmpDir = this.consoleUtils.createTmpDir();
      const tasksDownloadFile = [];

      const files: string[] = await this.consoleUtils.fetchFilesList();

      this.logger.log('Downloading files... This may take a while.');

      for (let i = 0; i < files.length; i++) {
        tasksDownloadFile.push(
          this.consoleUtils.downloadAndSaveFile(files[i], tmpDir),
        );
      }

      this.logger.log('Files downloaded. Processing files...');

      const filePaths: string[] =
        await this.consoleUtils.getJsonFilePaths(tasksDownloadFile);

      const products: any[] = await this.consoleUtils.processFiles(filePaths);

      this.logger.log('Products processed. Importing products...');

      for (const product of products) {
        const existingProduct = await this.productModel.findOne({
          code: product.code,
        });
        if (!existingProduct) {
          await this.productModel.create(product);
        }
      }

      this.logger.log('Products imported successfully.');
    } catch (error) {
      this.logger.error('Error importing products', error);
    }
  }
}
