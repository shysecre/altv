import alt from "alt-client";
import {
  LocalEvents,
  LocalWebViewEvents,
  type AuthLoginData,
  type AuthRegisterData
} from "shared";
import { WebViewFactory } from "../../common";
import { ROUTES } from "../../constants";

alt.onServer(LocalEvents.AUTH_START, onAuthStart);

function onAuthStart() {
  const AUTH_WEBVIEW = WebViewFactory.get("auth", ROUTES.LOGIN);

  console.log(`Initiated auth`);

  AUTH_WEBVIEW.on(LocalWebViewEvents.AUTH_COMPLETE_LOGIN, onAuthCompleteLogin);
  AUTH_WEBVIEW.on(
    LocalWebViewEvents.AUTH_COMPLETE_REGISTER,
    onAuthCompleteRegister
  );

  AUTH_WEBVIEW.isVisible = true;
  AUTH_WEBVIEW.focus();
}

function onAuthCompleteLogin(data: AuthLoginData) {
  alt.emitServer(LocalEvents.AUTH_COMPLETE_LOGIN, data);
}

function onAuthCompleteRegister(data: AuthRegisterData) {
  alt.emitServer(LocalEvents.AUTH_COMPLETE_REGISTER, data);
}
