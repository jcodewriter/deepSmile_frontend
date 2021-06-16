import { ServerResponse } from "http";

export interface CustomCanvas extends HTMLCanvasElement {
  msToBlob?: () => void;
}

export default class CommonHelper {
  static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  static isResSent(res: ServerResponse): boolean {
    return res.finished || res.headersSent;
  }

  static runAppCallbackIfNeeded(refreshToken: string): void {
    const { searchParams, pathname } = new URL(document.location.toString());

    if (!searchParams.has("callback")) {
      return;
    }

    // #TODO: Check if  || "" is ok;
    let callback = searchParams.get("callback") || "";

    try {
      callback = decodeURIComponent(callback);
    } catch (error) {
      callback = "";
    }

    const appLink = callback.replace("%token", refreshToken);

    window.open(appLink, "_self");

    searchParams.delete("callback");
    const queryString = searchParams.toString() || "";
    window.history.replaceState(
      {},
      document.title,
      `${pathname}${queryString ? "?" + queryString : ""}`
    );
  }

  static convertCanvasToBlob = (canvas: CustomCanvas) => {
    return new Promise((resolve) => {
      if (typeof canvas.msToBlob === "function") {
        resolve(canvas.msToBlob());
      } else if (typeof canvas.toBlob === "function") {
        canvas.toBlob(resolve, "image/jpeg");
      } else {
        resolve(null);
      }
    });
  };

  static getImageFromSource = (source: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.src = source;
    });
  };

  static convertS3Url = (url: string) => {
    const proxyUrlPrefix = `${process.env.NEXT_PUBLIC_PROXY_URL || ""}/__proxy?path=`;
    if (!url || typeof url !== "string") {
      return url;
    }

    const isReserved = ["blob:", "data:", proxyUrlPrefix].some((prefix) => url.startsWith(prefix));

    return isReserved ? url : proxyUrlPrefix + encodeURIComponent(url);
  };
}
