import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  @ApiSecurity('api-key')
  async findAll(@Param('page') page?: number, @Param('limit') limit?: number) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Obter detalhes de um produto' })
  @ApiParam({ name: 'code', description: 'Código do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSecurity('api-key')
  findOne(@Param('code') code: number) {
    return this.productsService.findOne(code);
  }

  @Put(':code')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'code', description: 'Código do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: ProductDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSecurity('api-key')
  update(
    @Param('code') code: number,
    @Body() updateProductDto: Partial<ProductDto>,
  ) {
    return this.productsService.update(code, updateProductDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Remover um produto (mudar status para "trash")' })
  @ApiParam({ name: 'code', description: 'Código do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto removido com sucesso (status alterado para "trash").',
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiSecurity('api-key')
  remove(@Param('code') code: Partial<ProductDto>) {
    return this.productsService.changeStatus(code);
  }
}
