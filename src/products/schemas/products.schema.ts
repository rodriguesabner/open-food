import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  code: number;

  status: string;
  importedAt: Date;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  creator: string;

  @Prop({ default: '' })
  createdAt: Date;

  @Prop({ default: '' })
  lastModifiedAt: Date;

  @Prop({ default: '' })
  productName: string;

  @Prop({ default: '' })
  quantity: string;

  @Prop({ default: '' })
  brands: string;

  @Prop({ default: '' })
  categories: string;

  @Prop({ default: '' })
  labels: string;

  @Prop({ default: '' })
  cities: string;

  @Prop({ default: '' })
  purchasePlaces: string;

  @Prop({ default: '' })
  stores: string;

  @Prop({ default: '' })
  ingredients: string;

  @Prop({ default: '' })
  traces: string;

  @Prop({ default: '' })
  servingSize: string;

  @Prop({ default: '' })
  servingQuantity: number;

  @Prop({ default: '' })
  nutriscoreScore: number;

  @Prop({ default: '' })
  nutriscoreGrade: string;

  @Prop({ default: '' })
  mainCategory: string;

  @Prop({ default: '' })
  imageUrl: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
