import { IsNumber, IsString, IsDate, IsUrl } from 'class-validator';

export class ProductDto {
  @IsNumber()
  code: number;

  @IsString()
  status: string;

  @IsDate()
  importedAt: Date;

  @IsUrl()
  url: string;

  @IsString()
  creator: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  lastModifiedAt: Date;

  @IsString()
  productName: string;

  @IsString()
  quantity: string;

  @IsString()
  brands: string;

  @IsString()
  categories: string;

  @IsString()
  labels: string;

  @IsString()
  cities: string;

  @IsString()
  purchasePlaces: string;

  @IsString()
  stores: string;

  @IsString()
  ingredients: string;

  @IsString()
  traces: string;

  @IsString()
  servingSize: string;

  @IsNumber()
  servingQuantity: number;

  @IsNumber()
  nutriscoreScore: number;

  @IsString()
  nutriscoreGrade: string;

  @IsString()
  mainCategory: string;

  @IsUrl()
  imageUrl: string;

  constructor(data: any) {
    this.code = data.code;
    this.status = data.status;
    this.importedAt = new Date(data.imported_t);
    this.url = data.url;
    this.creator = data.creator;
    this.createdAt = new Date(data.created_t * 1000); // Converting UNIX timestamp to Date
    this.lastModifiedAt = new Date(data.last_modified_t * 1000); // Converting UNIX timestamp to Date
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
