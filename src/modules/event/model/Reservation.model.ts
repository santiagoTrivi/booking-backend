import { Schema, model, Document } from "mongoose";
import { EventProps } from "../domain/ReservationProps.interface";

export interface ReservationmongooseType extends EventProps, Document {}

const ReservationSchema = new Schema<ReservationmongooseType>(
  {
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    setDate: {
      type: Date,
      required: true,
    },
    hour: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Reservation = model("Reservation", ReservationSchema);
