import alt, { WebView } from "alt-client";

const WEBVIEW = new WebView("http://localhost:5173/");

WEBVIEW.isVisible = true;
WEBVIEW.focus();

alt.onServer("test", () => {
  WEBVIEW.emit("hey", 1);
});
