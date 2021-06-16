import { CompositeImage } from "../types/PhotoProcessorContext";

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function getImageFromSource(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = source;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 6,
  fill = false,
  stroke = false
) {
  const newRadius = { tl: radius, tr: radius, br: radius, bl: radius };

  ctx.beginPath();
  ctx.moveTo(x + newRadius.tl, y);
  ctx.lineTo(x + width - newRadius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + newRadius.tr);
  ctx.lineTo(x + width, y + height - newRadius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - newRadius.br, y + height);
  ctx.lineTo(x + newRadius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - newRadius.bl);
  ctx.lineTo(x, y + newRadius.tl);
  ctx.quadraticCurveTo(x, y, x + newRadius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

/** we need 4:3 resolution. 3/4 = 0.75 */

const GUTTER = 18;
const CANVAS_WIDTH = 1280;
export const IMAGE_WIDTH = (1280 - 4 * GUTTER) / 3;
export const IMAGE_HEIGHT = 0.75 * IMAGE_WIDTH;
const CANVAS_HEIGHT = IMAGE_HEIGHT * 3 + 4 * GUTTER;

export function getImageParams(naturalWidth: number, naturalHeight: number) {
  const ratio = naturalHeight / naturalWidth;

  if (ratio > 0.75) {
    return {
      dh: IMAGE_HEIGHT,
      dw: IMAGE_HEIGHT / ratio,
    };
  } else {
    return {
      dh: IMAGE_WIDTH * ratio,
      dw: IMAGE_WIDTH,
    };
  }
}

function drawImage(ctx: CanvasRenderingContext2D, imageSrc: string, x: number, y: number) {
  return getImageFromSource(imageSrc).then((image) => {
    const { naturalWidth, naturalHeight } = image;
    const { dw, dh } = getImageParams(naturalWidth, naturalHeight);
    const dx = x + (IMAGE_WIDTH - dw) / 2;
    const dy = y + (IMAGE_HEIGHT - dh) / 2;
    ctx.drawImage(image, dx, dy, dw, dh);
  });
}

/**
 * drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
 */

export function getLogoParams(naturalWidth: number, naturalHeight: number) {
  const ratio = naturalHeight / naturalWidth;

  if (ratio > 0.75) {
    const dh = naturalHeight > IMAGE_HEIGHT ? IMAGE_HEIGHT : naturalHeight;
    return {
      dh,
      dw: dh / ratio,
    };
  } else {
    const dw = naturalWidth > IMAGE_WIDTH ? IMAGE_WIDTH : naturalWidth;
    return {
      dh: dw * ratio,
      dw,
    };
  }
}

function drawLogo(ctx: CanvasRenderingContext2D, imageSrc: string, x: number, y: number) {
  return getImageFromSource(imageSrc).then((image) => {
    const { naturalWidth, naturalHeight } = image;
    const { dw, dh } = getLogoParams(naturalWidth, naturalHeight);
    const dx = x + (IMAGE_WIDTH - dw) / 2;
    const dy = y + (IMAGE_HEIGHT - dh) / 2;

    ctx.drawImage(image, dx, dy, dw, dh);
  });
}

const drawRoundedImage = (
  ctx: CanvasRenderingContext2D,
  imageSrc: string,
  x: number,
  y: number
) => {
  ctx.save();
  roundRect(ctx, x, y, IMAGE_WIDTH, IMAGE_HEIGHT, 6);
  ctx.clip();
  return drawImage(ctx, imageSrc, x, y).then(() => ctx.restore());
};

const drawRoundedLogo = (ctx: CanvasRenderingContext2D, imageSrc: string, x: number, y: number) => {
  ctx.save();
  roundRect(ctx, x, y, IMAGE_WIDTH, IMAGE_HEIGHT, 6);
  ctx.clip();
  return drawLogo(ctx, imageSrc, x, y).then(() => ctx.restore());
};

export function drawTemplate(canvas: HTMLCanvasElement, imageList: CompositeImage[], logo: string) {
  const ctx = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  if (ctx !== null) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const getX = (column: number | null) => {
      if (column === null) return 0;
      return GUTTER + (IMAGE_WIDTH + GUTTER) * (column - 1);
    };
    const getY = (row: number | null) => {
      if (row === null) return 0;
      return GUTTER + (IMAGE_HEIGHT + GUTTER) * (row - 1);
    };

    return imageList
      .reduce(
        (prevPromise, image) =>
          prevPromise.then(() =>
            drawRoundedImage(ctx, image.src, getX(image.position.column), getY(image.position.row))
          ),
        Promise.resolve()
      )
      .then(() => {
        if (logo) {
          drawRoundedLogo(ctx, logo, getX(2), getY(2));
        }
      })
      .then(() => canvas);
  } else {
    return new Promise(() => canvas);
  }
}
