import { Document, Schema, model } from "mongoose";
import { RolesProps } from "../domain/role.interface.prop";

export interface RoleMongooseType extends Document, RolesProps {}

const RoleSchema = new Schema<RoleMongooseType>(
  {
    value: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const RoleModel = model("roles", RoleSchema);
