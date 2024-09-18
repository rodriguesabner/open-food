import { Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
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
}
