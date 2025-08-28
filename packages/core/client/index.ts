import alt, { WebView } from "alt-client";

const WEBVIEW = new WebView("http://resource/webview/index.html");
WEBVIEW.isVisible = true;
WEBVIEW.focus();

alt.onServer("test", () => {
  WEBVIEW.emit("hey", 1);
});
