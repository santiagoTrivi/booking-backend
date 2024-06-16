import { Schema, Types, model, Model, Document } from "mongoose";
import { notificationProps } from "../domain/notificationProps.interface";
import { NotificationEnum } from "../domain/notificationType";

export interface NotificationMongooseType extends notificationProps, Document {}

const NotificationSchema = new Schema<NotificationMongooseType>(
  {
    notify_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    notify_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: NotificationEnum,
      required: true,
    },
    notifiedAt: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    group: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Notification = model("Notification", NotificationSchema);
export default Notification;
