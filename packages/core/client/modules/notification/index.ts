import alt from "alt-client";
import { LocalEvents, LocalWebViewEvents, type NotificationData } from "shared";
import { WebViewFactory } from "../../common";
import { ROUTES } from "../../constants";

alt.onServer(LocalEvents.SHOW_NOTIFICATION, (data: NotificationData) => {
  const NOTIFICATION_WEBVIEW = WebViewFactory.get(
    "notification",
    ROUTES.SHOW_NOTIFICATION,
    true
  );

  NOTIFICATION_WEBVIEW.emit(LocalWebViewEvents.SHOW_NOTIFICATION, data);

  WebViewFactory.destroy("notification");
});
