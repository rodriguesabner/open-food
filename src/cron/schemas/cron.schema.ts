import { Schema, Document } from 'mongoose';

export interface CronLog extends Document {
  status: string;
  error?: string;
  productsProcessed: number;
  startedAt: Date;
  endedAt: Date;
}

export const CronSchema = new Schema<CronLog>({
  status: { type: String, required: true },
  error: { type: String },
  productsProcessed: { type: Number, required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date, required: true },
});
