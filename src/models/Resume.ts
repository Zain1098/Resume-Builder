import { Schema, model, models, type Model } from "mongoose";

export interface IAtsScoreEntry {
  score: number;
  details: Record<string, unknown>;
  date: Date;
}

export interface IResume {
  _id: string;
  userId: string;
  title: string;
  dataJSON: Record<string, unknown>;
  templateId?: string;
  createdAt: Date;
  updatedAt: Date;
  atsScoreHistory: IAtsScoreEntry[];
}

const AtsScoreSchema = new Schema<IAtsScoreEntry>({
  score: { type: Number, required: true },
  details: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now },
});

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    dataJSON: { type: Schema.Types.Mixed, required: true },
    templateId: { type: String },
    atsScoreHistory: { type: [AtsScoreSchema], default: [] },
  },
  { timestamps: true },
);

export const Resume: Model<IResume> =
  (models.Resume as Model<IResume>) || model<IResume>("Resume", ResumeSchema);
