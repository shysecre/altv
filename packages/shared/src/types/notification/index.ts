export interface NotificationData {
  message: string;
  type: NotificationType;
}

export type NotificationType = "warn" | "error" | "normal" | "success";
