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

@Controller('products')
// @UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  //GET /products: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o REQUEST.
  async findAll() {
    await this.productsService.handleSyncProducts();
    return { status: 'true' };
    // return this.productsService.findAll();
  }

  @Get(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  //GET /products/:code: Obter a informação somente de um produto da base de dados
  findOne(@Param('code') id: string) {
    console.log(id);
    // return this.productsService.findOne();
  }

  @Put(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  // PUT /products/:code: Será responsável por receber atualizações do Projeto Web
  update(@Param('code') id: string, @Body() updateProductDto: ProductDto) {
    console.log(id, updateProductDto);
    // return this.productsService.update(null);
  }

  @Delete(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  // DELETE /products/:code: Mudar o status do produto para trash
  remove(@Param('code') id: string) {
    console.log(id);
    // return this.productsService.changeStatus(null);
  }
}
