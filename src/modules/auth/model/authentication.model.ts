import { Schema, Types, model, Model } from "mongoose";
import { AuthenticationProps } from "../domain/authenticationProps";

const AuthenticationMongoSchema = new Schema<AuthenticationProps>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Authentication = model(
  "Authentication",
  AuthenticationMongoSchema
);
