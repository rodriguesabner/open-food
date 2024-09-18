import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(page: number, limit = 25): Promise<Product[]> {
    return this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(productDto: Partial<ProductDto>): Promise<Product> {
    return this.productModel.findOne({ code: productDto.code });
  }

  async update(code: string, productDto: ProductDto): Promise<Product> {
    const productModel = new this.productModel(productDto);
    return productModel.updateOne({ code }, productDto);
  }

  async changeStatus(productDto: Partial<ProductDto>): Promise<Product> {
    const productModel = new this.productModel(productDto);
    return productModel.updateOne(
      { code: productDto.code },
      { status: 'trash' },
    );
  }
}
