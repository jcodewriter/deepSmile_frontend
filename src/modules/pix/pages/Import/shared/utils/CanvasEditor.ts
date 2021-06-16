import CommonHelper from "src/utils/helpers/CommonHelper";

interface Frame {
  height: number;
  width: number;
}

export interface Canvas extends HTMLCanvasElement {
  centerX: number;
  centerY: number;
}

interface CacheCanvas {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

const RADIUS = Math.PI / 180;

const cache = {
  canvas: {
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
  },
  view: {
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
  },
  img: {
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
  },
};

interface CanvasEditorParams {
  scale: number;
  rotate: number;
  translate: {
    x: number;
    y: number;
  };
}

class CanvasEditor {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D | undefined | null;
  img: HTMLImageElement | undefined;
  scale: number;
  rotate: number;
  translate: {
    x: number;
    y: number;
  };

  constructor(canvasElem: Canvas, params: CanvasEditorParams) {
    this.canvas = canvasElem;
    this.ctx = undefined;
    this.img = undefined;
    this.scale = params.scale;
    this.rotate = params.rotate;
    this.translate = params.translate;
  }

  onScale(value: number) {
    this.scale = value;
    this.drawSceneAsAnimationFrame();
  }

  /** Source: https://math.stackexchange.com/a/2774481 */
  calculateScaleOnRotate() {
    const { view } = cache;

    let absAngle = this.rotate > 180 ? 360 - this.rotate : this.rotate;

    if (absAngle > 90 && absAngle <= 180) {
      absAngle = 180 - absAngle;
    }

    const alpha = (absAngle * Math.PI) / 180;

    return Math.max(
      Math.cos(alpha) + (Math.sin(alpha) * view.width) / view.height,
      Math.cos(alpha) + (Math.sin(alpha) * view.height) / view.width
    );
  }

  getEditParams() {
    return {
      translate: this.translate,
      scale: this.scale,
      rotate: this.rotate,
    };
  }

  onRotate(value: number) {
    this.rotate = value;
    this.scale = this.calculateScaleOnRotate();

    this.drawSceneAsAnimationFrame();
  }

  onTranslate(deltaX: number, deltaY: number) {
    this.translate = { x: this.translate.x + deltaX, y: this.translate.y + deltaY };
    this.drawSceneAsAnimationFrame();
  }

  setTransform(params: CanvasEditorParams) {
    this.scale = params.scale;
    this.rotate = params.rotate;
    this.translate = params.translate;
    this.drawSceneAsAnimationFrame();
  }

  drawScene(options = { withBackground: false }) {
    const { canvas, img, view } = cache;

    this.resetCanvas(canvas);

    if (options.withBackground) {
      /** we add 1px from each side to avoid black borders on final template */
      if (typeof this.ctx !== "undefined" && this.ctx) {
        this.ctx.fillStyle = "white";
        this.ctx?.fillRect(
          (canvas.width - view.width) / 2 - 1,
          (canvas.height - view.height) / 2 - 1,
          view.width + 2,
          view.height + 2
        );
      }
    }

    this.saveContext();
    if (typeof this.ctx !== "undefined" && this.ctx) {
      this.ctx.translate(canvas.centerX + this.translate.x, canvas.centerY + this.translate.y);
      this.ctx.scale(this.scale, this.scale);
      this.ctx.rotate(this.rotate * RADIUS);
    }

    const { width, height } = img;
    if (typeof this.ctx !== "undefined" && this.ctx) {
      if (typeof this.img !== "undefined") {
        this.ctx.drawImage(this.img, -width / 2, -height / 2, width, height);
      }
    }
    this.restoreContext();
    this.saveContext();

    if (!options.withBackground) {
      this.createMask(canvas);
    }
    this.restoreContext();
  }

  drawSceneAsAnimationFrame() {
    window.requestAnimationFrame(() => {
      this.drawScene();
    });
  }

  saveContext() {
    if (typeof this.ctx !== "undefined" && this.ctx) {
      this.ctx.save();
    }
  }

  restoreContext() {
    if (typeof this.ctx !== "undefined" && this.ctx) {
      this.ctx.restore();
    }
  }

  initImage(src: string, frame: Frame) {
    CommonHelper.getImageFromSource(src).then((image) => {
      this.img = image;
      this.setViewCoords(frame);
      this.setImgCords();
      this.initCanvas();
      this.drawSceneAsAnimationFrame();
    });
  }

  getImageParams(naturalWidth: number, naturalHeight: number) {
    const { view } = cache;
    const ratio = naturalHeight / naturalWidth;

    if (ratio > 0.75) {
      return {
        dh: view.height,
        dw: view.height / ratio,
      };
    } else {
      return {
        dh: view.width * ratio,
        dw: view.width,
      };
    }
  }

  setImgCords() {
    if (typeof this.img === "undefined") return;
    const { dh, dw } = this.getImageParams(this.img?.naturalWidth, this.img?.naturalHeight);

    cache.img.width = dw;
    cache.img.height = dh;
    cache.img.centerX = dw / 2;
    cache.img.centerY = dh / 2;
  }

  setViewCoords(frame: Frame) {
    cache.view.width = frame.width;
    cache.view.height = frame.height;
    cache.view.centerX = frame.width / 2;
    cache.view.centerY = frame.height / 2;
  }

  initCanvas() {
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasSize();
  }

  setCanvasSize() {
    const { width, height } = CanvasEditor.getViewportSize();
    this.canvas.width = cache.canvas.width = width;
    this.canvas.height = cache.canvas.height = height;
    cache.canvas.centerX = width / 2;
    cache.canvas.centerY = height / 2;
  }

  resetCanvas(canvas: CacheCanvas) {
    if (typeof this.ctx !== "undefined" && this.ctx) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  createMask(canvas: CacheCanvas) {
    const { view } = cache;

    if (typeof this.ctx !== "undefined" && this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(canvas.width, 0);
      this.ctx.lineTo(canvas.width, canvas.height);
      this.ctx.lineTo(0, canvas.height);
      this.ctx.lineTo(0, 0);
      this.ctx.closePath();

      this.ctx.translate(canvas.centerX, canvas.centerY);

      this.ctx.moveTo(view.centerX, view.centerY);
      this.ctx.lineTo(view.centerX, view.centerY - view.height);
      this.ctx.lineTo(view.centerX - view.width, view.centerY - view.height);
      this.ctx.lineTo(view.centerX - view.width, view.centerY);
      this.ctx.lineTo(view.centerX, view.centerY);
      this.ctx.closePath();

      this.ctx.fillStyle = "rgba(247, 247, 247, .8)";
      this.ctx.fill();
    }
  }

  getEditedImageSrc() {
    const { canvas, view } = cache;
    this.drawScene({ withBackground: true });

    const viewData = this.ctx?.getImageData(
      canvas.centerX - view.centerX,
      canvas.centerY - view.centerY,
      view.width,
      view.height
    );
    const newCanvas = document.createElement("canvas");
    newCanvas.width = view.width;
    newCanvas.height = view.height;
    const newCtx = newCanvas.getContext("2d");
    if (typeof viewData !== "undefined") {
      newCtx?.putImageData(viewData, 0, 0);
    }

    return { src: newCanvas.toDataURL("image/jpeg"), canvas: newCanvas };
  }

  static getViewportSize() {
    const maxViewWidth = Math.max(window.innerWidth, cache.img.width);
    const maxViewHeight = Math.max(window.innerHeight, cache.img.height);

    return {
      width: maxViewWidth,
      height: maxViewHeight,
    };
  }
}

export default CanvasEditor;
