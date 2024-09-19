import { IsNumber, IsString, IsDate, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 123456, description: 'Código único do produto' })
  @IsNumber()
  code: number;

  @ApiProperty({ example: 'published', description: 'Status do produto' })
  @IsString()
  status: string;

  @ApiProperty({
    example: '2023-09-18T14:21:00.000Z',
    description: 'Data de importação do produto',
  })
  @IsDate()
  importedAt: Date;

  @ApiProperty({
    example: 'https://example.com/product/123',
    description: 'URL do produto',
  })
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'John Doe', description: 'Criador do produto' })
  @IsString()
  creator: string;

  @ApiProperty({
    example: '2023-09-18T14:21:00.000Z',
    description: 'Data de criação do produto',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2023-09-18T14:21:00.000Z',
    description: 'Última modificação do produto',
  })
  @IsDate()
  lastModifiedAt: Date;

  @ApiProperty({ example: 'Hamburger', description: 'Nome do produto' })
  @IsString()
  productName: string;

  @ApiProperty({ example: '200g', description: 'Quantidade do produto' })
  @IsString()
  quantity: string;

  @ApiProperty({ example: "Abner's", description: 'Marca do produto' })
  @IsString()
  brands: string;

  @ApiProperty({ example: 'Food', description: 'Categoria do produto' })
  @IsString()
  categories: string;

  @ApiProperty({ example: 'Label1, Label2', description: 'Rótulos do produto' })
  @IsString()
  labels: string;

  @ApiProperty({
    example: 'São Paulo, Campinas',
    description: 'Cidades onde o produto está disponível',
  })
  @IsString()
  cities: string;

  @ApiProperty({
    example: 'Store1, Store2',
    description: 'Locais de compra do produto',
  })
  @IsString()
  purchasePlaces: string;

  @ApiProperty({
    example: 'Store1, Store2',
    description: 'Lojas onde o produto está disponível',
  })
  @IsString()
  stores: string;

  @ApiProperty({
    example: 'Ingredientes detalhados',
    description: 'Ingredientes do produto',
  })
  @IsString()
  ingredients: string;

  @ApiProperty({ example: 'Trigo, Amendoim', description: 'Traços do produto' })
  @IsString()
  traces: string;

  @ApiProperty({ example: '100g', description: 'Tamanho da porção do produto' })
  @IsString()
  servingSize: string;

  @ApiProperty({ example: 1, description: 'Quantidade da porção' })
  @IsNumber()
  servingQuantity: number;

  @ApiProperty({ example: 85, description: 'Pontuação Nutriscore' })
  @IsNumber()
  nutriscoreScore: number;

  @ApiProperty({ example: 'B', description: 'Classificação Nutriscore' })
  @IsString()
  nutriscoreGrade: string;

  @ApiProperty({
    example: 'Main Category',
    description: 'Categoria principal do produto',
  })
  @IsString()
  mainCategory: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL da imagem do produto',
  })
  @IsUrl()
  imageUrl: string;

  constructor(data: any) {
    this.code = data.code;
    this.status = data.status;
    this.importedAt = new Date(data.imported_t);
    this.url = data.url;
    this.creator = data.creator;
    this.createdAt = new Date(data.created_t * 1000);
    this.lastModifiedAt = new Date(data.last_modified_t * 1000);
    this.productName = data.product_name;
    this.quantity = data.quantity;
    this.brands = data.brands;
    this.categories = data.categories;
    this.labels = data.labels;
    this.cities = data.cities;
    this.purchasePlaces = data.purchase_places;
    this.stores = data.stores;
    this.ingredients = data.ingredients_text;
    this.traces = data.traces;
    this.servingSize = data.serving_size;
    this.servingQuantity = data.serving_quantity;
    this.nutriscoreScore = data.nutriscore_score;
    this.nutriscoreGrade = data.nutriscore_grade;
    this.mainCategory = data.main_category;
    this.imageUrl = data.image_url;
  }
}
