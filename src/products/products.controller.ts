import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { Product } from './schemas/products.schema';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Param('page') page?: number, @Param('limit') limit?: number) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param('code') code: Partial<Product>) {
    return this.productsService.findOne(code);
  }

  @Put(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('code') code: number,
    @Body() updateProductDto: Partial<ProductDto>,
  ) {
    return this.productsService.update(code, updateProductDto);
  }

  @Delete(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('code') code: Partial<ProductDto>) {
    return this.productsService.changeStatus(code);
  }
}
