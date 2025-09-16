import { Schema, model, models, type Model } from "mongoose";

export interface IUser {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
  plan: "free" | "pro";
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
