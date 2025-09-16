import { Schema, model, models, type Model } from "mongoose";

export interface ITemplate {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  price?: number;
  isPaid: boolean;
  thumbnailUrl?: string;
  schemaJSON: Record<string, unknown>;
  createdBy?: string;
  tags?: string[];
  categories?: string[];
}

const TemplateSchema = new Schema<ITemplate>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false },
    thumbnailUrl: { type: String },
    schemaJSON: { type: Schema.Types.Mixed, required: true },
    createdBy: { type: String },
    tags: [{ type: String }],
    categories: [{ type: String }],
  },
  { timestamps: true },
);

export const Template: Model<ITemplate> =
  (models.Template as Model<ITemplate>) ||
  model<ITemplate>("Template", TemplateSchema);
