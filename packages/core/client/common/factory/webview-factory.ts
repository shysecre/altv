import { WebView } from "alt-client";
import { getConfig } from "shared";
import { ROUTES } from "../../constants";

type ValueOf<T> = T[keyof T];

export class WebViewFactory {
  private static instances = new Map<string, WebView>();

  static get(
    name: string,
    path: ValueOf<typeof ROUTES>,
    isVisible = false
  ): WebView {
    let view = this.instances.get(name);

    if (!view) {
      view = new WebView(getConfig().WEBVIEW + path);
      view.isVisible = isVisible;
      this.instances.set(name, view);
    }

    return view;
  }

  static destroy(name: string) {
    const view = this.instances.get(name);
    if (!view) return;

    view.destroy();
    this.instances.delete(name);
  }
}
