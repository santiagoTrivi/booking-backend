export enum NotificationEnum {
  POST = "POST",
  REPOST = "REPOST",
  COMMENT = "COMMENT",
  LIKE = "LIKE",
  DEPOSIT = "DEPOSIT",
  TRANFERENCE = "TRANFERENCE",
  BOOKMARK = "BOOKMARK",
  FOLLOW = "FOLLOW",
  REPORT = "REPORT",
  REQUEST = "REQUEST",
}

export type NotificationType = keyof typeof NotificationEnum;
