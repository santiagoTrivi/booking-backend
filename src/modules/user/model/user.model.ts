import { Schema, Types, model, Model, Document } from "mongoose";
import { UserProps } from "../domain/userProps.interface";

export interface UserMongooseType extends Document, UserProps {}

const UserMongoSchema = new Schema<UserMongooseType>(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "roles",
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", UserMongoSchema);
