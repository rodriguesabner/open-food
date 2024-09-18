import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  code: number;
  status: string;
  imported_t: Date;
  url: string;
  creator: string;
  createdAt: Date;
  lastModifiedAt: Date;
  productName: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchasePlaces: string;
  stores: string;
  ingredients: string;
  traces: string;
  servingSize: string;
  servingQuantity: number;
  nutriscoreScore: number;
  nutriscoreGrade: string;
  mainCategory: string;
  imageUrl: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
