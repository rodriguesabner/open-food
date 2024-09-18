import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  importedAt: Date;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  lastModifiedAt: Date;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  brands: string;

  @Prop({ required: true })
  categories: string;

  @Prop({ required: true })
  labels: string;

  @Prop()
  cities: string;

  @Prop({ required: true })
  purchasePlaces: string;

  @Prop()
  stores: string;

  @Prop({ required: true })
  ingredients: string;

  @Prop({ required: true })
  traces: string;

  @Prop({ required: true })
  servingSize: string;

  @Prop({ required: true })
  servingQuantity: number;

  @Prop({ required: true })
  nutriscoreScore: number;

  @Prop({ required: true })
  nutriscoreGrade: string;

  @Prop({ required: true })
  mainCategory: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
