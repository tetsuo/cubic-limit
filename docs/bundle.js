/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@onur1/drawing3d/lib/Canvas.js":
/*!*****************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Canvas.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moveTo = exports.lineTo = exports.getTransform = exports.getLineDash = exports.fillText = exports.fill = exports.drawImageFull = exports.drawImageScale = exports.drawImage = exports.drawFocusIfNeeded = exports.createRadialGradient = exports.createPattern = exports.createLinearGradient = exports.createImageDataCopy = exports.createImageData = exports.closePath = exports.clip = exports.bezierCurveTo = exports.beginPath = exports.setTextBaseline = exports.getTextBaseline = exports.setTextAlign = exports.getTextAlign = exports.setStrokeStyle = exports.setShadowOffsetY = exports.setShadowOffsetX = exports.setShadowColor = exports.setShadowBlur = exports.setMiterLimit = exports.setLineWidth = exports.setLineJoin = exports.setLineDashOffset = exports.setLineCap = exports.setImageSmoothingEnabled = exports.setGlobalCompositeOperation = exports.setGlobalAlpha = exports.setFont = exports.getFont = exports.setFillStyle = exports.toDataURL = exports.setDimensions = exports.getDimensions = exports.setHeight = exports.getHeight = exports.setWidth = exports.getWidth = exports.getContext2D = exports.getCanvasElementById = exports.unsafeGetContext2D = exports.unsafeGetCanvasElementById = void 0;
exports.renderTo = exports.bindWithContext = exports.bind = exports.withContext = exports.strokePath = exports.fillPath = exports.addColorStop = exports.translate = exports.transform = exports.strokeText = exports.stroke = exports.setTransformMatrix = exports.setTransform = exports.setLineDash = exports.scale = exports.save = exports.rotate = exports.restore = exports.quadraticCurveTo = exports.putImageDataFull = exports.putImageData = void 0;
/**
 * The `Canvas` module contains all the functions necessary to interact with the HTML
 * Canvas API. `graphics-ts` wraps all canvas operations in an `IO<A>` to allow for
 * chaining multiple effectful calls to the HTML Canvas API.
 *
 * For example, taking the example of [drawing a triangle](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) from the MDN Web Docs, the code
 * without `graphics-ts` looks like this.
 *
 * ```ts
 * const draw = () => {
 *   var canvas = document.getElementById('canvas')
 *
 *   if (canvas.getContext) {
 *     var ctx = canvas.getContext('2d')
 *
 *     ctx.beginPath();
 *     ctx.fillStyle = 'black'
 *     ctx.moveTo(75, 50)
 *     ctx.lineTo(100, 75)
 *     ctx.lineTo(100, 25)
 *     ctx.fill()
 *   }
 * }
 * ```
 *
 * With `graphics-ts`, the above code becomes
 *
 * ```ts
 * import { error } from 'fp-ts/lib/Console'
 * import { pipe } from 'fp-ts/lib/pipeable'
 * import * as R from 'fp-ts-contrib/lib/ReaderIO'
 * import * as C from 'graphics-ts/lib/Canvas'
 * import * as Color from 'graphics-ts/lib/Color'
 * import * as S from 'graphics-ts/lib/Shape'
 *
 * const canvasId = 'canvas'
 *
 * const triangle: C.Render<void> = C.fillPath(
 *   pipe(
 *     C.setFillStyle(pipe(Color.black, Color.toCss)),
 *     R.chain(() => C.moveTo(S.point(75, 50))),
 *     R.chain(() => C.lineTo(S.point(100, 75))),
 *     R.chain(() => C.lineTo(S.point(100, 25)))
 *   )
 * )
 *
 * C.renderTo(canvasId, () => error(`[ERROR]: Unable to find canvas with id ${canvasId}`))(triangle)()
 * ```
 *
 * While this may seem somewhat verbose compared to its non-functional counterpart above,
 * the real power of the `Canvas` module is apparent when it is abstracted away by the
 * `Drawing` module.
 *
 * Adapted from https://github.com/purescript-contrib/purescript-canvas.
 *
 * @since 1.0.0
 */
var R = __importStar(__webpack_require__(/*! fp-ts/ReaderIO */ "./node_modules/fp-ts/es6/ReaderIO.js"));
var IO = __importStar(__webpack_require__(/*! fp-ts/IO */ "./node_modules/fp-ts/es6/IO.js"));
var O = __importStar(__webpack_require__(/*! fp-ts/Option */ "./node_modules/fp-ts/es6/Option.js"));
var RA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js"));
var Apply_1 = __webpack_require__(/*! fp-ts/Apply */ "./node_modules/fp-ts/es6/Apply.js");
var function_1 = __webpack_require__(/*! fp-ts/function */ "./node_modules/fp-ts/es6/function.js");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * **[UNSAFE]** Gets a canvas element by id.
 *
 * @category constructors
 * @since 1.0.0
 */
var unsafeGetCanvasElementById = function (id) {
    return document.getElementById(id);
};
exports.unsafeGetCanvasElementById = unsafeGetCanvasElementById;
/**
 * **[UNSAFE]** Gets the 2D graphics context for a canvas element.
 *
 * @category constructors
 * @since 1.0.0
 */
var unsafeGetContext2D = function (c) {
    return c.getContext('2d');
};
exports.unsafeGetContext2D = unsafeGetContext2D;
/**
 * Gets an canvas element by id, or `None` if the element does not exist or is not an
 * instance of `HTMLCanvasElement`.
 *
 * @category constructors
 * @since 1.0.0
 */
var getCanvasElementById = function (id) { return function () {
    var canvas = (0, exports.unsafeGetCanvasElementById)(id);
    return canvas instanceof HTMLCanvasElement ? O.some(canvas) : O.none;
}; };
exports.getCanvasElementById = getCanvasElementById;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Gets the 2D graphics context for a canvas element.
 *
 * @category combinators
 * @since 1.0.0
 */
var getContext2D = function (c) { return IO.of((0, exports.unsafeGetContext2D)(c)); };
exports.getContext2D = getContext2D;
/**
 * Gets the canvas width in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var getWidth = function (c) { return function () { return c.width; }; };
exports.getWidth = getWidth;
/**
 * Sets the width of the canvas in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var setWidth = function (w) { return function (c) { return function () {
    c.width = w;
    return c;
}; }; };
exports.setWidth = setWidth;
/**
 * Gets the canvas height in pixels.
 *
 *  @category combinators
 * @since 1.0.0
 */
var getHeight = function (c) { return function () { return c.height; }; };
exports.getHeight = getHeight;
/**
 * Sets the height of the canvas in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var setHeight = function (h) { return function (c) { return function () {
    c.height = h;
    return c;
}; }; };
exports.setHeight = setHeight;
/**
 * Gets the dimensions of the canvas in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var getDimensions = function (c) {
    return (0, Apply_1.sequenceS)(IO.io)({ height: (0, exports.getHeight)(c), width: (0, exports.getWidth)(c) });
};
exports.getDimensions = getDimensions;
/**
 * Sets the dimensions of the canvas in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var setDimensions = function (d) {
    return (0, function_1.pipe)((0, exports.setWidth)(d.width), R.chain(function () { return (0, exports.setHeight)(d.height); }));
};
exports.setDimensions = setDimensions;
/**
 * Create a data URL for the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var toDataURL = function (c) { return function () { return c.toDataURL(); }; };
exports.toDataURL = toDataURL;
/**
 * Sets the current fill style for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setFillStyle = function (s) { return function (ctx) { return function () {
    ctx.fillStyle = s;
    return ctx;
}; }; };
exports.setFillStyle = setFillStyle;
/**
 * Gets the current font.
 *
 * @category combinators
 * @since 1.0.0
 */
var getFont = function (ctx) { return function () { return ctx.font; }; };
exports.getFont = getFont;
/**
 * Sets the current font.
 *
 * @category combinators
 * @since 1.0.0
 */
var setFont = function (f) { return function (ctx) { return function () {
    ctx.font = f;
    return ctx;
}; }; };
exports.setFont = setFont;
/**
 * Sets the current global alpha for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setGlobalAlpha = function (a) { return function (ctx) { return function () {
    ctx.globalAlpha = a;
    return ctx;
}; }; };
exports.setGlobalAlpha = setGlobalAlpha;
/**
 * Sets the current global composite operation type for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setGlobalCompositeOperation = function (gco) { return function (ctx) { return function () {
    ctx.globalCompositeOperation = gco;
    return ctx;
}; }; };
exports.setGlobalCompositeOperation = setGlobalCompositeOperation;
/**
 * Sets the current image smoothing property for the canvas context. Determines whether scaled images are smoothed
 * (`true`, default) or not (`false`).
 *
 * @category combinators
 * @since 1.0.0
 */
var setImageSmoothingEnabled = function (v) { return function (ctx) { return function () {
    ctx.imageSmoothingEnabled = v;
    return ctx;
}; }; };
exports.setImageSmoothingEnabled = setImageSmoothingEnabled;
/**
 * Sets the current line cap type for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setLineCap = function (c) { return function (ctx) { return function () {
    ctx.lineCap = c;
    return ctx;
}; }; };
exports.setLineCap = setLineCap;
/**
 * Sets the current line dash offset, or "phase", for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setLineDashOffset = function (o) { return function (ctx) { return function () {
    ctx.lineDashOffset = o;
    return ctx;
}; }; };
exports.setLineDashOffset = setLineDashOffset;
/**
 * Sets the current line join type for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setLineJoin = function (j) { return function (ctx) { return function () {
    ctx.lineJoin = j;
    return ctx;
}; }; };
exports.setLineJoin = setLineJoin;
/**
 * Sets the current line width for the canvas context in pixels.
 *
 * @category combinators
 * @since 1.0.0
 */
var setLineWidth = function (w) { return function (ctx) { return function () {
    ctx.lineWidth = w;
    return ctx;
}; }; };
exports.setLineWidth = setLineWidth;
/**
 * Sets the current miter limit for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setMiterLimit = function (l) { return function (ctx) { return function () {
    ctx.miterLimit = l;
    return ctx;
}; }; };
exports.setMiterLimit = setMiterLimit;
/**
 * Sets the current shadow blur radius for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setShadowBlur = function (b) { return function (ctx) { return function () {
    ctx.shadowBlur = b;
    return ctx;
}; }; };
exports.setShadowBlur = setShadowBlur;
/**
 * Sets the current shadow color for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setShadowColor = function (c) { return function (ctx) { return function () {
    ctx.shadowColor = c;
    return ctx;
}; }; };
exports.setShadowColor = setShadowColor;
/**
 * Sets the current shadow x-offset for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setShadowOffsetX = function (ox) { return function (ctx) { return function () {
    ctx.shadowOffsetX = ox;
    return ctx;
}; }; };
exports.setShadowOffsetX = setShadowOffsetX;
/**
 * Sets the current shadow y-offset for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setShadowOffsetY = function (oy) { return function (ctx) { return function () {
    ctx.shadowOffsetY = oy;
    return ctx;
}; }; };
exports.setShadowOffsetY = setShadowOffsetY;
/**
 * Sets the current stroke style for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setStrokeStyle = function (s) { return function (ctx) { return function () {
    ctx.strokeStyle = s;
    return ctx;
}; }; };
exports.setStrokeStyle = setStrokeStyle;
/**
 * Gets the current text alignment.
 *
 * @category combinators
 * @since 1.0.0
 */
var getTextAlign = function (ctx) { return function () { return ctx.textAlign; }; };
exports.getTextAlign = getTextAlign;
/**
 * Sets the current text alignment.
 *
 * @category combinators
 * @since 1.0.0
 */
var setTextAlign = function (ta) { return function (ctx) { return function () {
    ctx.textAlign = ta;
    return ctx;
}; }; };
exports.setTextAlign = setTextAlign;
/**
 * Gets the current text baseline.
 *
 * @category combinators
 * @since 1.0.0
 */
var getTextBaseline = function (ctx) { return function () { return ctx.textBaseline; }; };
exports.getTextBaseline = getTextBaseline;
/**
 * Sets the current text baseline.
 *
 * @category combinators
 * @since 1.0.0
 */
var setTextBaseline = function (tb) { return function (ctx) { return function () {
    ctx.textBaseline = tb;
    return ctx;
}; }; };
exports.setTextBaseline = setTextBaseline;
/**
 * Begin a path on the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var beginPath = function (ctx) { return function () {
    ctx.beginPath();
    return ctx;
}; };
exports.beginPath = beginPath;
/**
 * Draw a cubic Bézier curve.
 *
 * @category combinators
 * @since 1.0.0
 */
var bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) { return function (ctx) { return function () {
    ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
    return ctx;
}; }; };
exports.bezierCurveTo = bezierCurveTo;
/**
 * Clip the current path on the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var clip = function (f, p) { return function (ctx) { return function () {
    if (typeof p !== 'undefined') {
        ctx.clip(p, f);
    }
    else if (typeof f !== 'undefined') {
        ctx.clip(f);
    }
    else {
        ctx.clip();
    }
    return ctx;
}; }; };
exports.clip = clip;
/**
 * Closes the current canvas path.
 *
 * @category combinators
 * @since 1.0.0
 */
var closePath = function (ctx) { return function () {
    ctx.closePath();
    return ctx;
}; };
exports.closePath = closePath;
/**
 * Gets `ImageData` for the specified rectangle.
 *
 * @category combinators
 * @since 1.0.0
 */
var createImageData = function (sw, sh) { return function (ctx) { return function () {
    return ctx.createImageData(sw, sh);
}; }; };
exports.createImageData = createImageData;
/**
 * Creates a copy of an existing `ImageData` object.
 *
 * @category combinators
 * @since 1.0.0
 */
var createImageDataCopy = function (data) { return function (ctx) { return function () {
    return ctx.createImageData(data);
}; }; };
exports.createImageDataCopy = createImageDataCopy;
/**
 * Creates a linear `CanvasGradient` object.
 *
 * @category combinators
 * @since 1.0.0
 */
var createLinearGradient = function (x0, y0, x1, y1) { return function (ctx) { return function () { return ctx.createLinearGradient(x0, y0, x1, y1); }; }; };
exports.createLinearGradient = createLinearGradient;
/**
 * Creates a new canvas pattern (repeatable image).
 *
 * @category combinators
 * @since 1.0.0
 */
var createPattern = function (s, r) { return function (ctx) { return function () { return O.fromNullable(ctx.createPattern(s, r)); }; }; };
exports.createPattern = createPattern;
/**
 * Creates a radial `CanvasGradient` object.
 *
 * @category combinators
 * @since 1.0.0
 */
var createRadialGradient = function (x0, y0, r0, x1, y1, r1) { return function (ctx) { return function () {
    return ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
}; }; };
exports.createRadialGradient = createRadialGradient;
/**
 * Draws a focus ring around the current or given path, if the specified element is focused.
 *
 * @category combinators
 * @since 1.0.0
 */
var drawFocusIfNeeded = function (el, p) { return function (ctx) { return function () {
    if (typeof p !== 'undefined') {
        ctx.drawFocusIfNeeded(p, el);
    }
    else {
        ctx.drawFocusIfNeeded(el);
    }
    return ctx;
}; }; };
exports.drawFocusIfNeeded = drawFocusIfNeeded;
/**
 * Render an image.
 *
 * @category combinators
 * @since 1.0.0
 */
var drawImage = function (s, ox, oy) { return function (ctx) { return function () {
    ctx.drawImage(s, ox, oy);
    return ctx;
}; }; };
exports.drawImage = drawImage;
/**
 * Draws an image to the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var drawImageScale = function (s, ox, oy, w, h) { return function (ctx) { return function () {
    ctx.drawImage(s, ox, oy, w, h);
    return ctx;
}; }; };
exports.drawImageScale = drawImageScale;
/**
 * Draws an image to the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var drawImageFull = function (s, ox, oy, w, h, cox, coy, ciw, cih) { return function (ctx) { return function () {
    ctx.drawImage(s, ox, oy, w, h, cox, coy, ciw, cih);
    return ctx;
}; }; };
exports.drawImageFull = drawImageFull;
/**
 * Fill the current path on the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var fill = function (f, p) { return function (ctx) { return function () {
    if (typeof p !== 'undefined') {
        ctx.fill(p, f);
    }
    else if (typeof f !== 'undefined') {
        ctx.fill(f);
    }
    else {
        ctx.fill();
    }
    return ctx;
}; }; };
exports.fill = fill;
/**
 * Render filled text.
 *
 * @category combinators
 * @since 1.0.0
 */
var fillText = function (t, x, y, mw) { return function (ctx) { return function () {
    if (typeof mw !== 'undefined') {
        ctx.fillText(t, x, y, mw);
    }
    else {
        ctx.fillText(t, x, y);
    }
    return ctx;
}; }; };
exports.fillText = fillText;
/**
 * Gets the current line dash pattern for the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var getLineDash = function (ctx) { return function () { return RA.fromArray(ctx.getLineDash()); }; };
exports.getLineDash = getLineDash;
/**
 * Gets the current transformation matrix being applied to the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var getTransform = function (ctx) { return function () { return ctx.getTransform(); }; };
exports.getTransform = getTransform;
/**
 * Move the canvas path to the specified point while drawing a line segment.
 *
 * @category combinators
 * @since 1.0.0
 */
var lineTo = function (p) { return function (ctx) { return function () {
    ctx.lineTo(p[0], p[1]);
    return ctx;
}; }; };
exports.lineTo = lineTo;
/**
 * Move the canvas path to the specified point without drawing a line segment.
 *
 * @category combinators
 * @since 1.0.0
 */
var moveTo = function (p) { return function (ctx) { return function () {
    ctx.moveTo(p[0], p[1]);
    return ctx;
}; }; };
exports.moveTo = moveTo;
/**
 * Sets the image data for the specified portion of the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var putImageData = function (data, dx, dy) { return function (ctx) { return function () {
    ctx.putImageData(data, dx, dy);
    return ctx;
}; }; };
exports.putImageData = putImageData;
/**
 * Sets the image data for the specified portion of the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var putImageDataFull = function (data, dx, dy, dirtyX, dirtyY, dirtyW, dirtyH) { return function (ctx) { return function () {
    ctx.putImageData(data, dx, dy, dirtyX, dirtyY, dirtyW, dirtyH);
    return ctx;
}; }; };
exports.putImageDataFull = putImageDataFull;
/**
 * Draws a quadratic Bézier curve.
 *
 * @category combinators
 * @since 1.0.0
 */
var quadraticCurveTo = function (cpx, cpy, x, y) { return function (ctx) { return function () {
    ctx.quadraticCurveTo(cpx, cpy, x, y);
    return ctx;
}; }; };
exports.quadraticCurveTo = quadraticCurveTo;
/**
 * Restore the previous canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var restore = function (ctx) { return function () {
    ctx.restore();
    return ctx;
}; };
exports.restore = restore;
/**
 * Apply rotation to the current canvas context transform.
 *
 * @category combinators
 * @since 1.0.0
 */
var rotate = function (a) { return function (ctx) { return function () {
    ctx.rotate(a);
    return ctx;
}; }; };
exports.rotate = rotate;
/**
 * Save the current canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var save = function (ctx) { return function () {
    ctx.save();
    return ctx;
}; };
exports.save = save;
/**
 * Apply scale to the current canvas context transform.
 *
 * @category combinators
 * @since 1.0.0
 */
var scale = function (x, y) { return function (ctx) { return function () {
    ctx.scale(x, y);
    return ctx;
}; }; };
exports.scale = scale;
/**
 * Sets the current line dash pattern used when stroking lines.
 *
 * @category combinators
 * @since 1.0.0
 */
var setLineDash = function (ss) { return function (ctx) { return function () {
    ctx.setLineDash(RA.toArray(ss));
    return ctx;
}; }; };
exports.setLineDash = setLineDash;
/**
 * Resets the current transformation to the identity matrix, and then applies the transform specified
 * to the current canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setTransform = function (a, b, c, d, e, f) { return function (ctx) { return function () {
    ctx.setTransform(a, b, c, d, e, f);
    return ctx;
}; }; };
exports.setTransform = setTransform;
/**
 * Resets the current transformation to the identity matrix, and then applies the transform specified
 * to the current canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var setTransformMatrix = function (matrix) { return function (ctx) { return function () {
    ctx.setTransform(matrix);
    return ctx;
}; }; };
exports.setTransformMatrix = setTransformMatrix;
/**
 * Stroke the current path on the canvas.
 *
 * @category combinators
 * @since 1.0.0
 */
var stroke = function (p) { return function (ctx) { return function () {
    if (typeof p !== 'undefined') {
        ctx.stroke(p);
    }
    else {
        ctx.stroke();
    }
    return ctx;
}; }; };
exports.stroke = stroke;
/**
 * Render stroked text.
 *
 * @category combinators
 * @since 1.0.0
 */
var strokeText = function (t, x, y, mw) { return function (ctx) { return function () {
    if (typeof mw !== 'undefined') {
        ctx.strokeText(t, x, y, mw);
    }
    else {
        ctx.strokeText(t, x, y);
    }
    return ctx;
}; }; };
exports.strokeText = strokeText;
/**
 * Apply the specified transformation matrix to the canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var transform = function (m11, m12, m21, m22, m31, m32) { return function (ctx) { return function () {
    ctx.transform(m11, m12, m21, m22, m31, m32);
    return ctx;
}; }; };
exports.transform = transform;
/**
 * Translate the current canvas context transform.
 *
 * @category combinators
 * @since 1.0.0
 */
var translate = function (x, y) { return function (ctx) { return function () {
    ctx.translate(x, y);
    return ctx;
}; }; };
exports.translate = translate;
/**
 * Add a single color stop to a `CanvasGradient` object.
 *
 * @category combinators
 * @since 1.0.0
 */
var addColorStop = function (o, c) { return function (g) { return function () {
    g.addColorStop(o, c);
    return g;
}; }; };
exports.addColorStop = addColorStop;
/**
 * Convenience function for drawing a filled path.
 *
 * @category combinators
 * @since 1.0.0
 */
var fillPath = function (f) {
    return (0, function_1.pipe)(exports.beginPath, R.chain(function () { return f; }), R.chainFirst(function () { return (0, exports.fill)(); }));
};
exports.fillPath = fillPath;
/**
 * Convenience function for drawing a stroked path.
 *
 * @category combinators
 * @since 1.0.0
 */
var strokePath = function (f) {
    return (0, function_1.pipe)(exports.beginPath, R.chain(function () { return f; }), R.chainFirst(function () { return (0, exports.stroke)(); }));
};
exports.strokePath = strokePath;
/**
 * A convenience function which allows for running an action while preserving the existing
 * canvas context.
 *
 * @category combinators
 * @since 1.0.0
 */
var withContext = function (f) {
    return (0, function_1.pipe)(exports.save, R.chain(function () { return f; }), R.chainFirst(function () { return exports.restore; }));
};
exports.withContext = withContext;
// TODO: remove in version 2.0.0
/**
 * Binds an event handler to the canvas element.
 *
 * @deprecated since 1.1.0
 * @category combinators
 * @since 1.0.0
 */
var bind = function (t, f) { return function (c) { return function () {
    c.addEventListener(t, f);
    return c;
}; }; };
exports.bind = bind;
// TODO: rename in version 2.0.0
/**
 * Binds an event handler to the canvas element.
 *
 * @category combinators
 * @since 1.1.0
 */
var bindWithContext = function (type, f) {
    return function (ctx) {
        return function () {
            ctx.canvas.addEventListener(type, function (e) { return f(e)(ctx)(); });
            return ctx;
        };
    };
};
exports.bindWithContext = bindWithContext;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Executes a `Render` effect for a canvas with the specified `canvasId`, or `onCanvasNotFound()` if a canvas with
 * the specified `canvasId` does not exist.
 *
 * @since 1.0.0
 */
var renderTo = function (canvasId, onCanvasNotFound) {
    return function (r) {
        return (0, function_1.pipe)((0, exports.getCanvasElementById)(canvasId), IO.chain(O.fold(onCanvasNotFound, (0, function_1.flow)(exports.getContext2D, IO.chain(r)))));
    };
};
exports.renderTo = renderTo;


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Color.js":
/*!****************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Color.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * @since 0.0.1
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCss = exports.white = exports.black = exports.hsl = exports.hsla = exports.hex = void 0;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a `Color` using a hexadecimal value.
 *
 * @category constructors
 * @since 0.0.1
 */
var hex = function (value) { return ({ _tag: 'Hex', value: value }); };
exports.hex = hex;
/**
 * Constructs a `Color` using the specified hue, saturation, lightness, and alpha.
 *
 * @category constructors
 * @since 0.0.1
 */
var hsla = function (h, s, l, a) { return ({
    _tag: 'Hsla',
    h: h,
    s: s,
    l: l,
    a: a,
}); };
exports.hsla = hsla;
/**
 * Constructs a fully opaque `Color` using the specified hue, saturation, and lightness.
 *
 * @category constructors
 * @since 0.0.1
 */
var hsl = function (h, s, l) { return (0, exports.hsla)(h, s, l, 1); };
exports.hsl = hsl;
/**
 * @category constructors
 * @since 0.0.1
 */
exports.black = (0, exports.hsl)(0, 0, 0);
/**
 * @category constructors
 * @since 0.0.1
 */
exports.white = (0, exports.hsl)(360, 1, 1);
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Converts a `Color` into a valid CSS string.
 *
 * @category destructors
 * @since 0.0.1
 */
var toCss = function (c) {
    switch (c._tag) {
        case 'Hex':
            return c.value;
        case 'Hsla': {
            var h = c.h, s = c.s, l = c.l, a = c.a;
            var toString_1 = function (n) { return Math.round(n * 100.0) / 100; };
            var hue = toString_1(h);
            var saturation = toString_1(s * 100.0) + '%';
            var lightness = toString_1(l * 100.0) + '%';
            var alpha = String(a);
            return a === 1
                ? "hsl(".concat(hue, ", ").concat(saturation, ", ").concat(lightness, ")")
                : "hsla(".concat(hue, ", ").concat(saturation, ", ").concat(lightness, ", ").concat(alpha, ")");
        }
    }
};
exports.toCss = toCss;


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Drawing.js":
/*!******************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Drawing.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = exports.renderSubPath = exports.renderShape = exports.monoidDrawing = exports.monoidOutlineStyle = exports.monoidFillStyle = exports.outline = exports.fillStyle = exports.fill = exports.clipped = exports.lineJoin = exports.lineCap = exports.lineWidth = exports.outlineColor = exports.many = exports.scale = exports.rotate = exports.translate = void 0;
var O = __importStar(__webpack_require__(/*! fp-ts/Option */ "./node_modules/fp-ts/es6/Option.js"));
var IO = __importStar(__webpack_require__(/*! fp-ts/IO */ "./node_modules/fp-ts/es6/IO.js"));
var RA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js"));
var function_1 = __webpack_require__(/*! fp-ts/lib/function */ "./node_modules/fp-ts/lib/function.js");
var RIO = __importStar(__webpack_require__(/*! fp-ts/ReaderIO */ "./node_modules/fp-ts/es6/ReaderIO.js"));
var M = __importStar(__webpack_require__(/*! fp-ts/Monoid */ "./node_modules/fp-ts/es6/Monoid.js"));
var Semigroup_1 = __webpack_require__(/*! fp-ts/lib/Semigroup */ "./node_modules/fp-ts/lib/Semigroup.js");
var RNEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var Mat = __importStar(__webpack_require__(/*! ./Mat */ "./node_modules/@onur1/drawing3d/lib/Mat.js"));
var C = __importStar(__webpack_require__(/*! ./Canvas */ "./node_modules/@onur1/drawing3d/lib/Canvas.js"));
var Color_1 = __webpack_require__(/*! ./Color */ "./node_modules/@onur1/drawing3d/lib/Color.js");
var Shape_1 = __webpack_require__(/*! ./Shape */ "./node_modules/@onur1/drawing3d/lib/Shape.js");
var Path3D_1 = __webpack_require__(/*! ./Path3D */ "./node_modules/@onur1/drawing3d/lib/Path3D.js");
var traverseReaderIO = RA.Traversable.traverse(RIO.Applicative);
var translate = function (translateX, translateY, translateZ, drawing) { return ({
    _tag: 'Translate',
    translateX: translateX,
    translateY: translateY,
    translateZ: translateZ,
    drawing: drawing,
}); };
exports.translate = translate;
var rotate = function (rotateX, rotateY, rotateZ, drawing) { return ({
    _tag: 'Rotate',
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    drawing: drawing,
}); };
exports.rotate = rotate;
var scale = function (scaleX, scaleY, scaleZ, drawing) { return ({
    _tag: 'Scale',
    scaleX: scaleX,
    scaleY: scaleY,
    scaleZ: scaleZ,
    drawing: drawing,
}); };
exports.scale = scale;
var many = function (drawings) { return ({
    _tag: 'Many',
    drawings: drawings,
}); };
exports.many = many;
var outlineColor = function (c) { return ({
    color: O.some(c),
    lineWidth: O.none,
    lineCap: O.none,
    lineJoin: O.none,
}); };
exports.outlineColor = outlineColor;
var lineWidth = function (w) { return ({
    color: O.none,
    lineWidth: O.some(w),
    lineCap: O.none,
    lineJoin: O.none,
}); };
exports.lineWidth = lineWidth;
var lineCap = function (w) { return ({
    color: O.none,
    lineCap: O.some(w),
    lineWidth: O.none,
    lineJoin: O.none,
}); };
exports.lineCap = lineCap;
var lineJoin = function (w) { return ({
    color: O.none,
    lineJoin: O.some(w),
    lineWidth: O.none,
    lineCap: O.none,
}); };
exports.lineJoin = lineJoin;
var clipped = function (shape, drawing) { return ({
    _tag: 'Clipped',
    shape: shape,
    drawing: drawing,
}); };
exports.clipped = clipped;
var fill = function (shape, style) { return ({
    _tag: 'Fill',
    shape: shape,
    style: style,
}); };
exports.fill = fill;
var fillStyle = function (c) { return ({ color: O.some(c) }); };
exports.fillStyle = fillStyle;
var outline = function (shape, style) { return ({
    _tag: 'Outline',
    shape: shape,
    style: style,
}); };
exports.outline = outline;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var readonlyArrayMonoidDrawing = RA.getMonoid();
var getFirstMonoidColor = O.getMonoid((0, Semigroup_1.first)());
var getFirstMonoidLineCap = O.getMonoid((0, Semigroup_1.first)());
var getFirstMonoidLineJoin = O.getMonoid((0, Semigroup_1.first)());
var getFirstMonoidNumber = O.getMonoid((0, Semigroup_1.first)());
exports.monoidFillStyle = M.struct({
    color: getFirstMonoidColor,
});
exports.monoidOutlineStyle = M.struct({
    color: getFirstMonoidColor,
    lineWidth: getFirstMonoidNumber,
    lineCap: getFirstMonoidLineCap,
    lineJoin: getFirstMonoidLineJoin,
});
exports.monoidDrawing = {
    concat: function (x, y) {
        return x._tag === 'Many' && y._tag === 'Many'
            ? (0, exports.many)(M.concatAll(readonlyArrayMonoidDrawing)([x.drawings, y.drawings]))
            : x._tag === 'Many'
                ? (0, exports.many)(M.concatAll(readonlyArrayMonoidDrawing)([x.drawings, [y]]))
                : y._tag === 'Many'
                    ? (0, exports.many)(M.concatAll(readonlyArrayMonoidDrawing)([[x], y.drawings]))
                    : (0, exports.many)([x, y]);
    },
    empty: (0, exports.many)(readonlyArrayMonoidDrawing.empty),
};
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
var renderShape = function (shape) {
    switch (shape._tag) {
        case 'Composite':
            return RA.Foldable.reduce(shape.shapes, [], function (b, a) { return b.concat((0, exports.renderShape)(a)); });
        case 'Path':
            return (0, function_1.pipe)(shape.points, RA.foldLeft(function () { return RA.empty; }, function (head, tail) {
                return (0, function_1.pipe)(tail, RA.map(Path3D_1.lineTo), RA.reduce((0, Path3D_1.moveTo)(head)([]), function (a, f) { return f(a); }), function (path) { return (shape.closed ? (0, Path3D_1.closePath)(path).slice(0, -1) : path); });
            }));
    }
};
exports.renderShape = renderShape;
var applyStyle = function (fa, f) {
    return (0, function_1.pipe)(fa, O.fold(function () { return IO.of; }, f));
};
// Hardcoded parallel projection matrix
var VT = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
];
exports.renderSubPath = (0, function_1.pipe)(RA.foldLeft(function () { return IO.of; }, function (head, tail) {
    return (0, function_1.pipe)(C.moveTo(head), RIO.chain(function () { return traverseReaderIO(tail, C.lineTo); }), RIO.chain(function () { return IO.of; }));
}));
var toCoords = function (shape, transform) {
    return (0, function_1.pipe)((0, exports.renderShape)(shape), RA.map(RNEA.fromReadonlyArray), RA.compact, RA.map(RNEA.map(RA.append(1))), RA.map(Mat.mul(transform)), RA.map(Mat.mul(VT)));
};
var render = function (drawing) {
    var go = function (t) { return function (d) {
        switch (d._tag) {
            case 'Many':
                return (0, function_1.pipe)(traverseReaderIO(d.drawings, go(t)), RIO.chain(function () { return RIO.ask(); }));
            case 'Scale':
                return go(Mat.mul(Mat.scale([d.scaleX, d.scaleY, d.scaleZ]))(t))(d.drawing);
            case 'Rotate':
                return go(Mat.semigroupMat.concat(Mat.mul(Mat.rotateX((0, Shape_1.angle)(d.rotateX)))(Mat.rotateY((0, Shape_1.angle)(d.rotateY))), Mat.mul(Mat.rotateZ((0, Shape_1.angle)(d.rotateZ)))(t)))(d.drawing);
            case 'Translate':
                return go(Mat.mul(Mat.translate([d.translateX, d.translateY, d.translateZ]))(t))(d.drawing);
            case 'Outline':
                return C.withContext((0, function_1.pipe)(applyStyle(d.style.color, (0, function_1.flow)(Color_1.toCss, C.setStrokeStyle)), RIO.chain(function () { return applyStyle(d.style.lineWidth, C.setLineWidth); }), RIO.chain(function () { return applyStyle(d.style.lineCap, C.setLineCap); }), RIO.chain(function () { return applyStyle(d.style.lineJoin, C.setLineJoin); }), RIO.chain(function () {
                    return (0, function_1.pipe)(C.beginPath, RIO.chain(function () { return traverseReaderIO(toCoords(d.shape, t), exports.renderSubPath); }), RIO.chainFirst(function () { return C.stroke(); }));
                }), RIO.chain(function () { return RIO.ask(); })));
            case 'Fill':
                return C.withContext((0, function_1.pipe)(applyStyle(d.style.color, (0, function_1.flow)(Color_1.toCss, C.setFillStyle)), RIO.chain(function () {
                    return (0, function_1.pipe)(C.beginPath, RIO.chain(function () { return traverseReaderIO(toCoords(d.shape, t), exports.renderSubPath); }), RIO.chainFirst(function () { return C.fill(); }));
                }), RIO.chain(function () { return RIO.ask(); })));
            case 'Clipped':
                return C.withContext((0, function_1.pipe)(C.beginPath, RIO.chain(function () { return traverseReaderIO(toCoords(d.shape, t), exports.renderSubPath); }), RIO.chain(function () { return C.clip(); }), RIO.chain(function () { return go(t)(d.drawing); })));
        }
    }; };
    return go(Mat.identity)(drawing);
};
exports.render = render;


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Mat.js":
/*!**************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Mat.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.row = exports.concatAll = exports.monoidMat = exports.identity = exports.semigroupMat = exports.mul = exports.axonometric = exports.rotateZ = exports.rotateY = exports.rotateX = exports.scale = exports.translate = exports.transpose = void 0;
var RNEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var function_1 = __webpack_require__(/*! fp-ts/function */ "./node_modules/fp-ts/es6/function.js");
var Monoid_1 = __webpack_require__(/*! fp-ts/lib/Monoid */ "./node_modules/fp-ts/lib/Monoid.js");
var Vec_1 = __webpack_require__(/*! ./Vec */ "./node_modules/@onur1/drawing3d/lib/Vec.js");
var map = RNEA.Functor.map;
var sin = function (deg) { return Math.sin((deg * Math.PI) / 180.0); };
var cos = function (deg) { return Math.cos((deg * Math.PI) / 180.0); };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
var transpose = function (fa) { return (0, function_1.pipe)(RNEA.head(fa), RNEA.mapWithIndex((0, function_1.flow)(exports.row, (0, function_1.apply)(fa)))); };
exports.transpose = transpose;
var translate = function (v) { return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [v[0], v[1], v[2], 1],
]; };
exports.translate = translate;
var scale = function (v) { return [
    [v[0], 0, 0, 0],
    [0, v[1], 0, 0],
    [0, 0, v[2], 0],
    [0, 0, 0, 1],
]; };
exports.scale = scale;
var rotateX = function (angle) { return [
    [1, 0, 0, 0],
    [0, cos(angle), sin(angle), 0],
    [0, -sin(angle), cos(angle), 0],
    [0, 0, 0, 1],
]; };
exports.rotateX = rotateX;
var rotateY = function (angle) { return [
    [cos(angle), 0, -sin(angle), 0],
    [0, 1, 0, 0],
    [sin(angle), 0, cos(angle), 0],
    [0, 0, 0, 1],
]; };
exports.rotateY = rotateY;
var rotateZ = function (angle) { return [
    [cos(angle), sin(angle), 0, 0],
    [-sin(angle), cos(angle), 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
]; };
exports.rotateZ = rotateZ;
var axonometric = function (phi, theta) { return [
    [cos(phi), sin(phi) * sin(theta), -sin(phi) * cos(theta), 0],
    [0, cos(theta), sin(theta), 0],
    [sin(phi), -cos(phi) * sin(theta), cos(phi) * cos(theta), 0],
    [0, 0, 0, 1],
]; };
exports.axonometric = axonometric;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
var mul = function (fb) {
    return function (fa) {
        return exports.semigroupMat.concat(fa, fb);
    };
};
exports.mul = mul;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
exports.semigroupMat = {
    concat: function (x, y) { return (0, function_1.pipe)(map((0, exports.transpose)(y), Vec_1.dot), function (fab) { return map(x, function (ar) { return map(fab, function (f) { return f(ar); }); }); }); },
};
exports.identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
];
exports.monoidMat = {
    concat: exports.semigroupMat.concat,
    empty: exports.identity,
};
exports.concatAll = (0, Monoid_1.concatAll)(exports.monoidMat);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
exports.row = (0, function_1.flow)(Vec_1.at, RNEA.map);


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Path3D.js":
/*!*****************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Path3D.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.closePath = exports.lineTo = exports.moveTo = void 0;
var NEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var RA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js"));
var function_1 = __webpack_require__(/*! fp-ts/lib/function */ "./node_modules/fp-ts/lib/function.js");
var isPointFinite = function (point) { return isFinite(point[0]) && isFinite(point[1]) && isFinite(point[2]); };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
var moveTo = function (point) {
    return function (path) {
        return isPointFinite(point)
            ? // create a new subpath with the specified point
                RA.snoc(path, [point])
            : path;
    };
};
exports.moveTo = moveTo;
var lineTo = function (point) {
    return function (path) {
        return isPointFinite(point)
            ? RA.isNonEmpty(path)
                ? // connect the last point in the subpath to the given point
                    (0, function_1.pipe)(path, NEA.modifyLast(function (cur) { return RA.append(point)(cur); }))
                : // if path has no subpaths, ensure there is a subpath
                    (0, exports.moveTo)(point)(path)
            : path;
    };
};
exports.lineTo = lineTo;
var closePath = function (path) {
    // do nothing if path has no subpaths
    if (!RA.isNonEmpty(path)) {
        return path;
    }
    var cur = NEA.last(path);
    // do nothing if the last path contains a single point
    if (!(RA.isNonEmpty(cur) && cur.length > 1)) {
        return path;
    }
    var end = NEA.last(cur);
    var start = cur[0];
    // do nothing if both ends are the same point
    if (end[0] === start[0] && end[1] === start[1] && end[2] === start[2]) {
        return path;
    }
    // mark the last path as closed adding a new subpath whose first point
    // is the same as the previous subpath's first point
    return NEA.snoc(NEA.updateLast(RA.snoc(cur, start))(path), [start]);
};
exports.closePath = closePath;


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Shape.js":
/*!****************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Shape.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.monoidPath = exports.path = exports.closed = exports.composite = exports.angle = exports.point = exports.radians = exports.degrees = void 0;
var RA = __importStar(__webpack_require__(/*! fp-ts/lib/ReadonlyArray */ "./node_modules/fp-ts/lib/ReadonlyArray.js"));
var M = __importStar(__webpack_require__(/*! fp-ts/lib/Monoid */ "./node_modules/fp-ts/lib/Monoid.js"));
var boolean_1 = __webpack_require__(/*! fp-ts/lib/boolean */ "./node_modules/fp-ts/lib/boolean.js");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
var degrees = function (degrees) { return ({ _tag: 'Degrees', degrees: degrees }); };
exports.degrees = degrees;
var radians = function (radians) { return ({ _tag: 'Radians', radians: radians }); };
exports.radians = radians;
var point = function (x, y, z) { return [x, y, z]; };
exports.point = point;
var angle = function (angle) {
    switch (angle._tag) {
        case 'Radians':
            return angle.radians * (180 / Math.PI);
        case 'Degrees':
            return angle.degrees;
    }
};
exports.angle = angle;
var composite = function (shapes) { return ({
    _tag: 'Composite',
    shapes: shapes,
}); };
exports.composite = composite;
function closed(F) {
    return function (fa) {
        return F.reduce(fa, exports.monoidPath.empty, function (b, a) { return ({
            _tag: 'Path',
            closed: true,
            points: RA.append(a)(b.points),
        }); });
    };
}
exports.closed = closed;
function path(F) {
    return function (fa) {
        return F.reduce(fa, exports.monoidPath.empty, function (b, a) { return ({
            _tag: 'Path',
            closed: false,
            points: RA.append(a)(b.points),
        }); });
    };
}
exports.path = path;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
exports.monoidPath = M.struct({
    _tag: { concat: function () { return 'Path'; }, empty: 'Path' },
    closed: boolean_1.MonoidAny,
    points: RA.getMonoid(),
});


/***/ }),

/***/ "./node_modules/@onur1/drawing3d/lib/Vec.js":
/*!**************************************************!*\
  !*** ./node_modules/@onur1/drawing3d/lib/Vec.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.at = exports.dot = void 0;
var RNEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var function_1 = __webpack_require__(/*! fp-ts/function */ "./node_modules/fp-ts/es6/function.js");
var number_1 = __webpack_require__(/*! fp-ts/number */ "./node_modules/fp-ts/es6/number.js");
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
var dot = function (fb) {
    return function (fa) {
        return (0, function_1.pipe)(RNEA.zipWith(fa, fb, number_1.Field.mul), RNEA.reduce(0, number_1.Field.add));
    };
};
exports.dot = dot;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
var at = function (i) { return function (v) { return v[i]; }; };
exports.at = at;


/***/ }),

/***/ "./node_modules/fp-ts/es6/Applicative.js":
/*!***********************************************!*\
  !*** ./node_modules/fp-ts/es6/Applicative.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getApplicativeComposition": () => (/* binding */ getApplicativeComposition),
/* harmony export */   "getApplicativeMonoid": () => (/* binding */ getApplicativeMonoid)
/* harmony export */ });
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 2.0.0
 */



function getApplicativeMonoid(F) {
    var f = (0,_Apply__WEBPACK_IMPORTED_MODULE_0__.getApplySemigroup)(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}
/** @deprecated */
function getApplicativeComposition(F, G) {
    var map = (0,_Functor__WEBPACK_IMPORTED_MODULE_1__.getFunctorComposition)(F, G).map;
    var _ap = (0,_Apply__WEBPACK_IMPORTED_MODULE_0__.ap)(F, G);
    return {
        map: map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fgab, _ap(fga)); }
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Apply.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/es6/Apply.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "getApplySemigroup": () => (/* binding */ getApplySemigroup),
/* harmony export */   "sequenceS": () => (/* binding */ sequenceS),
/* harmony export */   "sequenceT": () => (/* binding */ sequenceT)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
 * const fa: O.Option<string> = O.some('s')
 * const fb: O.Option<number> = O.some(1)
 * const fc: O.Option<boolean> = O.some(true)
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     // lift a function
 *     O.some(f),
 *     // apply the first argument
 *     O.ap(fa),
 *     // apply the second argument
 *     O.ap(fb),
 *     // apply the third argument
 *     O.ap(fc)
 *   ),
 *   O.some('s1true')
 * )
 *
 * @since 2.0.0
 */


function ap(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
function apSecond(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
function apS(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!_internal__WEBPACK_IMPORTED_MODULE_0__.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(_function__WEBPACK_IMPORTED_MODULE_1__.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Chain.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/es6/Chain.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst)
/* harmony export */ });
function chainFirst(M) {
    return function (f) { return function (first) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); }; };
}
function bind(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/ChainRec.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/ChainRec.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tailRec": () => (/* binding */ tailRec)
/* harmony export */ });
/**
 * @since 2.0.0
 */
var tailRec = function (startWith, f) {
    var ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Either.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Either.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "ApT": () => (/* binding */ ApT),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Bifunctor": () => (/* binding */ Bifunctor),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "ChainRec": () => (/* binding */ ChainRec),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FromEither": () => (/* binding */ FromEither),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "MonadThrow": () => (/* binding */ MonadThrow),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apFirstW": () => (/* binding */ apFirstW),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSW": () => (/* binding */ apSW),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "apSecondW": () => (/* binding */ apSecondW),
/* harmony export */   "apW": () => (/* binding */ apW),
/* harmony export */   "bimap": () => (/* binding */ bimap),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bindW": () => (/* binding */ bindW),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainFirstW": () => (/* binding */ chainFirstW),
/* harmony export */   "chainNullableK": () => (/* binding */ chainNullableK),
/* harmony export */   "chainOptionK": () => (/* binding */ chainOptionK),
/* harmony export */   "chainOptionKW": () => (/* binding */ chainOptionKW),
/* harmony export */   "chainW": () => (/* binding */ chainW),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "either": () => (/* binding */ either),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "filterOrElse": () => (/* binding */ filterOrElse),
/* harmony export */   "filterOrElseW": () => (/* binding */ filterOrElseW),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "flattenW": () => (/* binding */ flattenW),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "foldW": () => (/* binding */ foldW),
/* harmony export */   "fromNullable": () => (/* binding */ fromNullable),
/* harmony export */   "fromNullableK": () => (/* binding */ fromNullableK),
/* harmony export */   "fromOption": () => (/* binding */ fromOption),
/* harmony export */   "fromOptionK": () => (/* binding */ fromOptionK),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate),
/* harmony export */   "getAltValidation": () => (/* binding */ getAltValidation),
/* harmony export */   "getApplicativeValidation": () => (/* binding */ getApplicativeValidation),
/* harmony export */   "getApplyMonoid": () => (/* binding */ getApplyMonoid),
/* harmony export */   "getApplySemigroup": () => (/* binding */ getApplySemigroup),
/* harmony export */   "getCompactable": () => (/* binding */ getCompactable),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getFilterable": () => (/* binding */ getFilterable),
/* harmony export */   "getOrElse": () => (/* binding */ getOrElse),
/* harmony export */   "getOrElseW": () => (/* binding */ getOrElseW),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getValidation": () => (/* binding */ getValidation),
/* harmony export */   "getValidationMonoid": () => (/* binding */ getValidationMonoid),
/* harmony export */   "getValidationSemigroup": () => (/* binding */ getValidationSemigroup),
/* harmony export */   "getWitherable": () => (/* binding */ getWitherable),
/* harmony export */   "isLeft": () => (/* binding */ isLeft),
/* harmony export */   "isRight": () => (/* binding */ isRight),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapLeft": () => (/* binding */ mapLeft),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "matchW": () => (/* binding */ matchW),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "orElse": () => (/* binding */ orElse),
/* harmony export */   "orElseW": () => (/* binding */ orElseW),
/* harmony export */   "parseJSON": () => (/* binding */ parseJSON),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray),
/* harmony export */   "stringifyJSON": () => (/* binding */ stringifyJSON),
/* harmony export */   "swap": () => (/* binding */ swap),
/* harmony export */   "throwError": () => (/* binding */ throwError),
/* harmony export */   "toError": () => (/* binding */ toError),
/* harmony export */   "toUnion": () => (/* binding */ toUnion),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseReadonlyArrayWithIndex": () => (/* binding */ traverseReadonlyArrayWithIndex),
/* harmony export */   "traverseReadonlyNonEmptyArrayWithIndex": () => (/* binding */ traverseReadonlyNonEmptyArrayWithIndex),
/* harmony export */   "tryCatch": () => (/* binding */ tryCatch),
/* harmony export */   "tryCatchK": () => (/* binding */ tryCatchK)
/* harmony export */ });
/* harmony import */ var _Applicative__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Applicative */ "./node_modules/fp-ts/es6/Applicative.js");
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _ChainRec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChainRec */ "./node_modules/fp-ts/es6/ChainRec.js");
/* harmony import */ var _FromEither__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FromEither */ "./node_modules/fp-ts/es6/FromEither.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _Separated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Separated */ "./node_modules/fp-ts/es6/Separated.js");
/* harmony import */ var _Witherable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Witherable */ "./node_modules/fp-ts/es6/Witherable.js");










// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var left = _internal__WEBPACK_IMPORTED_MODULE_0__.left;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right = _internal__WEBPACK_IMPORTED_MODULE_0__.right;
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_1__.dual)(2, function (ma, f) { return (isLeft(ma) ? ma : f(ma.right)); });
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, map(f)); };
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fab, ap(fa)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) { return function (fa, f) {
    var foldMapM = foldMap(M);
    return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, foldMapM(f));
}; };
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(ta, traverseF(f)); };
};
var _bimap = function (fa, f, g) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, bimap(f, g)); };
var _mapLeft = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, mapLeft(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, alt(that)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(wa, extend(f)); };
var _chainRec = function (a, f) {
    return (0,_ChainRec__WEBPACK_IMPORTED_MODULE_2__.tailRec)(f(a), function (e) {
        return isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right));
    });
};
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = function (SE, SA) { return ({
    show: function (ma) { return (isLeft(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")")); }
}); };
/**
 * @category instances
 * @since 2.0.0
 */
var getEq = function (EL, EA) { return ({
    equals: function (x, y) {
        return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
    }
}); };
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const S = getSemigroup<string, number>(SemigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function (S) { return ({
    concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
}); };
/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category filtering
 * @since 2.10.0
 */
var getCompactable = function (M) {
    var empty = left(M.empty);
    return {
        URI: URI,
        _E: undefined,
        compact: function (ma) { return (isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value)); },
        separate: function (ma) {
            return isLeft(ma)
                ? (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(ma, ma)
                : isLeft(ma.right)
                    ? (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(right(ma.right.left), empty)
                    : (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(empty, right(ma.right.right));
        }
    };
};
/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.10.0
 */
var getFilterable = function (M) {
    var empty = left(M.empty);
    var _a = getCompactable(M), compact = _a.compact, separate = _a.separate;
    var filter = function (ma, predicate) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
    };
    var partition = function (ma, p) {
        return isLeft(ma)
            ? (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(ma, ma)
            : p(ma.right)
                ? (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(empty, right(ma.right))
                : (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(right(ma.right), empty);
    };
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: function (ma, f) {
            if (isLeft(ma)) {
                return ma;
            }
            var ob = f(ma.right);
            return ob._tag === 'None' ? empty : right(ob.value);
        },
        partition: partition,
        partitionMap: function (ma, f) {
            if (isLeft(ma)) {
                return (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(ma, ma);
            }
            var e = f(ma.right);
            return isLeft(e) ? (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(right(e.left), empty) : (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(empty, right(e.right));
        }
    };
};
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.0.0
 */
var getWitherable = function (M) {
    var F_ = getFilterable(M);
    var C = getCompactable(M);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: (0,_Witherable__WEBPACK_IMPORTED_MODULE_4__.witherDefault)(Traversable, C),
        wilt: (0,_Witherable__WEBPACK_IMPORTED_MODULE_4__.wiltDefault)(Traversable, C)
    };
};
/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * @example
 * import * as A from 'fp-ts/Apply'
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const parsePerson = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     E.apS('name', parseString(input.name)),
 *     E.apS('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error
 *
 * const Applicative = E.getApplicativeValidation(
 *   pipe(string.Semigroup, S.intercalate(', '))
 * )
 *
 * const apS = A.apS(Applicative)
 *
 * const parsePersonAll = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     apS('name', parseString(input.name)),
 *     apS('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
 *
 * @category error handling
 * @since 2.7.0
 */
var getApplicativeValidation = function (SE) { return ({
    URI: URI,
    _E: undefined,
    map: _map,
    ap: function (fab, fa) {
        return isLeft(fab)
            ? isLeft(fa)
                ? left(SE.concat(fab.left, fa.left))
                : fab
            : isLeft(fa)
                ? fa
                : right(fab.right(fa.right));
    },
    of: of
}); };
/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * const parse = (u: unknown): E.Either<string, string | number> =>
 *   pipe(
 *     parseString(u),
 *     E.alt<string, string | number>(() => parseNumber(u))
 *   )
 *
 * assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error
 *
 * const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))
 *
 * const parseAll = (u: unknown): E.Either<string, string | number> =>
 *   Alt.alt<string | number>(parseString(u), () => parseNumber(u))
 *
 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
 *
 * @category error handling
 * @since 2.7.0
 */
var getAltValidation = function (SE) { return ({
    URI: URI,
    _E: undefined,
    map: _map,
    alt: function (me, that) {
        if (isRight(me)) {
            return me;
        }
        var ea = that();
        return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
    }
}); };
/**
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category constructors
 * @since 2.7.0
 */
var of = right;
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) {
    return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}; };
/**
 * @since 2.0.0
 */
var ap = apW;
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.6.0
 */
var chainW = flatMap;
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix'
 * )
 *
 * @category folding
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(b, fa.right);
}; };
/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as S from 'fp-ts/string'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(S.Monoid)(yell)),
 *   'a!'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(S.Monoid)(yell)),
 *   S.Monoid.empty
 * )
 *
 * @category folding
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : f(fa.right);
}; }; };
/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix'
 * )
 *
 * @category folding
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(fa.right, b);
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none
 * )
 *
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    return function (f) {
        return function (ta) {
            return isLeft(ta) ? F.of(left(ta.left)) : F.map(f(ta.right), right);
        };
    };
};
/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
 *   O.none
 * )
 *
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) {
    return function (ma) {
        return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : right(g(fa.right));
}; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : fa;
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Bifunctor = {
    URI: URI,
    bimap: _bimap,
    mapLeft: _mapLeft
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return isLeft(fa) ? that() : fa;
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).
 *
 * | x        | y        | pipe(x, alt(() => y) |
 * | -------- | -------- | -------------------- |
 * | left(a)  | left(b)  | left(b)              |
 * | left(a)  | right(2) | right(2)             |
 * | right(1) | left(b)  | right(1)             |
 * | right(1) | right(2) | right(1)             |
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.alt(() => E.left('b'))
 *   ),
 *   E.left('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.alt(() => E.right(2))
 *   ),
 *   E.right(2)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.alt(() => E.left('b'))
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.alt(() => E.right(2))
 *   ),
 *   E.right(1)
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var alt = altW;
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isLeft(wa) ? wa : right(f(wa));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
var ChainRec = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRec
};
/**
 * @since 2.6.3
 */
var throwError = left;
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap,
    throwError: throwError
};
/**
 * @category instances
 * @since 2.10.0
 */
var FromEither = {
    URI: URI,
    fromEither: _function__WEBPACK_IMPORTED_MODULE_1__.identity
};
/**
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
 * @category lifting
 * @since 2.0.0
 */
var fromPredicate = /*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_5__.fromPredicate)(FromEither);
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some(1),
 *     E.fromOption(() => 'error')
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     E.fromOption(() => 'error')
 *   ),
 *   E.left('error')
 * )
 *
 * @category conversions
 * @since 2.0.0
 */
var fromOption = 
/*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_5__.fromOption)(FromEither);
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
var isLeft = _internal__WEBPACK_IMPORTED_MODULE_0__.isLeft;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
var isRight = _internal__WEBPACK_IMPORTED_MODULE_0__.isRight;
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchW = function (onLeft, onRight) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
    };
};
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
var foldW = matchW;
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { match, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 2.10.0
 */
var match = matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var fold = match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : ma.right;
    };
};
/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__.flap)(Functor);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apFirst)(Apply);
/**
 * Less strict version of [`apFirst`](#apfirst)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
var apFirstW = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apSecond)(Apply);
/**
 * Less strict version of [`apSecond`](#apsecond)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
var apSecondW = apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chainFirst = 
/*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_8__.chainFirst)(Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.8.0
 */
var chainFirstW = chainFirst;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
var flattenW = 
/*#__PURE__*/ chainW(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category sequencing
 * @since 2.0.0
 */
var flatten = flattenW;
/**
 * @since 2.0.0
 */
var duplicate = /*#__PURE__*/ extend(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
/**
 * @category lifting
 * @since 2.10.0
 */
var fromOptionK = 
/*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_5__.fromOptionK)(FromEither);
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainOptionK = /*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_5__.chainOptionK)(FromEither, Chain);
/**
 * Less strict version of [`chainOptionK`](#chainoptionk).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.13.2
 */
var chainOptionKW = /*#__PURE__*/ chainOptionK;
/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(-1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('a')
 * )
 *
 * @category filtering
 * @since 2.0.0
 */
var filterOrElse = /*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_5__.filterOrElse)(FromEither, Chain);
/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category filtering
 * @since 2.9.0
 */
var filterOrElseW = filterOrElse;
/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @since 2.0.0
 */
var swap = function (ma) { return (isLeft(ma) ? right(ma.left) : left(ma.right)); };
/**
 * Less strict version of [`orElse`](#orelse).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
var orElseW = function (onLeft) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : ma;
    };
};
/**
 * Useful for recovering from errors.
 *
 * @category error handling
 * @since 2.0.0
 */
var orElse = orElseW;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category conversions
 * @since 2.0.0
 */
var fromNullable = function (e) {
    return function (a) {
        return a == null ? left(e) : right(a);
    };
};
/**
 * Constructs a new `Either` from a function that might throw.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
 *   E.tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f, onThrow) {
    try {
        return right(f());
    }
    catch (e) {
        return left(onThrow(e));
    }
};
/**
 * Converts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 2.10.0
 */
var tryCatchK = function (f, onThrow) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); }, onThrow);
    };
};
/**
 * @category lifting
 * @since 2.9.0
 */
var fromNullableK = function (e) {
    var from = fromNullable(e);
    return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(f, from); };
};
/**
 * @category sequencing
 * @since 2.9.0
 */
var chainNullableK = function (e) {
    var from = fromNullableK(e);
    return function (f) { return chain(from(f)); };
};
/**
 * @category conversions
 * @since 2.10.0
 */
var toUnion = /*#__PURE__*/ foldW(_function__WEBPACK_IMPORTED_MODULE_1__.identity, _function__WEBPACK_IMPORTED_MODULE_1__.identity);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
function elem(E) {
    return function (a, ma) {
        if (ma === undefined) {
            var elemE_1 = elem(E);
            return function (ma) { return elemE_1(a, ma); };
        }
        return isLeft(ma) ? false : E.equals(a, ma.right);
    };
}
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
var exists = function (predicate) {
    return function (ma) {
        return isLeft(ma) ? false : predicate(ma.right);
    };
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_0__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_8__.bind)(Chain);
/**
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var bindW = bind;
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apS)(Apply);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var apSW = apS;
/**
 * @since 2.11.0
 */
var ApT = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_0__.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return function (as) {
        var e = f(0, _internal__WEBPACK_IMPORTED_MODULE_0__.head(as));
        if (isLeft(e)) {
            return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
            var e_1 = f(i, as[i]);
            if (isLeft(e_1)) {
                return e_1;
            }
            out.push(e_1.right);
        }
        return right(out);
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_internal__WEBPACK_IMPORTED_MODULE_0__.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
/**
 * Use [`parse`](./Json.ts.html#parse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
/**
 * Use [`stringify`](./Json.ts.html#stringify) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var stringifyJSON = function (u, onError) {
    return tryCatch(function () {
        var s = JSON.stringify(u);
        if (typeof s !== 'string') {
            throw new Error('Converting unsupported structure to JSON');
        }
        return s;
    }, onError);
};
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
 * (where `E` is from `import E from 'fp-ts/Either'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var either = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: _alt,
    extend: _extend,
    chainRec: _chainRec,
    throwError: throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplySemigroup = 
/*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.getApplySemigroup)(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplyMonoid = 
/*#__PURE__*/ (0,_Applicative__WEBPACK_IMPORTED_MODULE_9__.getApplicativeMonoid)(Applicative);
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getValidationSemigroup = function (SE, SA) {
    return (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.getApplySemigroup)(getApplicativeValidation(SE))(SA);
};
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getValidationMonoid = function (SE, MA) {
    return (0,_Applicative__WEBPACK_IMPORTED_MODULE_9__.getApplicativeMonoid)(getApplicativeValidation(SE))(MA);
};
/**
 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function getValidation(SE) {
    var ap = getApplicativeValidation(SE).ap;
    var alt = getAltValidation(SE).alt;
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        of: of,
        chain: flatMap,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: sequence,
        chainRec: _chainRec,
        throwError: throwError,
        ap: ap,
        alt: alt
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Endomorphism.js":
/*!************************************************!*\
  !*** ./node_modules/fp-ts/es6/Endomorphism.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/**
 * @since 2.11.0
 */

/**
 * @category type lambdas
 * @since 2.11.0
 */
var URI = 'Endomorphism';
/**
 * Endomorphism form a `Semigroup` where the `concat` operation is the usual function composition.
 *
 * @category instances
 * @since 2.11.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(first, second); }
}); };
/**
 * Endomorphism form a `Monoid` where the `empty` value is the `identity` function.
 *
 * @category instances
 * @since 2.11.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: _function__WEBPACK_IMPORTED_MODULE_0__.identity
}); };


/***/ }),

/***/ "./node_modules/fp-ts/es6/Eq.js":
/*!**************************************!*\
  !*** ./node_modules/fp-ts/es6/Eq.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Contravariant": () => (/* binding */ Contravariant),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "contramap": () => (/* binding */ contramap),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqBoolean": () => (/* binding */ eqBoolean),
/* harmony export */   "eqDate": () => (/* binding */ eqDate),
/* harmony export */   "eqNumber": () => (/* binding */ eqNumber),
/* harmony export */   "eqStrict": () => (/* binding */ eqStrict),
/* harmony export */   "eqString": () => (/* binding */ eqString),
/* harmony export */   "fromEquals": () => (/* binding */ fromEquals),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getStructEq": () => (/* binding */ getStructEq),
/* harmony export */   "getTupleEq": () => (/* binding */ getTupleEq),
/* harmony export */   "strictEqual": () => (/* binding */ strictEqual),
/* harmony export */   "struct": () => (/* binding */ struct),
/* harmony export */   "tuple": () => (/* binding */ tuple)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromEquals = function (equals) { return ({
    equals: function (x, y) { return x === y || equals(x, y); }
}); };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
var struct = function (eqs) {
    return fromEquals(function (first, second) {
        for (var key in eqs) {
            if (!eqs[key].equals(first[key], second[key])) {
                return false;
            }
        }
        return true;
    });
};
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { tuple } from 'fp-ts/Eq'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const E = tuple(S.Eq, N.Eq, B.Eq)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 2.10.0
 */
var tuple = function () {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return fromEquals(function (first, second) { return eqs.every(function (E, i) { return E.equals(first[i], second[i]); }); });
};
/* istanbul ignore next */
var contramap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, contramap(f)); };
/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Eq<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for equality (meaning we have an `Eq<X>`)
 *
 * For example, given the following `User` type, we want to construct an `Eq<User>` that just looks at the `key` field
 * for each user (since it's known to be unique).
 *
 * If we have a way of comparing `UUID`s for equality (`eqUUID: Eq<UUID>`) and we know how to go from `User -> UUID`,
 * using `contramap` we can do this
 *
 * @example
 * import { contramap, Eq } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/string'
 *
 * type UUID = string
 *
 * interface User {
 *   readonly key: UUID
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const eqUUID: Eq<UUID> = S.Eq
 *
 * const eqUserByKey: Eq<User> = pipe(
 *   eqUUID,
 *   contramap((user) => user.key)
 * )
 *
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k2', firstName: 'a1', lastName: 'b1' }
 *   ),
 *   false
 * )
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k1', firstName: 'a2', lastName: 'b1' }
 *   ),
 *   true
 * )
 *
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
var eqStrict = {
    equals: function (a, b) { return a === b; }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (x, y) { return fromEquals(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); }
}); };
/**
 * @category instances
 * @since 2.6.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: empty
}); };
/**
 * @category instances
 * @since 2.7.0
 */
var Contravariant = {
    URI: URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getTupleEq = tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getStructEq = struct;
/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var strictEqual = eqStrict.equals;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Contravariant` instance, pass `E.Contravariant` instead of `E.eq`
 * (where `E` is from `import E from 'fp-ts/Eq'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var eq = Contravariant;
/**
 * Use [`Eq`](./boolean.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var eqBoolean = eqStrict;
/**
 * Use [`Eq`](./string.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var eqString = eqStrict;
/**
 * Use [`Eq`](./number.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var eqNumber = eqStrict;
/**
 * Use [`Eq`](./Date.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var eqDate = {
    equals: function (first, second) { return first.valueOf() === second.valueOf(); }
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/FromEither.js":
/*!**********************************************!*\
  !*** ./node_modules/fp-ts/es6/FromEither.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chainEitherK": () => (/* binding */ chainEitherK),
/* harmony export */   "chainFirstEitherK": () => (/* binding */ chainFirstEitherK),
/* harmony export */   "chainOptionK": () => (/* binding */ chainOptionK),
/* harmony export */   "filterOrElse": () => (/* binding */ filterOrElse),
/* harmony export */   "fromEitherK": () => (/* binding */ fromEitherK),
/* harmony export */   "fromOption": () => (/* binding */ fromOption),
/* harmony export */   "fromOptionK": () => (/* binding */ fromOptionK),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate)
/* harmony export */ });
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */



function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_internal__WEBPACK_IMPORTED_MODULE_0__.isNone(ma) ? _internal__WEBPACK_IMPORTED_MODULE_0__.left(onNone()) : _internal__WEBPACK_IMPORTED_MODULE_0__.right(ma.value)); }; };
}
function fromPredicate(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _internal__WEBPACK_IMPORTED_MODULE_0__.right(a) : _internal__WEBPACK_IMPORTED_MODULE_0__.left(onFalse(a)));
        };
    };
}
function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(f, from); };
    };
}
function chainOptionK(F, M) {
    var fromOptionKF = fromOptionK(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
function fromEitherK(F) {
    return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(f, F.fromEither); };
}
function chainEitherK(F, M) {
    var fromEitherKF = fromEitherK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
function chainFirstEitherK(F, M) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(fromEitherK(F), (0,_Chain__WEBPACK_IMPORTED_MODULE_2__.chainFirst)(M));
}
function filterOrElse(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _internal__WEBPACK_IMPORTED_MODULE_0__.right(a) : _internal__WEBPACK_IMPORTED_MODULE_0__.left(onFalse(a))); });
        };
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/FromIO.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/FromIO.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chainFirstIOK": () => (/* binding */ chainFirstIOK),
/* harmony export */   "chainIOK": () => (/* binding */ chainIOK),
/* harmony export */   "fromIOK": () => (/* binding */ fromIOK)
/* harmony export */ });
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */


function fromIOK(F) {
    return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, F.fromIO); };
}
function chainIOK(F, M) {
    return function (f) {
        var g = (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, F.fromIO);
        return function (first) { return M.chain(first, g); };
    };
}
function chainFirstIOK(F, M) {
    var chainFirstM = (0,_Chain__WEBPACK_IMPORTED_MODULE_1__.chainFirst)(M);
    return function (f) { return chainFirstM((0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, F.fromIO)); };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/FromReader.js":
/*!**********************************************!*\
  !*** ./node_modules/fp-ts/es6/FromReader.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ask": () => (/* binding */ ask),
/* harmony export */   "asks": () => (/* binding */ asks),
/* harmony export */   "chainFirstReaderK": () => (/* binding */ chainFirstReaderK),
/* harmony export */   "chainReaderK": () => (/* binding */ chainReaderK),
/* harmony export */   "fromReaderK": () => (/* binding */ fromReaderK)
/* harmony export */ });
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reader */ "./node_modules/fp-ts/es6/Reader.js");
/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 2.11.0
 */



function ask(F) {
    return function () { return F.fromReader(_Reader__WEBPACK_IMPORTED_MODULE_0__.ask()); };
}
function asks(F) {
    return F.fromReader;
}
function fromReaderK(F) {
    return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(f, F.fromReader); };
}
function chainReaderK(F, M) {
    var fromReaderKF = fromReaderK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromReaderKF(f)); }; };
}
function chainFirstReaderK(F, M) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(fromReaderK(F), (0,_Chain__WEBPACK_IMPORTED_MODULE_2__.chainFirst)(M));
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Functor.js":
/*!*******************************************!*\
  !*** ./node_modules/fp-ts/es6/Functor.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "getFunctorComposition": () => (/* binding */ getFunctorComposition),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "map": () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */

function map(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
function flap(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
function bindTo(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
function let_(F) {
    return function (name, f) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
    }); }; };
}

/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map(F, G);
    return {
        map: function (fga, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fga, _map(f)); }
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/IO.js":
/*!**************************************!*\
  !*** ./node_modules/fp-ts/es6/IO.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApT": () => (/* binding */ ApT),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "ChainRec": () => (/* binding */ ChainRec),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "FromIO": () => (/* binding */ FromIO),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "MonadIO": () => (/* binding */ MonadIO),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "fromIO": () => (/* binding */ fromIO),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "io": () => (/* binding */ io),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseReadonlyArrayWithIndex": () => (/* binding */ traverseReadonlyArrayWithIndex),
/* harmony export */   "traverseReadonlyNonEmptyArrayWithIndex": () => (/* binding */ traverseReadonlyNonEmptyArrayWithIndex)
/* harmony export */ });
/* harmony import */ var _Applicative__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Applicative */ "./node_modules/fp-ts/es6/Applicative.js");
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/**
 * ```ts
 * interface IO<A> {
 *   (): A
 * }
 * ```
 *
 * `IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
 * type `A` and **never fails**.
 *
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 * If you want to represent a synchronous computation that may yield nothing, please see `IOOption`.
 *
 * @since 2.0.0
 */






var _map = function (ma, f) { return function () { return f(ma()); }; };
var _ap = function (mab, ma) { return function () { return mab()(ma()); }; };
var _chainRec = function (a, f) { return function () {
    var e = f(a)();
    while (e._tag === 'Left') {
        e = f(e.left)();
    }
    return e.right;
}; };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return _map(fa, f); }; };
/**
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) { return _ap(fab, fa); }; };
/**
 * @category constructors
 * @since 2.0.0
 */
var of = _function__WEBPACK_IMPORTED_MODULE_0__.constant;
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_0__.dual)(2, function (ma, f) {
    return function () {
        return f(ma())();
    };
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * @category sequencing
 * @since 2.0.0
 */
var flatten = /*#__PURE__*/ chain(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'IO';
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_1__.flap)(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_2__.apFirst)(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_2__.apSecond)(Apply);
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chainFirst = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_3__.chainFirst)(Chain);
/**
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var fromIO = _function__WEBPACK_IMPORTED_MODULE_0__.identity;
/**
 * @category instances
 * @since 2.7.0
 */
var MonadIO = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap,
    fromIO: fromIO
};
/**
 * @category instances
 * @since 2.7.0
 */
var ChainRec = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRec
};
/**
 * @category instances
 * @since 2.10.0
 */
var FromIO = {
    URI: URI,
    fromIO: _function__WEBPACK_IMPORTED_MODULE_0__.identity
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_4__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_1__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_1__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_3__.bind)(Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_2__.apS)(Apply);
/**
 * @since 2.11.0
 */
var ApT = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_4__.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return function (as) {
        return function () {
            var out = [f(0, _internal__WEBPACK_IMPORTED_MODULE_4__.head(as))()];
            for (var i = 1; i < as.length; i++) {
                out.push(f(i, as[i])());
            }
            return out;
        };
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_internal__WEBPACK_IMPORTED_MODULE_4__.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) {
    return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `IO.Functor` instead of `IO.io`
 * (where `IO` is from `import IO from 'fp-ts/IO'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var io = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    fromIO: fromIO,
    chainRec: _chainRec
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getSemigroup = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_2__.getApplySemigroup)(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getMonoid = /*#__PURE__*/ (0,_Applicative__WEBPACK_IMPORTED_MODULE_5__.getApplicativeMonoid)(Applicative);


/***/ }),

/***/ "./node_modules/fp-ts/es6/Magma.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/es6/Magma.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatAll": () => (/* binding */ concatAll),
/* harmony export */   "endo": () => (/* binding */ endo),
/* harmony export */   "filterFirst": () => (/* binding */ filterFirst),
/* harmony export */   "filterSecond": () => (/* binding */ filterSecond),
/* harmony export */   "reverse": () => (/* binding */ reverse)
/* harmony export */ });
/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 2.0.0
 */
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @since 2.11.0
 */
var reverse = function (M) { return ({
    concat: function (first, second) { return M.concat(second, first); }
}); };
/**
 * @since 2.11.0
 */
var filterFirst = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(first) ? M.concat(first, second) : second); }
    }); };
};
/**
 * @since 2.11.0
 */
var filterSecond = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(second) ? M.concat(first, second) : first); }
    }); };
};
/**
 * @since 2.11.0
 */
var endo = function (f) {
    return function (M) { return ({
        concat: function (first, second) { return M.concat(f(first), f(second)); }
    }); };
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
var concatAll = function (M) {
    return function (startWith) {
        return function (as) {
            return as.reduce(function (a, acc) { return M.concat(a, acc); }, startWith);
        };
    };
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Monoid.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Monoid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatAll": () => (/* binding */ concatAll),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "getDualMonoid": () => (/* binding */ getDualMonoid),
/* harmony export */   "getEndomorphismMonoid": () => (/* binding */ getEndomorphismMonoid),
/* harmony export */   "getFunctionMonoid": () => (/* binding */ getFunctionMonoid),
/* harmony export */   "getJoinMonoid": () => (/* binding */ getJoinMonoid),
/* harmony export */   "getMeetMonoid": () => (/* binding */ getMeetMonoid),
/* harmony export */   "getStructMonoid": () => (/* binding */ getStructMonoid),
/* harmony export */   "getTupleMonoid": () => (/* binding */ getTupleMonoid),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "monoidAll": () => (/* binding */ monoidAll),
/* harmony export */   "monoidAny": () => (/* binding */ monoidAny),
/* harmony export */   "monoidProduct": () => (/* binding */ monoidProduct),
/* harmony export */   "monoidString": () => (/* binding */ monoidString),
/* harmony export */   "monoidSum": () => (/* binding */ monoidSum),
/* harmony export */   "monoidVoid": () => (/* binding */ monoidVoid),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "struct": () => (/* binding */ struct),
/* harmony export */   "tuple": () => (/* binding */ tuple)
/* harmony export */ });
/* harmony import */ var _Endomorphism__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Endomorphism */ "./node_modules/fp-ts/es6/Endomorphism.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _Semigroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Semigroup */ "./node_modules/fp-ts/es6/Semigroup.js");




// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a monoid where `concat` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.min(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (B) { return ({
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.min(B).concat,
    empty: B.top
}); };
/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.max(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (B) { return ({
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.max(B).concat,
    empty: B.bottom
}); };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Monoid'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Monoid).concat('a', 'b'), 'ba')
 *
 * @since 2.10.0
 */
var reverse = function (M) { return ({
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.reverse(M).concat,
    empty: M.empty
}); };
/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const M = struct<Point>({
 *   x: N.MonoidSum,
 *   y: N.MonoidSum
 * })
 *
 * assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @since 2.10.0
 */
var struct = function (monoids) {
    var empty = {};
    for (var k in monoids) {
        if (_internal__WEBPACK_IMPORTED_MODULE_1__.has.call(monoids, k)) {
            empty[k] = monoids[k].empty;
        }
    }
    return {
        concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.struct(monoids).concat,
        empty: empty
    };
};
/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Monoid'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const M1 = tuple(S.Monoid, N.MonoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.10.0
 */
var tuple = function () {
    var monoids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        monoids[_i] = arguments[_i];
    }
    return ({
        concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.tuple.apply(_Semigroup__WEBPACK_IMPORTED_MODULE_0__, monoids).concat,
        empty: monoids.map(function (m) { return m.empty; })
    });
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([]), 0)
 *
 * @since 2.10.0
 */
var concatAll = function (M) { return _Semigroup__WEBPACK_IMPORTED_MODULE_0__.concatAll(M)(M.empty); };
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`Monoid`](./void.ts.html#monoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidVoid = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupVoid.concat,
    empty: undefined
};
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getTupleMonoid = tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getStructMonoid = struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getDualMonoid = reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getJoinMonoid = max;
/**
 * Use [`min`](#min) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getMeetMonoid = min;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var fold = concatAll;
/**
 * Use [`MonoidAll`](./boolean.ts.html#monoidall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidAll = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupAll.concat,
    empty: true
};
/**
 * Use [`MonoidAny`](./boolean.ts.html#monoidany) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidAny = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupAny.concat,
    empty: false
};
/**
 * Use [`getMonoid`](./function.ts.html#getmonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getFunctionMonoid = _function__WEBPACK_IMPORTED_MODULE_2__.getMonoid;
/**
 * Use [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) instead.
 *
 * **Note**. The execution order in [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) is reversed.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return reverse((0,_Endomorphism__WEBPACK_IMPORTED_MODULE_3__.getMonoid)()); };
/**
 * Use [`Monoid`](./string.ts.html#monoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidString = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupString.concat,
    empty: ''
};
/**
 * Use [`MonoidSum`](./number.ts.html#monoidsum) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidSum = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupSum.concat,
    empty: 0
};
/**
 * Use [`MonoidProduct`](./number.ts.html#monoidproduct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidProduct = {
    concat: _Semigroup__WEBPACK_IMPORTED_MODULE_0__.semigroupProduct.concat,
    empty: 1
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Option.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Option.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Alternative": () => (/* binding */ Alternative),
/* harmony export */   "ApT": () => (/* binding */ ApT),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "Compactable": () => (/* binding */ Compactable),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Filterable": () => (/* binding */ Filterable),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FromEither": () => (/* binding */ FromEither),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "MonadThrow": () => (/* binding */ MonadThrow),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "Witherable": () => (/* binding */ Witherable),
/* harmony export */   "Zero": () => (/* binding */ Zero),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainEitherK": () => (/* binding */ chainEitherK),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainFirstEitherK": () => (/* binding */ chainFirstEitherK),
/* harmony export */   "chainNullableK": () => (/* binding */ chainNullableK),
/* harmony export */   "compact": () => (/* binding */ compact),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterMap": () => (/* binding */ filterMap),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "foldW": () => (/* binding */ foldW),
/* harmony export */   "fromEither": () => (/* binding */ fromEither),
/* harmony export */   "fromEitherK": () => (/* binding */ fromEitherK),
/* harmony export */   "fromNullable": () => (/* binding */ fromNullable),
/* harmony export */   "fromNullableK": () => (/* binding */ fromNullableK),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate),
/* harmony export */   "getApplyMonoid": () => (/* binding */ getApplyMonoid),
/* harmony export */   "getApplySemigroup": () => (/* binding */ getApplySemigroup),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getFirstMonoid": () => (/* binding */ getFirstMonoid),
/* harmony export */   "getLastMonoid": () => (/* binding */ getLastMonoid),
/* harmony export */   "getLeft": () => (/* binding */ getLeft),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getOrElse": () => (/* binding */ getOrElse),
/* harmony export */   "getOrElseW": () => (/* binding */ getOrElseW),
/* harmony export */   "getOrd": () => (/* binding */ getOrd),
/* harmony export */   "getRefinement": () => (/* binding */ getRefinement),
/* harmony export */   "getRight": () => (/* binding */ getRight),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "guard": () => (/* binding */ guard),
/* harmony export */   "isNone": () => (/* binding */ isNone),
/* harmony export */   "isSome": () => (/* binding */ isSome),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapNullable": () => (/* binding */ mapNullable),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "matchW": () => (/* binding */ matchW),
/* harmony export */   "none": () => (/* binding */ none),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "option": () => (/* binding */ option),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionMap": () => (/* binding */ partitionMap),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "separate": () => (/* binding */ separate),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "throwError": () => (/* binding */ throwError),
/* harmony export */   "toNullable": () => (/* binding */ toNullable),
/* harmony export */   "toUndefined": () => (/* binding */ toUndefined),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseReadonlyArrayWithIndex": () => (/* binding */ traverseReadonlyArrayWithIndex),
/* harmony export */   "traverseReadonlyNonEmptyArrayWithIndex": () => (/* binding */ traverseReadonlyNonEmptyArrayWithIndex),
/* harmony export */   "tryCatch": () => (/* binding */ tryCatch),
/* harmony export */   "tryCatchK": () => (/* binding */ tryCatchK),
/* harmony export */   "wilt": () => (/* binding */ wilt),
/* harmony export */   "wither": () => (/* binding */ wither),
/* harmony export */   "zero": () => (/* binding */ zero)
/* harmony export */ });
/* harmony import */ var _Applicative__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Applicative */ "./node_modules/fp-ts/es6/Applicative.js");
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _FromEither__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FromEither */ "./node_modules/fp-ts/es6/FromEither.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _Predicate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Predicate */ "./node_modules/fp-ts/es6/Predicate.js");
/* harmony import */ var _Semigroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Semigroup */ "./node_modules/fp-ts/es6/Semigroup.js");
/* harmony import */ var _Separated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Separated */ "./node_modules/fp-ts/es6/Separated.js");
/* harmony import */ var _Witherable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Witherable */ "./node_modules/fp-ts/es6/Witherable.js");
/* harmony import */ var _Zero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Zero */ "./node_modules/fp-ts/es6/Zero.js");












// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
var none = _internal__WEBPACK_IMPORTED_MODULE_0__.none;
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
var some = _internal__WEBPACK_IMPORTED_MODULE_0__.some;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : none); };
}
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
var getLeft = function (ma) { return (ma._tag === 'Right' ? none : some(ma.left)); };
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
var getRight = function (ma) { return (ma._tag === 'Left' ? none : some(ma.right)); };
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, map(f)); };
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fab, ap(fa)); };
var _reduce = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, alt(that)); };
var _filter = function (fa, predicate) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, filter(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, filterMap(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(wa, extend(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, partitionMap(f)); };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Option';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = function (S) { return ({
    show: function (ma) { return (isNone(ma) ? 'none' : "some(".concat(S.show(ma.value), ")")); }
}); };
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
var getEq = function (E) { return ({
    equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
}); };
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import * as N from 'fp-ts/number'
 *
 * const O = getOrd(N.Ord)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
var getOrd = function (O) { return ({
    equals: getEq(O).equals,
    compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
}); };
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(b) | some(b)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = function (S) { return ({
    concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
    empty: none
}); };
/**
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isNone(fa) ? none : some(f(fa.value));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category constructors
 * @since 2.7.0
 */
var of = some;
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) {
    return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}; };
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_1__.dual)(2, function (ma, f) { return (isNone(ma) ? none : f(ma.value)); });
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * @category folding
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(b, fa.value);
}; };
/**
 * @category folding
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isNone(fa) ? M.empty : f(fa.value);
}; }; };
/**
 * @category folding
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(fa.value, b);
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return isNone(fa) ? that() : fa;
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * | x       | y       | pipe(x, alt(() => y) |
 * | ------- | ------- | -------------------- |
 * | none    | none    | none                 |
 * | some(a) | none    | some(a)              |
 * | none    | some(b) | some(b)              |
 * | some(a) | some(b) | some(a)              |
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.none)
 *   ),
 *   O.none
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt<string>(() => O.none)
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var alt = altW;
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @since 2.7.0
 */
var zero = function () { return none; };
/**
 * @category instances
 * @since 2.11.0
 */
var Zero = {
    URI: URI,
    zero: zero
};
/**
 * @category do notation
 * @since 2.11.0
 */
var guard = /*#__PURE__*/ (0,_Zero__WEBPACK_IMPORTED_MODULE_2__.guard)(Zero, Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    alt: _alt,
    zero: zero
};
/**
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isNone(wa) ? none : some(f(wa));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: _map,
    extend: _extend
};
/**
 * @category filtering
 * @since 2.0.0
 */
var compact = /*#__PURE__*/ chain(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
var defaultSeparated = /*#__PURE__*/ (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(none, none);
/**
 * @category filtering
 * @since 2.0.0
 */
var separate = function (ma) {
    return isNone(ma) ? defaultSeparated : (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(getLeft(ma.value), getRight(ma.value));
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filter = function (predicate) {
    return function (fa) {
        return isNone(fa) ? none : predicate(fa.value) ? fa : none;
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filterMap = function (f) { return function (fa) {
    return isNone(fa) ? none : f(fa.value);
}; };
/**
 * @category filtering
 * @since 2.0.0
 */
var partition = function (predicate) {
    return function (fa) {
        return (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(_filter(fa, (0,_Predicate__WEBPACK_IMPORTED_MODULE_4__.not)(predicate)), _filter(fa, predicate));
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var partitionMap = function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(map(f), separate); };
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: _map,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    return function (f) {
        return function (ta) {
            return isNone(ta) ? F.of(none) : F.map(f(ta.value), some);
        };
    };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) {
    return function (ta) {
        return isNone(ta) ? F.of(none) : F.map(ta.value, some);
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
var _wither = /*#__PURE__*/ (0,_Witherable__WEBPACK_IMPORTED_MODULE_5__.witherDefault)(Traversable, Compactable);
var _wilt = /*#__PURE__*/ (0,_Witherable__WEBPACK_IMPORTED_MODULE_5__.wiltDefault)(Traversable, Compactable);
/**
 * @category filtering
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
/**
 * @category filtering
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt
};
/**
 * @since 2.7.0
 */
var throwError = function () { return none; };
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap,
    throwError: throwError
};
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category conversions
 * @since 2.0.0
 */
var fromEither = getRight;
/**
 * @category instances
 * @since 2.11.0
 */
var FromEither = {
    URI: URI,
    fromEither: fromEither
};
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category refinements
 * @since 2.0.0
 */
var isSome = _internal__WEBPACK_IMPORTED_MODULE_0__.isSome;
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchW = function (onNone, onSome) {
    return function (ma) {
        return isNone(ma) ? onNone() : onSome(ma.value);
    };
};
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
var foldW = matchW;
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 2.10.0
 */
var match = matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var fold = match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
var getOrElseW = function (onNone) {
    return function (ma) {
        return isNone(ma) ? onNone() : ma.value;
    };
};
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__.flap)(Functor);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apFirst)(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apSecond)(Apply);
/**
 * @category sequencing
 * @since 2.0.0
 */
var flatten = compact;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chainFirst = 
/*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_8__.chainFirst)(Chain);
/**
 * @since 2.0.0
 */
var duplicate = /*#__PURE__*/ extend(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
/**
 * @category lifting
 * @since 2.11.0
 */
var fromEitherK = /*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_9__.fromEitherK)(FromEither);
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainEitherK = 
/*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_9__.chainEitherK)(FromEither, Chain);
/**
 * @category sequencing
 * @since 2.12.0
 */
var chainFirstEitherK = 
/*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_9__.chainFirstEitherK)(FromEither, Chain);
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category conversions
 * @since 2.0.0
 */
var fromNullable = function (a) { return (a == null ? none : some(a)); };
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category interop
 * @since 2.0.0
 */
var tryCatch = function (f) {
    try {
        return some(f());
    }
    catch (e) {
        return none;
    }
};
/**
 * Converts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 2.10.0
 */
var tryCatchK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch(function () { return f.apply(void 0, a); });
    };
};
/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category lifting
 * @since 2.9.0
 */
var fromNullableK = function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.flow)(f, fromNullable); };
/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Employee {
 *   readonly company?: {
 *     readonly address?: {
 *       readonly street?: {
 *         readonly name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category sequencing
 * @since 2.9.0
 */
var chainNullableK = function (f) {
    return function (ma) {
        return isNone(ma) ? none : fromNullable(f(ma.value));
    };
};
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category conversions
 * @since 2.0.0
 */
var toNullable = /*#__PURE__*/ match(_function__WEBPACK_IMPORTED_MODULE_1__.constNull, _function__WEBPACK_IMPORTED_MODULE_1__.identity);
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category conversions
 * @since 2.0.0
 */
var toUndefined = /*#__PURE__*/ match(_function__WEBPACK_IMPORTED_MODULE_1__.constUndefined, _function__WEBPACK_IMPORTED_MODULE_1__.identity);
function elem(E) {
    return function (a, ma) {
        if (ma === undefined) {
            var elemE_1 = elem(E);
            return function (ma) { return elemE_1(a, ma); };
        }
        return isNone(ma) ? false : E.equals(a, ma.value);
    };
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
var exists = function (predicate) {
    return function (ma) {
        return isNone(ma) ? false : predicate(ma.value);
    };
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_0__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_6__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_8__.bind)(Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.apS)(Apply);
/**
 * @since 2.11.0
 */
var ApT = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_0__.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return function (as) {
        var o = f(0, _internal__WEBPACK_IMPORTED_MODULE_0__.head(as));
        if (isNone(o)) {
            return none;
        }
        var out = [o.value];
        for (var i = 1; i < as.length; i++) {
            var o_1 = f(i, as[i]);
            if (isNone(o_1)) {
                return none;
            }
            out.push(o_1.value);
        }
        return some(out);
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_internal__WEBPACK_IMPORTED_MODULE_0__.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) {
    return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); });
};
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(_function__WEBPACK_IMPORTED_MODULE_1__.identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `Refinement` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
/**
 * Use [`chainNullableK`](#chainnullablek) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var mapNullable = chainNullableK;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `O.Functor` instead of `O.option`
 * (where `O` is from `import O from 'fp-ts/Option'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var option = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    zero: zero,
    alt: _alt,
    extend: _extend,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
    throwError: throwError
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplySemigroup = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_7__.getApplySemigroup)(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplyMonoid = /*#__PURE__*/ (0,_Applicative__WEBPACK_IMPORTED_MODULE_10__.getApplicativeMonoid)(Applicative);
/**
 * Use
 *
 * ```ts
 * import { first } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(first())
 * ```
 *
 * instead.
 *
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getFirstMonoid = function () { return getMonoid((0,_Semigroup__WEBPACK_IMPORTED_MODULE_11__.first)()); };
/**
 * Use
 *
 * ```ts
 * import { last } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(last())
 * ```
 *
 * instead.
 *
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getLastMonoid = function () { return getMonoid((0,_Semigroup__WEBPACK_IMPORTED_MODULE_11__.last)()); };


/***/ }),

/***/ "./node_modules/fp-ts/es6/Ord.js":
/*!***************************************!*\
  !*** ./node_modules/fp-ts/es6/Ord.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Contravariant": () => (/* binding */ Contravariant),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "between": () => (/* binding */ between),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "contramap": () => (/* binding */ contramap),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "equalsDefault": () => (/* binding */ equalsDefault),
/* harmony export */   "fromCompare": () => (/* binding */ fromCompare),
/* harmony export */   "geq": () => (/* binding */ geq),
/* harmony export */   "getDualOrd": () => (/* binding */ getDualOrd),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getTupleOrd": () => (/* binding */ getTupleOrd),
/* harmony export */   "gt": () => (/* binding */ gt),
/* harmony export */   "leq": () => (/* binding */ leq),
/* harmony export */   "lt": () => (/* binding */ lt),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "ord": () => (/* binding */ ord),
/* harmony export */   "ordBoolean": () => (/* binding */ ordBoolean),
/* harmony export */   "ordDate": () => (/* binding */ ordDate),
/* harmony export */   "ordNumber": () => (/* binding */ ordNumber),
/* harmony export */   "ordString": () => (/* binding */ ordString),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "trivial": () => (/* binding */ trivial),
/* harmony export */   "tuple": () => (/* binding */ tuple)
/* harmony export */ });
/* harmony import */ var _Eq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/es6/Eq.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");


// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------
/**
 * @category defaults
 * @since 2.10.0
 */
var equalsDefault = function (compare) {
    return function (first, second) {
        return first === second || compare(first, second) === 0;
    };
};
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromCompare = function (compare) { return ({
    equals: equalsDefault(compare),
    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
}); };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Ord'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 *
 * const O = tuple(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.10.0
 */
var tuple = function () {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    return fromCompare(function (first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
            var r = ords[i].compare(first[i], second[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(first[i], second[i]);
    });
};
/**
 * @since 2.10.0
 */
var reverse = function (O) { return fromCompare(function (first, second) { return O.compare(second, first); }); };
/* istanbul ignore next */
var contramap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, contramap(f)); };
/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Ord<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for ordering (meaning we have an `Ord<X>`)
 *
 * For example, given the following `User` type, there are lots of possible choices for `X`,
 * but let's say we want to sort a list of users by `lastName`.
 *
 * If we have a way of comparing `lastName`s for ordering (`ordLastName: Ord<string>`) and we know how to go from `User -> string`,
 * using `contramap` we can do this
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { contramap, Ord } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const ordLastName: Ord<string> = S.Ord
 *
 * const ordByLastName: Ord<User> = pipe(
 *   ordLastName,
 *   contramap((user) => user.lastName)
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordByLastName)([
 *     { firstName: 'a', lastName: 'd' },
 *     { firstName: 'c', lastName: 'b' }
 *   ]),
 *   [
 *     { firstName: 'c', lastName: 'b' },
 *     { firstName: 'a', lastName: 'd' }
 *   ]
 * )
 *
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return fromCompare(function (first, second) { return fa.compare(f(first), f(second)); });
}; };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Ord';
/**
 * A typical use case for the `Semigroup` instance of `Ord` is merging two or more orderings.
 *
 * For example the following snippet builds an `Ord` for a type `User` which
 * sorts by `created` date descending, and **then** `lastName`
 *
 * @example
 * import * as D from 'fp-ts/Date'
 * import { pipe } from 'fp-ts/function'
 * import { contramap, getSemigroup, Ord, reverse } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly id: string
 *   readonly lastName: string
 *   readonly created: Date
 * }
 *
 * const ordByLastName: Ord<User> = pipe(
 *   S.Ord,
 *   contramap((user) => user.lastName)
 * )
 *
 * const ordByCreated: Ord<User> = pipe(
 *   D.Ord,
 *   contramap((user) => user.created)
 * )
 *
 * const ordUserByCreatedDescThenLastName = getSemigroup<User>().concat(
 *   reverse(ordByCreated),
 *   ordByLastName
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordUserByCreatedDescThenLastName)([
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) }
 *   ]),
 *   [
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) }
 *   ]
 * )
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) {
        return fromCompare(function (a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
        });
    }
}); };
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as B from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   readonly id: number
 *   readonly name: string
 *   readonly age: number
 *   readonly rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   S.Ord,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   N.Ord,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   B.Ord,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: fromCompare(function () { return 0; })
}); };
/**
 * @category instances
 * @since 2.7.0
 */
var Contravariant = {
    URI: URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var trivial = {
    equals: _function__WEBPACK_IMPORTED_MODULE_0__.constTrue,
    compare: /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_0__.constant)(0)
};
/**
 * @since 2.11.0
 */
var equals = function (O) {
    return function (second) {
        return function (first) {
            return first === second || O.compare(first, second) === 0;
        };
    };
};
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
var lt = function (O) {
    return function (first, second) {
        return O.compare(first, second) === -1;
    };
};
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
var gt = function (O) {
    return function (first, second) {
        return O.compare(first, second) === 1;
    };
};
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
var leq = function (O) {
    return function (first, second) {
        return O.compare(first, second) !== 1;
    };
};
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
var geq = function (O) {
    return function (first, second) {
        return O.compare(first, second) !== -1;
    };
};
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var min = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
    };
};
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var max = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
    };
};
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
var clamp = function (O) {
    var minO = min(O);
    var maxO = max(O);
    return function (low, hi) { return function (a) { return maxO(minO(a, hi), low); }; };
};
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
var between = function (O) {
    var ltO = lt(O);
    var gtO = gt(O);
    return function (low, hi) { return function (a) { return ltO(a, low) || gtO(a, hi) ? false : true; }; };
};
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getTupleOrd = tuple;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getDualOrd = reverse;
/**
 * Use [`Contravariant`](#contravariant) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var ord = Contravariant;
// default compare for primitive types
function compare(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
    equals: _Eq__WEBPACK_IMPORTED_MODULE_1__.eqStrict.equals,
    compare: compare
};
/**
 * Use [`Ord`](./boolean.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var ordBoolean = strictOrd;
/**
 * Use [`Ord`](./string.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var ordString = strictOrd;
/**
 * Use [`Ord`](./number.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var ordNumber = strictOrd;
/**
 * Use [`Ord`](./Date.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var ordDate = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ordNumber, 
/*#__PURE__*/
contramap(function (date) { return date.valueOf(); }));


/***/ }),

/***/ "./node_modules/fp-ts/es6/Predicate.js":
/*!*********************************************!*\
  !*** ./node_modules/fp-ts/es6/Predicate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Contravariant": () => (/* binding */ Contravariant),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "and": () => (/* binding */ and),
/* harmony export */   "contramap": () => (/* binding */ contramap),
/* harmony export */   "getMonoidAll": () => (/* binding */ getMonoidAll),
/* harmony export */   "getMonoidAny": () => (/* binding */ getMonoidAny),
/* harmony export */   "getSemigroupAll": () => (/* binding */ getSemigroupAll),
/* harmony export */   "getSemigroupAny": () => (/* binding */ getSemigroupAny),
/* harmony export */   "not": () => (/* binding */ not),
/* harmony export */   "or": () => (/* binding */ or)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");

var contramap_ = function (predicate, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(predicate, contramap(f)); };
/**
 * @since 2.11.0
 */
var contramap = function (f) {
    return function (predicate) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, predicate);
    };
};
/**
 * @category type lambdas
 * @since 2.11.0
 */
var URI = 'Predicate';
/**
 * @category instances
 * @since 2.11.0
 */
var getSemigroupAny = function () { return ({
    concat: function (first, second) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(first, or(second)); }
}); };
/**
 * @category instances
 * @since 2.11.0
 */
var getMonoidAny = function () { return ({
    concat: getSemigroupAny().concat,
    empty: _function__WEBPACK_IMPORTED_MODULE_0__.constFalse
}); };
/**
 * @category instances
 * @since 2.11.0
 */
var getSemigroupAll = function () { return ({
    concat: function (first, second) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(first, and(second)); }
}); };
/**
 * @category instances
 * @since 2.11.0
 */
var getMonoidAll = function () { return ({
    concat: getSemigroupAll().concat,
    empty: _function__WEBPACK_IMPORTED_MODULE_0__.constTrue
}); };
/**
 * @category instances
 * @since 2.11.0
 */
var Contravariant = {
    URI: URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var not = function (predicate) {
    return function (a) {
        return !predicate(a);
    };
};
/**
 * @since 2.11.0
 */
var or = function (second) {
    return function (first) {
        return function (a) {
            return first(a) || second(a);
        };
    };
};
/**
 * @since 2.11.0
 */
var and = function (second) {
    return function (first) {
        return function (a) {
            return first(a) && second(a);
        };
    };
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Reader.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Reader.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApT": () => (/* binding */ ApT),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Category": () => (/* binding */ Category),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "Choice": () => (/* binding */ Choice),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "Profunctor": () => (/* binding */ Profunctor),
/* harmony export */   "Strong": () => (/* binding */ Strong),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apFirstW": () => (/* binding */ apFirstW),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSW": () => (/* binding */ apSW),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "apSecondW": () => (/* binding */ apSecondW),
/* harmony export */   "apW": () => (/* binding */ apW),
/* harmony export */   "ask": () => (/* binding */ ask),
/* harmony export */   "asks": () => (/* binding */ asks),
/* harmony export */   "asksReader": () => (/* binding */ asksReader),
/* harmony export */   "asksReaderW": () => (/* binding */ asksReaderW),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bindW": () => (/* binding */ bindW),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainFirstW": () => (/* binding */ chainFirstW),
/* harmony export */   "chainW": () => (/* binding */ chainW),
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "first": () => (/* binding */ first),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "flattenW": () => (/* binding */ flattenW),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "id": () => (/* binding */ id),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "local": () => (/* binding */ local),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "promap": () => (/* binding */ promap),
/* harmony export */   "reader": () => (/* binding */ reader),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "second": () => (/* binding */ second),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseReadonlyArrayWithIndex": () => (/* binding */ traverseReadonlyArrayWithIndex),
/* harmony export */   "traverseReadonlyNonEmptyArrayWithIndex": () => (/* binding */ traverseReadonlyNonEmptyArrayWithIndex)
/* harmony export */ });
/* harmony import */ var _Applicative__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Applicative */ "./node_modules/fp-ts/es6/Applicative.js");
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _Either__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/**
 * The `Reader` monad (also called the Environment monad). Represents a computation, which can read values from a shared environment,
 * pass values from function to function, and execute sub-computations in a modified environment.
 * Using `Reader` monad for such computations is often clearer and easier than using the `State` monad.
 *
 * In this example the `Reader` monad provides access to variable bindings. `Bindings` are a map of `number` variables.
 * The variable count contains number of variables in the bindings. You can see how to run a `Reader` monad and retrieve
 * data from it, how to access the `Reader` data with `ask` and `asks`.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 * import * as R from 'fp-ts/Reader'
 * import * as RR from 'fp-ts/ReadonlyRecord'
 *
 * interface Bindings extends RR.ReadonlyRecord<string, number> {}
 *
 * // The Reader monad, which implements this complicated check.
 * const isCountCorrect: R.Reader<Bindings, boolean> = pipe(
 *   R.Do,
 *   R.bind('count', () => R.asks(lookupVar('count'))),
 *   R.bind('bindings', () => R.ask()),
 *   R.map(({ count, bindings }) => count === RR.size(bindings))
 * )
 *
 * // The selector function to use with 'asks'.
 * // Returns value of the variable with specified name.
 * const lookupVar = (name: string) => (bindings: Bindings): number =>
 *   pipe(
 *     bindings,
 *     RR.lookup(name),
 *     O.getOrElse(() => 0)
 *   )
 *
 * const sampleBindings: Bindings = { count: 3, a: 1, b: 2 }
 *
 * assert.deepStrictEqual(isCountCorrect(sampleBindings), true)
 *
 * @since 2.0.0
 */







// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Reads the current context
 *
 * @category constructors
 * @since 2.0.0
 */
var ask = function () { return _function__WEBPACK_IMPORTED_MODULE_0__.identity; };
/**
 * Projects a value from the global context in a Reader
 *
 * @category constructors
 * @since 2.0.0
 */
var asks = _function__WEBPACK_IMPORTED_MODULE_0__.identity;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as R from 'fp-ts/Reader'
 * import * as string from 'fp-ts/string'
 *
 * const calculateContentLen: R.Reader<string, number> = pipe(
 *   R.Do,
 *   R.bind('content', () => R.ask<string>()),
 *   R.map(({ content }) => string.size(content))
 * )
 *
 * // Calls calculateContentLen after adding a prefix to the Reader content.
 * const calculateModifiedContentLen: R.Reader<string, number> = pipe(
 *   calculateContentLen,
 *   R.local((s) => 'Prefix ' + s)
 * )
 *
 * const s = '12345'
 *
 * assert.deepStrictEqual(
 *   "Modified 's' length: " + calculateModifiedContentLen(s) + '\n' + "Original 's' length: " + calculateContentLen(s),
 *   "Modified 's' length: 12\nOriginal 's' length: 5"
 * )
 *
 * @since 2.0.0
 */
var local = function (f) { return function (ma) { return function (r2) {
    return ma(f(r2));
}; }; };
/**
 * Less strict version of [`asksReader`](#asksreader).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.11.0
 */
var asksReaderW = function (f) {
    return function (r) {
        return f(r)(r);
    };
};
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.11.0
 */
var asksReader = asksReaderW;
/* istanbul ignore next */
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, map(f)); };
/* istanbul ignore next */
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fab, ap(fa)); };
var _compose = function (bc, ab) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(bc, compose(ab)); };
var _promap = function (fea, f, g) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fea, promap(f, g)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) { return function (r) { return f(fa(r)); }; }; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) { return function (r) {
    return fab(r)(fa(r));
}; }; };
/**
 * @since 2.0.0
 */
var ap = apW;
/**
 * @category constructors
 * @since 2.0.0
 */
var of = _function__WEBPACK_IMPORTED_MODULE_0__.constant;
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_0__.dual)(2, function (ma, f) {
    return function (r) {
        return f(ma(r))(r);
    };
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.6.0
 */
var chainW = flatMap;
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
var flattenW = 
/*#__PURE__*/ chainW(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * @category sequencing
 * @since 2.0.0
 */
var flatten = flattenW;
/**
 * @since 2.0.0
 */
var compose = function (ab) { return function (bc) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(ab, bc); }; };
/**
 * @since 2.0.0
 */
var promap = function (f, g) { return function (fea) { return function (a) {
    return g(fea(f(a)));
}; }; };
/**
 * @category constructors
 * @since 2.0.0
 */
var id = function () { return _function__WEBPACK_IMPORTED_MODULE_0__.identity; };
/**
 * @since 2.10.0
 */
var first = function (pab) {
    return function (_a) {
        var a = _a[0], c = _a[1];
        return [pab(a), c];
    };
};
/**
 * @since 2.10.0
 */
var second = function (pbc) {
    return function (_a) {
        var a = _a[0], b = _a[1];
        return [a, pbc(b)];
    };
};
/**
 * @since 2.10.0
 */
var left = function (pab) { return _Either__WEBPACK_IMPORTED_MODULE_1__.fold(function (a) { return _internal__WEBPACK_IMPORTED_MODULE_2__.left(pab(a)); }, _Either__WEBPACK_IMPORTED_MODULE_1__.right); };
/**
 * @since 2.10.0
 */
var right = function (pbc) { return _Either__WEBPACK_IMPORTED_MODULE_1__.fold(_Either__WEBPACK_IMPORTED_MODULE_1__.left, function (b) { return _internal__WEBPACK_IMPORTED_MODULE_2__.right(pbc(b)); }); };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Reader';
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_3__.flap)(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_4__.apFirst)(Apply);
/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.12.0
 */
var apFirstW = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_4__.apSecond)(Apply);
/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.12.0
 */
var apSecondW = apSecond;
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
var chainFirst = 
/*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_5__.chainFirst)(Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
var chainFirstW = chainFirst;
/**
 * @category instances
 * @since 2.7.0
 */
var Profunctor = {
    URI: URI,
    map: _map,
    promap: _promap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Category = {
    URI: URI,
    compose: _compose,
    id: id
};
/**
 * @category instances
 * @since 2.8.3
 */
var Strong = {
    URI: URI,
    map: _map,
    promap: _promap,
    first: first,
    second: second
};
/**
 * @category instances
 * @since 2.8.3
 */
var Choice = {
    URI: URI,
    map: _map,
    promap: _promap,
    left: left,
    right: right
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_3__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_3__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_5__.bind)(Chain);
/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var bindW = bind;
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_2__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_4__.apS)(Apply);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var apSW = apS;
/**
 * @since 2.11.0
 */
var ApT = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_2__.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return function (as) {
        return function (r) {
            var out = [f(0, _internal__WEBPACK_IMPORTED_MODULE_2__.head(as))(r)];
            for (var i = 1; i < as.length; i++) {
                out.push(f(i, as[i])(r));
            }
            return out;
        };
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_internal__WEBPACK_IMPORTED_MODULE_2__.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `R.Functor` instead of `R.reader`
 * (where `R` is from `import R from 'fp-ts/Reader'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var reader = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    promap: _promap,
    compose: _compose,
    id: id,
    first: first,
    second: second,
    left: left,
    right: right
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getSemigroup = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_4__.getApplySemigroup)(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getMonoid = /*#__PURE__*/ (0,_Applicative__WEBPACK_IMPORTED_MODULE_6__.getApplicativeMonoid)(Applicative);


/***/ }),

/***/ "./node_modules/fp-ts/es6/ReaderIO.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/ReaderIO.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApT": () => (/* binding */ ApT),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "FromIO": () => (/* binding */ FromIO),
/* harmony export */   "FromReader": () => (/* binding */ FromReader),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "MonadIO": () => (/* binding */ MonadIO),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSW": () => (/* binding */ apSW),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "apW": () => (/* binding */ apW),
/* harmony export */   "ask": () => (/* binding */ ask),
/* harmony export */   "asks": () => (/* binding */ asks),
/* harmony export */   "asksReaderIO": () => (/* binding */ asksReaderIO),
/* harmony export */   "asksReaderIOW": () => (/* binding */ asksReaderIOW),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bindW": () => (/* binding */ bindW),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainFirstIOK": () => (/* binding */ chainFirstIOK),
/* harmony export */   "chainFirstReaderK": () => (/* binding */ chainFirstReaderK),
/* harmony export */   "chainFirstReaderKW": () => (/* binding */ chainFirstReaderKW),
/* harmony export */   "chainFirstW": () => (/* binding */ chainFirstW),
/* harmony export */   "chainIOK": () => (/* binding */ chainIOK),
/* harmony export */   "chainReaderK": () => (/* binding */ chainReaderK),
/* harmony export */   "chainReaderKW": () => (/* binding */ chainReaderKW),
/* harmony export */   "chainW": () => (/* binding */ chainW),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "flattenW": () => (/* binding */ flattenW),
/* harmony export */   "fromIO": () => (/* binding */ fromIO),
/* harmony export */   "fromIOK": () => (/* binding */ fromIOK),
/* harmony export */   "fromReader": () => (/* binding */ fromReader),
/* harmony export */   "fromReaderK": () => (/* binding */ fromReaderK),
/* harmony export */   "local": () => (/* binding */ local),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseReadonlyArrayWithIndex": () => (/* binding */ traverseReadonlyArrayWithIndex),
/* harmony export */   "traverseReadonlyNonEmptyArrayWithIndex": () => (/* binding */ traverseReadonlyNonEmptyArrayWithIndex)
/* harmony export */ });
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _FromIO__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FromIO */ "./node_modules/fp-ts/es6/FromIO.js");
/* harmony import */ var _FromReader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FromReader */ "./node_modules/fp-ts/es6/FromReader.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _IO__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IO */ "./node_modules/fp-ts/es6/IO.js");
/* harmony import */ var _Reader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reader */ "./node_modules/fp-ts/es6/Reader.js");
/* harmony import */ var _ReaderT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReaderT */ "./node_modules/fp-ts/es6/ReaderT.js");










// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.13.0
 */
var fromReader = /*#__PURE__*/ _ReaderT__WEBPACK_IMPORTED_MODULE_0__.fromReader(_IO__WEBPACK_IMPORTED_MODULE_1__.Pointed);
/**
 * @category conversions
 * @since 2.13.0
 */
var fromIO = /*#__PURE__*/ _Reader__WEBPACK_IMPORTED_MODULE_2__.of;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @since 2.13.0
 */
var local = _Reader__WEBPACK_IMPORTED_MODULE_2__.local;
/**
 * Less strict version of [`asksReaderIO`](#asksreaderio).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category constructors
 * @since 2.13.0
 */
var asksReaderIOW = _Reader__WEBPACK_IMPORTED_MODULE_2__.asksReaderW;
/**
 * Effectfully accesses the environment.
 *
 * @category constructors
 * @since 2.13.0
 */
var asksReaderIO = asksReaderIOW;
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_3__.pipe)(fa, map(f)); };
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_3__.pipe)(fab, ap(fa)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.13.0
 */
var map = /*#__PURE__*/ _ReaderT__WEBPACK_IMPORTED_MODULE_0__.map(_IO__WEBPACK_IMPORTED_MODULE_1__.Functor);
/**
 * @since 2.13.0
 */
var ap = 
/*#__PURE__*/ _ReaderT__WEBPACK_IMPORTED_MODULE_0__.ap(_IO__WEBPACK_IMPORTED_MODULE_1__.Apply);
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @since 2.13.0
 */
var apW = ap;
/**
 * @category constructors
 * @since 2.13.0
 */
var of = /*#__PURE__*/ _ReaderT__WEBPACK_IMPORTED_MODULE_0__.of(_IO__WEBPACK_IMPORTED_MODULE_1__.Pointed);
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_3__.dual)(2, _ReaderT__WEBPACK_IMPORTED_MODULE_0__.flatMap(_IO__WEBPACK_IMPORTED_MODULE_1__.Monad));
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chain = flatMap;
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainW = flatMap;
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
var flattenW = 
/*#__PURE__*/ chainW(_function__WEBPACK_IMPORTED_MODULE_3__.identity);
/**
 * @category sequencing
 * @since 2.13.0
 */
var flatten = flattenW;
/**
 * @category type lambdas
 * @since 2.13.0
 */
var URI = 'ReaderIO';
/**
 * @category instances
 * @since 2.13.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.13.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_4__.flap)(Functor);
/**
 * @category instances
 * @since 2.13.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.13.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.13.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apFirst)(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.13.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apSecond)(Apply);
/**
 * @category instances
 * @since 2.13.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.13.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.13.0
 */
var Monad = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.13.0
 */
var MonadIO = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    fromIO: fromIO
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainFirst = 
/*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_6__.chainFirst)(Chain);
/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainFirstW = chainFirst;
/**
 * @category instances
 * @since 2.13.0
 */
var FromIO = {
    URI: URI,
    fromIO: fromIO
};
/**
 * @category lifting
 * @since 2.13.0
 */
var fromIOK = /*#__PURE__*/ (0,_FromIO__WEBPACK_IMPORTED_MODULE_7__.fromIOK)(FromIO);
/**
 * @category sequencing
 * @since 2.13.0
 */
var chainIOK = 
/*#__PURE__*/ (0,_FromIO__WEBPACK_IMPORTED_MODULE_7__.chainIOK)(FromIO, Chain);
/**
 * @category sequencing
 * @since 2.13.0
 */
var chainFirstIOK = 
/*#__PURE__*/ (0,_FromIO__WEBPACK_IMPORTED_MODULE_7__.chainFirstIOK)(FromIO, Chain);
/**
 * @category instances
 * @since 2.13.0
 */
var FromReader = {
    URI: URI,
    fromReader: fromReader
};
/**
 * Reads the current context.
 *
 * @category constructors
 * @since 2.13.0
 */
var ask = /*#__PURE__*/ (0,_FromReader__WEBPACK_IMPORTED_MODULE_8__.ask)(FromReader);
/**
 * Projects a value from the global context in a `ReaderIO`.
 *
 * @category constructors
 * @since 2.13.0
 */
var asks = /*#__PURE__*/ (0,_FromReader__WEBPACK_IMPORTED_MODULE_8__.asks)(FromReader);
/**
 * @category lifting
 * @since 2.13.0
 */
var fromReaderK = /*#__PURE__*/ (0,_FromReader__WEBPACK_IMPORTED_MODULE_8__.fromReaderK)(FromReader);
/**
 * @category sequencing
 * @since 2.13.0
 */
var chainReaderK = 
/*#__PURE__*/ (0,_FromReader__WEBPACK_IMPORTED_MODULE_8__.chainReaderK)(FromReader, Chain);
/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainReaderKW = chainReaderK;
/**
 * @category sequencing
 * @since 2.13.0
 */
var chainFirstReaderK = 
/*#__PURE__*/ (0,_FromReader__WEBPACK_IMPORTED_MODULE_8__.chainFirstReaderK)(FromReader, Chain);
/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category sequencing
 * @since 2.13.0
 */
var chainFirstReaderKW = chainFirstReaderK;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.13.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_9__.emptyRecord);
/**
 * @category do notation
 * @since 2.13.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_4__.bindTo)(Functor);
/**
 * @category do notation
 * @since 2.13.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_6__.bind)(Chain);
/**
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
var bindW = bind;
/**
 * @category do notation
 * @since 2.13.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apS)(Apply);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the environment types will be merged.
 *
 * @category do notation
 * @since 2.13.0
 */
var apSW = apS;
/**
 * @since 2.13.0
 */
var ApT = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_9__.emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_3__.flow)(_Reader__WEBPACK_IMPORTED_MODULE_2__.traverseReadonlyNonEmptyArrayWithIndex(f), _Reader__WEBPACK_IMPORTED_MODULE_2__.map(_IO__WEBPACK_IMPORTED_MODULE_1__.traverseReadonlyNonEmptyArrayWithIndex(_function__WEBPACK_IMPORTED_MODULE_3__.SK)));
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (_internal__WEBPACK_IMPORTED_MODULE_9__.isNonEmpty(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.13.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(_function__WEBPACK_IMPORTED_MODULE_3__.identity);


/***/ }),

/***/ "./node_modules/fp-ts/es6/ReaderT.js":
/*!*******************************************!*\
  !*** ./node_modules/fp-ts/es6/ReaderT.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "fromNaturalTransformation": () => (/* binding */ fromNaturalTransformation),
/* harmony export */   "fromReader": () => (/* binding */ fromReader),
/* harmony export */   "getReaderM": () => (/* binding */ getReaderM),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "of": () => (/* binding */ of)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");

function of(F) {
    return function (a) { return function () { return F.of(a); }; };
}
function map(F) {
    return function (f) { return function (fa) { return function (r) { return F.map(fa(r), f); }; }; };
}
function ap(F) {
    return function (fa) { return function (fab) { return function (r) { return F.ap(fab(r), fa(r)); }; }; };
}
function chain(M) {
    var flatMapM = flatMap(M);
    return function (f) { return function (ma) { return flatMapM(ma, f); }; };
}
/** @internal */
function flatMap(M) {
    return function (ma, f) { return function (r) { return M.chain(ma(r), function (a) { return f(a)(r); }); }; };
}
function fromReader(F) {
    return function (ma) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(ma, F.of); };
}
function fromNaturalTransformation(nt) {
    return function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, nt); };
}
/** @deprecated */
/* istanbul ignore next */
function getReaderM(M) {
    var _ap = ap(M);
    var _map = map(M);
    var _chain = chain(M);
    return {
        map: function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, _map(f)); },
        ap: function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fab, _ap(fa)); },
        of: of(M),
        chain: function (ma, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ma, _chain(f)); },
        ask: function () { return M.of; },
        asks: function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(f, M.of); },
        local: function (ma, f) { return function (q) { return ma(f(q)); }; },
        fromReader: fromReader(M),
        fromM: function (ma) { return function () { return ma; }; }
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/ReadonlyArray.js":
/*!*************************************************!*\
  !*** ./node_modules/fp-ts/es6/ReadonlyArray.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Alternative": () => (/* binding */ Alternative),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "ChainRecBreadthFirst": () => (/* binding */ ChainRecBreadthFirst),
/* harmony export */   "ChainRecDepthFirst": () => (/* binding */ ChainRecDepthFirst),
/* harmony export */   "Compactable": () => (/* binding */ Compactable),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Filterable": () => (/* binding */ Filterable),
/* harmony export */   "FilterableWithIndex": () => (/* binding */ FilterableWithIndex),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FoldableWithIndex": () => (/* binding */ FoldableWithIndex),
/* harmony export */   "FromEither": () => (/* binding */ FromEither),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "FunctorWithIndex": () => (/* binding */ FunctorWithIndex),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "TraversableWithIndex": () => (/* binding */ TraversableWithIndex),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "Unfoldable": () => (/* binding */ Unfoldable),
/* harmony export */   "Witherable": () => (/* binding */ Witherable),
/* harmony export */   "Zero": () => (/* binding */ Zero),
/* harmony export */   "_chainRecBreadthFirst": () => (/* binding */ _chainRecBreadthFirst),
/* harmony export */   "_chainRecDepthFirst": () => (/* binding */ _chainRecDepthFirst),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "appendW": () => (/* binding */ appendW),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainRecBreadthFirst": () => (/* binding */ chainRecBreadthFirst),
/* harmony export */   "chainRecDepthFirst": () => (/* binding */ chainRecDepthFirst),
/* harmony export */   "chainWithIndex": () => (/* binding */ chainWithIndex),
/* harmony export */   "chop": () => (/* binding */ chop),
/* harmony export */   "chunksOf": () => (/* binding */ chunksOf),
/* harmony export */   "compact": () => (/* binding */ compact),
/* harmony export */   "comprehension": () => (/* binding */ comprehension),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "concatW": () => (/* binding */ concatW),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "deleteAt": () => (/* binding */ deleteAt),
/* harmony export */   "difference": () => (/* binding */ difference),
/* harmony export */   "dropLeft": () => (/* binding */ dropLeft),
/* harmony export */   "dropLeftWhile": () => (/* binding */ dropLeftWhile),
/* harmony export */   "dropRight": () => (/* binding */ dropRight),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterE": () => (/* binding */ filterE),
/* harmony export */   "filterMap": () => (/* binding */ filterMap),
/* harmony export */   "filterMapWithIndex": () => (/* binding */ filterMapWithIndex),
/* harmony export */   "filterWithIndex": () => (/* binding */ filterWithIndex),
/* harmony export */   "findFirst": () => (/* binding */ findFirst),
/* harmony export */   "findFirstMap": () => (/* binding */ findFirstMap),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "findLastIndex": () => (/* binding */ findLastIndex),
/* harmony export */   "findLastMap": () => (/* binding */ findLastMap),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "foldLeft": () => (/* binding */ foldLeft),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "foldMapWithIndex": () => (/* binding */ foldMapWithIndex),
/* harmony export */   "foldRight": () => (/* binding */ foldRight),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "fromEither": () => (/* binding */ fromEither),
/* harmony export */   "fromEitherK": () => (/* binding */ fromEitherK),
/* harmony export */   "fromOption": () => (/* binding */ fromOption),
/* harmony export */   "fromOptionK": () => (/* binding */ fromOptionK),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate),
/* harmony export */   "getDifferenceMagma": () => (/* binding */ getDifferenceMagma),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getIntersectionSemigroup": () => (/* binding */ getIntersectionSemigroup),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getOrd": () => (/* binding */ getOrd),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getUnionMonoid": () => (/* binding */ getUnionMonoid),
/* harmony export */   "getUnionSemigroup": () => (/* binding */ getUnionSemigroup),
/* harmony export */   "guard": () => (/* binding */ guard),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "intercalate": () => (/* binding */ intercalate),
/* harmony export */   "intersection": () => (/* binding */ intersection),
/* harmony export */   "intersperse": () => (/* binding */ intersperse),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isNonEmpty": () => (/* binding */ isNonEmpty),
/* harmony export */   "isOutOfBound": () => (/* binding */ isOutOfBound),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "lefts": () => (/* binding */ lefts),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "lookup": () => (/* binding */ lookup),
/* harmony export */   "makeBy": () => (/* binding */ makeBy),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapWithIndex": () => (/* binding */ mapWithIndex),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "matchLeft": () => (/* binding */ matchLeft),
/* harmony export */   "matchLeftW": () => (/* binding */ matchLeftW),
/* harmony export */   "matchRight": () => (/* binding */ matchRight),
/* harmony export */   "matchRightW": () => (/* binding */ matchRightW),
/* harmony export */   "matchW": () => (/* binding */ matchW),
/* harmony export */   "modifyAt": () => (/* binding */ modifyAt),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionMap": () => (/* binding */ partitionMap),
/* harmony export */   "partitionMapWithIndex": () => (/* binding */ partitionMapWithIndex),
/* harmony export */   "partitionWithIndex": () => (/* binding */ partitionWithIndex),
/* harmony export */   "prepend": () => (/* binding */ prepend),
/* harmony export */   "prependAll": () => (/* binding */ prependAll),
/* harmony export */   "prependToAll": () => (/* binding */ prependToAll),
/* harmony export */   "prependW": () => (/* binding */ prependW),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "readonlyArray": () => (/* binding */ readonlyArray),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "reduceRightWithIndex": () => (/* binding */ reduceRightWithIndex),
/* harmony export */   "reduceWithIndex": () => (/* binding */ reduceWithIndex),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "rights": () => (/* binding */ rights),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scanLeft": () => (/* binding */ scanLeft),
/* harmony export */   "scanRight": () => (/* binding */ scanRight),
/* harmony export */   "separate": () => (/* binding */ separate),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "snoc": () => (/* binding */ snoc),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "spanLeft": () => (/* binding */ spanLeft),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "takeLeft": () => (/* binding */ takeLeft),
/* harmony export */   "takeLeftWhile": () => (/* binding */ takeLeftWhile),
/* harmony export */   "takeRight": () => (/* binding */ takeRight),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "traverseWithIndex": () => (/* binding */ traverseWithIndex),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "union": () => (/* binding */ union),
/* harmony export */   "uniq": () => (/* binding */ uniq),
/* harmony export */   "unsafeDeleteAt": () => (/* binding */ unsafeDeleteAt),
/* harmony export */   "unsafeInsertAt": () => (/* binding */ unsafeInsertAt),
/* harmony export */   "unsafeUpdateAt": () => (/* binding */ unsafeUpdateAt),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "wilt": () => (/* binding */ wilt),
/* harmony export */   "wither": () => (/* binding */ wither),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zipWith": () => (/* binding */ zipWith)
/* harmony export */ });
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _Eq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/es6/Eq.js");
/* harmony import */ var _FromEither__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./FromEither */ "./node_modules/fp-ts/es6/FromEither.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./number */ "./node_modules/fp-ts/es6/number.js");
/* harmony import */ var _Ord__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/es6/Ord.js");
/* harmony import */ var _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js");
/* harmony import */ var _Separated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Separated */ "./node_modules/fp-ts/es6/Separated.js");
/* harmony import */ var _Witherable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Witherable */ "./node_modules/fp-ts/es6/Witherable.js");
/* harmony import */ var _Zero__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Zero */ "./node_modules/fp-ts/es6/Zero.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};













// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Test whether a `ReadonlyArray` is empty.
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @category refinements
 * @since 2.5.0
 */
var isEmpty = function (as) { return as.length === 0; };
/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category refinements
 * @since 2.5.0
 */
var isNonEmpty = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.isNonEmpty;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
var prepend = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.prepend;
/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @since 2.11.0
 */
var prependW = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.prependW;
/**
 * Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
var append = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.append;
/**
 * Less strict version of [`append`](#append).
 *
 * @since 2.11.0
 */
var appendW = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.appendW;
/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
var makeBy = function (n, f) { return (n <= 0 ? empty : _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.makeBy(f)(n)); };
/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
var replicate = function (n, a) { return makeBy(n, function () { return a; }); };
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? [a] : empty); };
}
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.11.0
 */
var fromOption = function (ma) { return (_internal__WEBPACK_IMPORTED_MODULE_1__.isNone(ma) ? empty : [ma.value]); };
/**
 * Transforms an `Either` to a `ReadonlyArray`.
 *
 * @category conversions
 * @since 2.11.0
 */
var fromEither = function (e) { return (_internal__WEBPACK_IMPORTED_MODULE_1__.isLeft(e) ? empty : [e.right]); };
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(as) : onEmpty();
    };
};
/**
 * @category pattern matching
 * @since 2.11.0
 */
var match = matchW;
/**
 * Less strict version of [`matchLeft`](#matchleft).
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeftW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.head(as), _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.tail(as)) : onEmpty();
    };
};
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchLeft = matchLeftW;
/**
 * Alias of [`matchLeft`](#matchleft).
 *
 * @category pattern matching
 * @since 2.5.0
 */
var foldLeft = matchLeft;
/**
 * Less strict version of [`matchRight`](#matchright).
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRightW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.init(as), _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.last(as)) : onEmpty();
    };
};
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchRight = matchRightW;
/**
 * Alias of [`matchRight`](#matchright).
 *
 * @category pattern matching
 * @since 2.5.0
 */
var foldRight = matchRight;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category sequencing
 * @since 2.7.0
 */
var chainWithIndex = function (f) {
    return function (as) {
        if (isEmpty(as)) {
            return empty;
        }
        var out = [];
        for (var i = 0; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
/**
 * Same as `reduce` but it carries over the intermediate steps.
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @since 2.5.0
 */
var scanLeft = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[0] = b;
        for (var i = 0; i < len; i++) {
            out[i + 1] = f(out[i], as[i]);
        }
        return out;
    };
};
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 2.5.0
 */
var scanRight = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[len] = b;
        for (var i = len - 1; i >= 0; i--) {
            out[i] = f(as[i], out[i + 1]);
        }
        return out;
    };
};
/**
 * Calculate the number of elements in a `ReadonlyArray`.
 *
 * @since 2.10.0
 */
var size = function (as) { return as.length; };
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
var isOutOfBound = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.isOutOfBound;
function lookup(i, as) {
    return as === undefined ? function (as) { return lookup(i, as); } : isOutOfBound(i, as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.none : _internal__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
}
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
var head = function (as) { return (isNonEmpty(as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.some(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.head(as)) : _internal__WEBPACK_IMPORTED_MODULE_1__.none); };
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
var last = function (as) { return (isNonEmpty(as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.some(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.last(as)) : _internal__WEBPACK_IMPORTED_MODULE_1__.none); };
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
var tail = function (as) {
    return isNonEmpty(as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.some(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.tail(as)) : _internal__WEBPACK_IMPORTED_MODULE_1__.none;
};
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
var init = function (as) {
    return isNonEmpty(as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.some(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.init(as)) : _internal__WEBPACK_IMPORTED_MODULE_1__.none;
};
/**
 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
 *
 * @since 2.5.0
 */
var takeLeft = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(0, n);
    };
};
/**
 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeRight(4)), input)
 * assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
 *
 * @since 2.5.0
 */
var takeRight = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(-n);
    };
};
function takeLeftWhile(predicate) {
    return function (as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        var len = out.length;
        return len === as.length ? as : len === 0 ? empty : out;
    };
}
var spanLeftIndex = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var _a = splitAt(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
        return { init: init, rest: rest };
    };
}
/**
 * Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
 *
 * @since 2.5.0
 */
var dropLeft = function (n) {
    return function (as) {
        return n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(n, as.length);
    };
};
/**
 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
 *
 * @since 2.5.0
 */
var dropRight = function (n) {
    return function (as) {
        return n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(0, as.length - n);
    };
};
function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanLeftIndex(as, predicate);
        return i === 0 ? as : i === as.length ? empty : as.slice(i);
    };
}
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
var findIndex = function (predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return _internal__WEBPACK_IMPORTED_MODULE_1__.some(i);
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
};
function findFirst(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return _internal__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
var findFirstMap = function (f) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            var out = f(as[i]);
            if (_internal__WEBPACK_IMPORTED_MODULE_1__.isSome(out)) {
                return out;
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
};
function findLast(predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _internal__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
var findLastMap = function (f) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            var out = f(as[i]);
            if (_internal__WEBPACK_IMPORTED_MODULE_1__.isSome(out)) {
                return out;
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
};
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
var findLastIndex = function (predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _internal__WEBPACK_IMPORTED_MODULE_1__.some(i);
            }
        }
        return _internal__WEBPACK_IMPORTED_MODULE_1__.none;
    };
};
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
var insertAt = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? _internal__WEBPACK_IMPORTED_MODULE_1__.none : _internal__WEBPACK_IMPORTED_MODULE_1__.some(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeInsertAt(i, a, as));
    };
};
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return modifyAt(i, function () { return a; });
};
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
var deleteAt = function (i) {
    return function (as) {
        return isOutOfBound(i, as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.none : _internal__WEBPACK_IMPORTED_MODULE_1__.some(unsafeDeleteAt(i, as));
    };
};
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
var modifyAt = function (i, f) {
    return function (as) {
        return isOutOfBound(i, as) ? _internal__WEBPACK_IMPORTED_MODULE_1__.none : _internal__WEBPACK_IMPORTED_MODULE_1__.some(unsafeUpdateAt(i, f(as[i]), as));
    };
};
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.5.0
 */
var reverse = function (as) { return (as.length <= 1 ? as : as.slice().reverse()); };
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.5.0
 */
var rights = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
var lefts = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.5.0
 */
var sort = function (O) {
    return function (as) {
        return as.length <= 1 ? as : as.slice().sort(O.compare);
    };
};
// TODO: curry and make data-last in v3
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 2.5.0
 */
var zipWith = function (fa, fb, f) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return zipWith(as, bs, function (a, b) { return [a, b]; });
}
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
var unzip = function (as) {
    var fa = [];
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll = function (middle) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.prependAll(middle);
    return function (as) { return (isNonEmpty(as) ? f(as) : as); };
};
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse = function (middle) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.intersperse(middle);
    return function (as) { return (isNonEmpty(as) ? f(as) : as); };
};
/**
 * Rotate a `ReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.5.0
 */
var rotate = function (n) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.rotate(n);
    return function (as) { return (isNonEmpty(as) ? f(as) : as); };
};
function elem(E) {
    return function (a, as) {
        if (as === undefined) {
            var elemE_1 = elem(E);
            return function (as) { return elemE_1(a, as); };
        }
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        for (; i < as.length; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.5.0
 */
var uniq = function (E) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.uniq(E);
    return function (as) { return (isNonEmpty(as) ? f(as) : as); };
};
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.5.0
 */
var sortBy = function (ords) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.sortBy(ords);
    return function (as) { return (isNonEmpty(as) ? f(as) : as); };
};
/**
 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
 * `ReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
 * value and the tail of the `ReadonlyArray`.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return RA.chop(as => {
 *     const { init, rest } = pipe(as, RA.spanLeft((a: A) => S.equals(a, as[0])))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.5.0
 */
var chop = function (f) {
    var g = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.chop(f);
    return function (as) { return (isNonEmpty(as) ? g(as) : empty); };
};
/**
 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
var splitAt = function (n) {
    return function (as) {
        return n >= 1 && isNonEmpty(as) ? _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.splitAt(n)(as) : isEmpty(as) ? [as, empty] : [empty, as];
    };
};
/**
 * Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that:
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `as`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 2.5.0
 */
var chunksOf = function (n) {
    var f = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.chunksOf(n);
    return function (as) { return (isNonEmpty(as) ? f(as) : empty); };
};
/**
 * @category lifting
 * @since 2.11.0
 */
var fromOptionK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromOption(f.apply(void 0, a));
    };
};
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        return isNonEmpty(input)
            ? (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(_ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.head(input), chain(function (x) { return go((0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(scope, append(x)), _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.tail(input)); }))
            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
                : empty;
    };
    return go(empty, input);
}
/**
 * @since 2.11.0
 */
var concatW = function (second) {
    return function (first) {
        return isEmpty(first) ? second : isEmpty(second) ? first : first.concat(second);
    };
};
/**
 * @since 2.11.0
 */
var concat = concatW;
function union(E) {
    var unionE = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.union(E);
    return function (first, second) {
        if (second === undefined) {
            var unionE_1 = union(E);
            return function (second) { return unionE_1(second, first); };
        }
        return isNonEmpty(first) && isNonEmpty(second) ? unionE(second)(first) : isNonEmpty(first) ? first : second;
    };
}
function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, map(f)); };
var _mapWithIndex = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, mapWithIndex(f)); };
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fab, ap(fa)); };
var _filter = function (fa, predicate) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filter(predicate));
};
var _filterMap = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterMap(f)); };
var _partition = function (fa, predicate) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partition(predicate));
};
var _partitionMap = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionMap(f)); };
var _partitionWithIndex = function (fa, predicateWithIndex) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionWithIndex(predicateWithIndex)); };
var _partitionMapWithIndex = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionMapWithIndex(f)); };
var _alt = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, alt(that)); };
var _reduce = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRight(b, f)); };
var _reduceWithIndex = function (fa, b, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceWithIndex(b, f));
};
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, foldMapWithIndexM(f)); };
};
var _reduceRightWithIndex = function (fa, b, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRightWithIndex(b, f));
};
var _filterMapWithIndex = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterMapWithIndex(f)); };
var _filterWithIndex = function (fa, predicateWithIndex) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterWithIndex(predicateWithIndex)); };
var _extend = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, extend(f)); };
var _traverse = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseWithIndexF(f)); };
};
/** @internal */
var _chainRecDepthFirst = function (a, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(a, chainRecDepthFirst(f)); };
/** @internal */
var _chainRecBreadthFirst = function (a, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(a, chainRecBreadthFirst(f)); };
/**
 * @category constructors
 * @since 2.5.0
 */
var of = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.of;
/**
 * @since 2.7.0
 */
var zero = function () { return empty; };
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) {
    return function (fa) {
        return fa.concat(that());
    };
};
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.5.0
 */
var alt = altW;
/**
 * @since 2.5.0
 */
var ap = function (fa) {
    return chain(function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, map(f)); });
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_2__.dual)(2, function (ma, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ma, chainWithIndex(function (_, a) { return f(a); }));
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.5.0
 */
var chain = flatMap;
/**
 * @category sequencing
 * @since 2.5.0
 */
var flatten = /*#__PURE__*/ chain(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.5.0
 */
var map = function (f) { return function (fa) {
    return fa.map(function (a) { return f(a); });
}; };
/**
 * @category mapping
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (fa) {
    return fa.map(function (a, i) { return f(i, a); });
}; };
/**
 * @category filtering
 * @since 2.5.0
 */
var separate = function (fa) {
    var left = [];
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(left, right);
};
/**
 * @category filtering
 * @since 2.5.0
 */
var filter = function (predicate) {
    return function (as) {
        return as.filter(predicate);
    };
};
/**
 * @category filtering
 * @since 2.5.0
 */
var filterMapWithIndex = function (f) {
    return function (fa) {
        var out = [];
        for (var i = 0; i < fa.length; i++) {
            var optionB = f(i, fa[i]);
            if (_internal__WEBPACK_IMPORTED_MODULE_1__.isSome(optionB)) {
                out.push(optionB.value);
            }
        }
        return out;
    };
};
/**
 * @category filtering
 * @since 2.5.0
 */
var filterMap = function (f) {
    return filterMapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category filtering
 * @since 2.5.0
 */
var compact = /*#__PURE__*/ filterMap(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * @category filtering
 * @since 2.5.0
 */
var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionWithIndex = function (predicateWithIndex) {
    return function (as) {
        var left = [];
        var right = [];
        for (var i = 0; i < as.length; i++) {
            var a = as[i];
            if (predicateWithIndex(i, a)) {
                right.push(a);
            }
            else {
                left.push(a);
            }
        }
        return (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(left, right);
    };
};
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionMapWithIndex = function (f) {
    return function (fa) {
        var left = [];
        var right = [];
        for (var i = 0; i < fa.length; i++) {
            var e = f(i, fa[i]);
            if (e._tag === 'Left') {
                left.push(e.left);
            }
            else {
                right.push(e.right);
            }
        }
        return (0,_Separated__WEBPACK_IMPORTED_MODULE_3__.separated)(left, right);
    };
};
/**
 * @category filtering
 * @since 2.5.0
 */
var filterWithIndex = function (predicateWithIndex) {
    return function (as) {
        return as.filter(function (a, i) { return predicateWithIndex(i, a); });
    };
};
/**
 * @since 2.5.0
 */
var extend = function (f) { return function (wa) {
    return wa.map(function (_, i) { return f(wa.slice(i)); });
}; };
/**
 * @since 2.5.0
 */
var duplicate = /*#__PURE__*/ extend(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex = function (M) {
    return function (f) {
        return function (fa) {
            return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (fa) {
    var len = fa.length;
    var out = b;
    for (var i = 0; i < len; i++) {
        out = f(i, out, fa[i]);
    }
    return out;
}; };
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (fa) {
    return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
}; };
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) {
    return function (ta) {
        return _reduce(ta, F.of(zero()), function (fas, fa) {
            return F.ap(F.map(fas, function (as) { return function (a) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(as, append(a)); }; }), fa);
        });
    };
};
/**
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex = function (F) {
    return function (f) {
        return reduceWithIndex(F.of(zero()), function (i, fbs, a) {
            return F.ap(F.map(fbs, function (bs) { return function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(bs, append(b)); }; }), f(i, a));
        });
    };
};
/**
 * @category filtering
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
/**
 * @category filtering
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
/**
 * @since 2.6.6
 */
var unfold = function (b, f) {
    var out = [];
    var bb = b;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var mt = f(bb);
        if (_internal__WEBPACK_IMPORTED_MODULE_1__.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            out.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return out;
};
/**
 * @category type lambdas
 * @since 2.5.0
 */
var URI = 'ReadonlyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
/**
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return (isEmpty(first) ? second : isEmpty(second) ? first : first.concat(second)); }
}); };
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: empty
}); };
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return (0,_Eq__WEBPACK_IMPORTED_MODULE_4__.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
var getOrd = function (O) {
    return (0,_Ord__WEBPACK_IMPORTED_MODULE_5__.fromCompare)(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return _number__WEBPACK_IMPORTED_MODULE_6__.Ord.compare(aLen, bLen);
    });
};
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (E) { return ({
    concat: getUnionSemigroup(E).concat,
    empty: empty
}); };
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (E) {
    var intersectionE = intersection(E);
    return {
        concat: function (first, second) { return intersectionE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function (E) {
    var differenceE = difference(E);
    return {
        concat: function (first, second) { return differenceE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_7__.flap)(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_8__.apFirst)(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_8__.apSecond)(Apply);
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 2.5.0
 */
var chainFirst = 
/*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_9__.chainFirst)(Chain);
/**
 * @category instances
 * @since 2.7.0
 */
var Unfoldable = {
    URI: URI,
    unfold: unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
var Zero = {
    URI: URI,
    zero: zero
};
/**
 * @category do notation
 * @since 2.11.0
 */
var guard = /*#__PURE__*/ (0,_Zero__WEBPACK_IMPORTED_MODULE_10__.guard)(Zero, Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    alt: _alt,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: _map,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var FilterableWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverse: _traverse,
    sequence: sequence,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecDepthFirst = function (f) {
    return function (a) {
        var todo = __spreadArray([], f(a), true);
        var out = [];
        while (todo.length > 0) {
            var e = todo.shift();
            if (_internal__WEBPACK_IMPORTED_MODULE_1__.isLeft(e)) {
                todo.unshift.apply(todo, f(e.left));
            }
            else {
                out.push(e.right);
            }
        }
        return out;
    };
};
/**
 * @category instances
 * @since 2.11.0
 */
var ChainRecDepthFirst = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRecDepthFirst
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecBreadthFirst = function (f) {
    return function (a) {
        var initial = f(a);
        var todo = [];
        var out = [];
        function go(e) {
            if (_internal__WEBPACK_IMPORTED_MODULE_1__.isLeft(e)) {
                f(e.left).forEach(function (v) { return todo.push(v); });
            }
            else {
                out.push(e.right);
            }
        }
        for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
            var e = initial_1[_i];
            go(e);
        }
        while (todo.length > 0) {
            go(todo.shift());
        }
        return out;
    };
};
/**
 * @category instances
 * @since 2.11.0
 */
var ChainRecBreadthFirst = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRecBreadthFirst
};
var _wither = /*#__PURE__*/ (0,_Witherable__WEBPACK_IMPORTED_MODULE_11__.witherDefault)(Traversable, Compactable);
var _wilt = /*#__PURE__*/ (0,_Witherable__WEBPACK_IMPORTED_MODULE_11__.wiltDefault)(Traversable, Compactable);
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI,
    map: _map,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    wither: _wither,
    wilt: _wilt
};
/**
 * Filter values inside a context.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as T from 'fp-ts/Task'
 *
 * const filterE = RA.filterE(T.ApplicativePar)
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       [-1, 2, 3],
 *       filterE((n) => T.of(n > 0))
 *     )(),
 *     [2, 3]
 *   )
 * }
 * test()
 *
 * @since 2.11.0
 */
var filterE = /*#__PURE__*/ (0,_Witherable__WEBPACK_IMPORTED_MODULE_11__.filterE)(Witherable);
/**
 * @category instances
 * @since 2.11.0
 */
var FromEither = {
    URI: URI,
    fromEither: fromEither
};
/**
 * @category lifting
 * @since 2.11.0
 */
var fromEitherK = /*#__PURE__*/ (0,_FromEither__WEBPACK_IMPORTED_MODULE_12__.fromEitherK)(FromEither);
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeInsertAt = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt = function (i, a, as) {
    return isNonEmpty(as) ? _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeUpdateAt(i, a, as) : as;
};
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeDeleteAt = function (i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
/**
 * @category conversions
 * @since 2.5.0
 */
var toArray = function (as) { return as.slice(); };
/**
 * @category conversions
 * @since 2.5.0
 */
var fromArray = function (as) { return (isEmpty(as) ? empty : as.slice()); };
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.5.0
 */
var empty = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.empty;
function every(predicate) {
    return function (as) { return as.every(predicate); };
}
/**
 * Check if a predicate holds true for any array member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 2.9.0
 */
var some = function (predicate) {
    return function (as) {
        return as.some(predicate);
    };
};
/**
 * Alias of [`some`](#some)
 *
 * @since 2.11.0
 */
var exists = some;
/**
 * Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate = function (M) {
    var intercalateM = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.intercalate(M);
    return function (middle) { return match(function () { return M.empty; }, intercalateM(middle)); };
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_1__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_7__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_7__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_9__.bind)(Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_8__.apS)(Apply);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `ReadonlyNonEmptyArray` module instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var range = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.range;
/**
 * Use [`prepend`](#prepend) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var cons = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.cons;
/**
 * Use [`append`](#append) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var snoc = _ReadonlyNonEmptyArray__WEBPACK_IMPORTED_MODULE_0__.snoc;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var prependToAll = prependAll;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RA.Functor` instead of `RA.readonlyArray`
 * (where `RA` is from `import RA from 'fp-ts/ReadonlyArray'`)
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var readonlyArray = {
    URI: URI,
    compact: compact,
    separate: separate,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    alt: _alt,
    zero: zero,
    unfold: unfold,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    extend: _extend,
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Apply": () => (/* binding */ Apply),
/* harmony export */   "Chain": () => (/* binding */ Chain),
/* harmony export */   "Comonad": () => (/* binding */ Comonad),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FoldableWithIndex": () => (/* binding */ FoldableWithIndex),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "FunctorWithIndex": () => (/* binding */ FunctorWithIndex),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Pointed": () => (/* binding */ Pointed),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "TraversableWithIndex": () => (/* binding */ TraversableWithIndex),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "appendW": () => (/* binding */ appendW),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "chainWithIndex": () => (/* binding */ chainWithIndex),
/* harmony export */   "chop": () => (/* binding */ chop),
/* harmony export */   "chunksOf": () => (/* binding */ chunksOf),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "concatAll": () => (/* binding */ concatAll),
/* harmony export */   "concatW": () => (/* binding */ concatW),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "extract": () => (/* binding */ extract),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterWithIndex": () => (/* binding */ filterWithIndex),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "foldMapWithIndex": () => (/* binding */ foldMapWithIndex),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "fromReadonlyArray": () => (/* binding */ fromReadonlyArray),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getUnionSemigroup": () => (/* binding */ getUnionSemigroup),
/* harmony export */   "group": () => (/* binding */ group),
/* harmony export */   "groupBy": () => (/* binding */ groupBy),
/* harmony export */   "groupSort": () => (/* binding */ groupSort),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "intercalate": () => (/* binding */ intercalate),
/* harmony export */   "intersperse": () => (/* binding */ intersperse),
/* harmony export */   "isNonEmpty": () => (/* binding */ isNonEmpty),
/* harmony export */   "isOutOfBound": () => (/* binding */ isOutOfBound),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "let": () => (/* binding */ let_),
/* harmony export */   "makeBy": () => (/* binding */ makeBy),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapWithIndex": () => (/* binding */ mapWithIndex),
/* harmony export */   "matchLeft": () => (/* binding */ matchLeft),
/* harmony export */   "matchRight": () => (/* binding */ matchRight),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "modifyAt": () => (/* binding */ modifyAt),
/* harmony export */   "modifyHead": () => (/* binding */ modifyHead),
/* harmony export */   "modifyLast": () => (/* binding */ modifyLast),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "prepend": () => (/* binding */ prepend),
/* harmony export */   "prependAll": () => (/* binding */ prependAll),
/* harmony export */   "prependToAll": () => (/* binding */ prependToAll),
/* harmony export */   "prependW": () => (/* binding */ prependW),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "readonlyNonEmptyArray": () => (/* binding */ readonlyNonEmptyArray),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "reduceRightWithIndex": () => (/* binding */ reduceRightWithIndex),
/* harmony export */   "reduceWithIndex": () => (/* binding */ reduceWithIndex),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "snoc": () => (/* binding */ snoc),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "traverseWithIndex": () => (/* binding */ traverseWithIndex),
/* harmony export */   "unappend": () => (/* binding */ unappend),
/* harmony export */   "uncons": () => (/* binding */ uncons),
/* harmony export */   "union": () => (/* binding */ union),
/* harmony export */   "uniq": () => (/* binding */ uniq),
/* harmony export */   "unprepend": () => (/* binding */ unprepend),
/* harmony export */   "unsafeInsertAt": () => (/* binding */ unsafeInsertAt),
/* harmony export */   "unsafeUpdateAt": () => (/* binding */ unsafeUpdateAt),
/* harmony export */   "unsnoc": () => (/* binding */ unsnoc),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "updateHead": () => (/* binding */ updateHead),
/* harmony export */   "updateLast": () => (/* binding */ updateLast),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zipWith": () => (/* binding */ zipWith)
/* harmony export */ });
/* harmony import */ var _Apply__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/es6/Apply.js");
/* harmony import */ var _Chain__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/es6/Chain.js");
/* harmony import */ var _Eq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/es6/Eq.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _Ord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/es6/Ord.js");
/* harmony import */ var _Semigroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Semigroup */ "./node_modules/fp-ts/es6/Semigroup.js");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};








// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
var empty = _internal__WEBPACK_IMPORTED_MODULE_0__.emptyReadonlyArray;
/**
 * @internal
 */
var isNonEmpty = _internal__WEBPACK_IMPORTED_MODULE_0__.isNonEmpty;
/**
 * @internal
 */
var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
/**
 * @internal
 */
var prependW = function (head) {
    return function (tail) {
        return __spreadArray([head], tail, true);
    };
};
/**
 * @internal
 */
var prepend = prependW;
/**
 * @internal
 */
var appendW = function (end) {
    return function (init) {
        return __spreadArray(__spreadArray([], init, true), [end], false);
    };
};
/**
 * @internal
 */
var append = appendW;
/**
 * @internal
 */
var unsafeInsertAt = function (i, a, as) {
    if (isNonEmpty(as)) {
        var xs = _internal__WEBPACK_IMPORTED_MODULE_0__.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
/**
 * @internal
 */
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = _internal__WEBPACK_IMPORTED_MODULE_0__.fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};
/**
 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.11.0
 */
var uniq = function (E) {
    return function (as) {
        if (as.length === 1) {
            return as;
        }
        var out = [head(as)];
        var rest = tail(as);
        var _loop_1 = function (a) {
            if (out.every(function (o) { return !E.equals(o, a); })) {
                out.push(a);
            }
        };
        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
            var a = rest_1[_i];
            _loop_1(a);
        }
        return out;
    };
};
/**
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
 *
 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.11.0
 */
var sortBy = function (ords) {
    if (isNonEmpty(ords)) {
        var M = (0,_Ord__WEBPACK_IMPORTED_MODULE_1__.getMonoid)();
        return sort(ords.reduce(M.concat, M.empty));
    }
    return _function__WEBPACK_IMPORTED_MODULE_2__.identity;
};
/**
 * @since 2.11.0
 */
var union = function (E) {
    var uniqE = uniq(E);
    return function (second) { return function (first) { return uniqE((0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(first, concat(second))); }; };
};
/**
 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @since 2.11.0
 */
var rotate = function (n) {
    return function (as) {
        var len = as.length;
        var m = Math.round(n) % len;
        if (isOutOfBound(Math.abs(m), as) || m === 0) {
            return as;
        }
        if (m < 0) {
            var _a = splitAt(-m)(as), f = _a[0], s = _a[1];
            return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(s, concat(f));
        }
        else {
            return rotate(m - len)(as);
        }
    };
};
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
 *
 * @category conversions
 * @since 2.5.0
 */
var fromReadonlyArray = function (as) {
    return isNonEmpty(as) ? _internal__WEBPACK_IMPORTED_MODULE_0__.some(as) : _internal__WEBPACK_IMPORTED_MODULE_0__.none;
};
/**
 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy = function (f) {
    return function (n) {
        var j = Math.max(0, Math.floor(n));
        var out = [f(0)];
        for (var i = 1; i < j; i++) {
            out.push(f(i));
        }
        return out;
    };
};
/**
 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate = function (a) { return makeBy(function () { return a; }); };
/**
 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range = function (start, end) {
    return start <= end ? makeBy(function (i) { return start + i; })(end - start + 1) : [start];
};
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @since 2.9.0
 */
var unprepend = function (as) { return [head(as), tail(as)]; };
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @since 2.9.0
 */
var unappend = function (as) { return [init(as), last(as)]; };
/**
 * @category conversions
 * @since 2.5.0
 */
var fromArray = function (as) { return fromReadonlyArray(as.slice()); };
function concatW(second) {
    return function (first) { return first.concat(second); };
}
function concat(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
/**
 * @since 2.5.0
 */
var reverse = function (as) {
    return as.length === 1 ? as : __spreadArray([last(as)], as.slice(0, -1).reverse(), true);
};
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return empty;
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var a = as[i];
            if (E.equals(a, head)) {
                nea.push(a);
            }
            else {
                out.push(nea);
                head = a;
                nea = [head];
            }
        }
        out.push(nea);
        return out;
    };
}
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @since 2.5.0
 */
var groupBy = function (f) {
    return function (as) {
        var out = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (_internal__WEBPACK_IMPORTED_MODULE_0__.has.call(out, k)) {
                out[k].push(a);
            }
            else {
                out[k] = [a];
            }
        }
        return out;
    };
};
/**
 * @since 2.5.0
 */
var sort = function (O) {
    return function (as) {
        return as.length === 1 ? as : as.slice().sort(O.compare);
    };
};
/**
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return modifyAt(i, function () { return a; });
};
/**
 * @since 2.5.0
 */
var modifyAt = function (i, f) {
    return function (as) {
        return isOutOfBound(i, as) ? _internal__WEBPACK_IMPORTED_MODULE_0__.none : _internal__WEBPACK_IMPORTED_MODULE_0__.some(unsafeUpdateAt(i, f(as[i]), as));
    };
};
/**
 * @since 2.5.1
 */
var zipWith = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return zipWith(as, bs, function (a, b) { return [a, b]; });
}
/**
 * @since 2.5.1
 */
var unzip = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
/**
 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll = function (middle) {
    return function (as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse = function (middle) {
    return function (as) {
        var rest = tail(as);
        return isNonEmpty(rest) ? (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(rest, prependAll(middle), prepend(head(as))) : as;
    };
};
/**
 * @category sequencing
 * @since 2.10.0
 */
var chainWithIndex = function (f) {
    return function (as) {
        var out = _internal__WEBPACK_IMPORTED_MODULE_0__.fromReadonlyNonEmptyArray(f(0, head(as)));
        for (var i = 1; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
/**
 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
 * value and the tail of the `ReadonlyNonEmptyArray`.
 *
 * @since 2.10.0
 */
var chop = function (f) {
    return function (as) {
        var _a = f(as), b = _a[0], rest = _a[1];
        var out = [b];
        var next = rest;
        while (isNonEmpty(next)) {
            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
            out.push(b_1);
            next = rest_2;
        }
        return out;
    };
};
/**
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @since 2.10.0
 */
var splitAt = function (n) {
    return function (as) {
        var m = Math.max(1, n);
        return m >= as.length ? [as, empty] : [(0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(as.slice(1, m), prepend(head(as))), as.slice(m)];
    };
};
/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @since 2.10.0
 */
var chunksOf = function (n) { return chop(splitAt(n)); };
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, map(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, mapWithIndex(f)); };
var _ap = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fab, ap(fa)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(wa, extend(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRight(b, f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, alt(that)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceWithIndex(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRightWithIndex(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseWithIndexF(f)); };
};
/**
 * @category constructors
 * @since 2.5.0
 */
var of = _internal__WEBPACK_IMPORTED_MODULE_0__.singleton;
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
 *     RNEA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) {
    return function (as) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(as, concatW(that()));
    };
};
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.6.2
 */
var alt = altW;
/**
 * @since 2.5.0
 */
var ap = function (as) { return chain(function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(as, map(f)); }); };
/**
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 *
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ (0,_function__WEBPACK_IMPORTED_MODULE_2__.dual)(2, function (ma, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ma, chainWithIndex(function (_, a) { return f(a); }));
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.5.0
 */
var chain = flatMap;
/**
 * @since 2.5.0
 */
var extend = function (f) {
    return function (as) {
        var next = tail(as);
        var out = [f(as)];
        while (isNonEmpty(next)) {
            out.push(f(next));
            next = tail(next);
        }
        return out;
    };
};
/**
 * @since 2.5.0
 */
var duplicate = 
/*#__PURE__*/ extend(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * @category sequencing
 * @since 2.5.0
 */
var flatten = 
/*#__PURE__*/ chain(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.5.0
 */
var map = function (f) {
    return mapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category mapping
 * @since 2.5.0
 */
var mapWithIndex = function (f) {
    return function (as) {
        var out = [f(0, head(as))];
        for (var i = 1; i < as.length; i++) {
            out.push(f(i, as[i]));
        }
        return out;
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMap = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) {
    return function (as) {
        return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
    };
};
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0]));
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) {
    return function (as) {
        return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
    };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) { return traverseWithIndex(F)(_function__WEBPACK_IMPORTED_MODULE_2__.SK); };
/**
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex = function (F) {
    return function (f) {
        return function (as) {
            var out = F.map(f(0, head(as)), of);
            for (var i = 1; i < as.length; i++) {
                out = F.ap(F.map(out, function (bs) { return function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(bs, append(b)); }; }), f(i, as[i]));
            }
            return out;
        };
    };
};
/**
 * @category Comonad
 * @since 2.6.3
 */
var extract = _internal__WEBPACK_IMPORTED_MODULE_0__.head;
/**
 * @category type lambdas
 * @since 2.5.0
 */
var URI = 'ReadonlyNonEmptyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: concat
}); };
/**
 * @example
 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return (0,_Eq__WEBPACK_IMPORTED_MODULE_3__.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
/**
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_4__.flap)(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
var apFirst = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apFirst)(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
var apSecond = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apSecond)(Apply);
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 *
 * @category sequencing
 * @since 2.5.0
 */
var chainFirst = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_6__.chainFirst)(Chain);
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex = {
    URI: URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.7.0
 */
var Comonad = {
    URI: URI,
    map: _map,
    extend: _extend,
    extract: extract
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(_internal__WEBPACK_IMPORTED_MODULE_0__.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_4__.bindTo)(Functor);
var let_ = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_4__["let"])(Functor);

/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ (0,_Chain__WEBPACK_IMPORTED_MODULE_6__.bind)(Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ (0,_Apply__WEBPACK_IMPORTED_MODULE_5__.apS)(Apply);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
var head = extract;
/**
 * @since 2.5.0
 */
var tail = _internal__WEBPACK_IMPORTED_MODULE_0__.tail;
/**
 * @since 2.5.0
 */
var last = function (as) { return as[as.length - 1]; };
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
var init = function (as) { return as.slice(0, -1); };
/**
 * @since 2.5.0
 */
var min = function (O) {
    var S = _Semigroup__WEBPACK_IMPORTED_MODULE_7__.min(O);
    return function (as) { return as.reduce(S.concat); };
};
/**
 * @since 2.5.0
 */
var max = function (O) {
    var S = _Semigroup__WEBPACK_IMPORTED_MODULE_7__.max(O);
    return function (as) { return as.reduce(S.concat); };
};
/**
 * @since 2.10.0
 */
var concatAll = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeft = function (f) {
    return function (as) {
        return f(head(as), tail(as));
    };
};
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRight = function (f) {
    return function (as) {
        return f(init(as), last(as));
    };
};
/**
 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) {
    return function (as) {
        return __spreadArray([f(head(as))], tail(as), true);
    };
};
/**
 * Change the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateHead = function (a) { return modifyHead(function () { return a; }); };
/**
 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) {
    return function (as) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(init(as), append(f(last(as))));
    };
};
/**
 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateLast = function (a) { return modifyLast(function () { return a; }); };
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate = function (S) {
    var concatAllS = concatAll(S);
    return function (middle) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.flow)(intersperse(middle), concatAllS); };
};
function groupSort(O) {
    var sortO = sort(O);
    var groupO = group(O);
    return function (as) { return (isNonEmpty(as) ? groupO(sortO(as)) : empty); };
}
function filter(predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
}
/**
 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var filterWithIndex = function (predicate) {
    return function (as) {
        return fromReadonlyArray(as.filter(function (a, i) { return predicate(i, a); }));
    };
};
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
var uncons = unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
var unsnoc = unappend;
function cons(head, tail) {
    return tail === undefined ? prepend(head) : (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(tail, prepend(head));
}
/**
 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var snoc = function (init, end) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(init, concat([end])); };
/**
 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var insertAt = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? _internal__WEBPACK_IMPORTED_MODULE_0__.none : _internal__WEBPACK_IMPORTED_MODULE_0__.some(unsafeInsertAt(i, a, as));
    };
};
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var prependToAll = prependAll;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var fold = concatAll;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
 * (where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var readonlyNonEmptyArray = {
    URI: URI,
    of: of,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: flatMap,
    extend: _extend,
    extract: extract,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    alt: _alt
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Semigroup.js":
/*!*********************************************!*\
  !*** ./node_modules/fp-ts/es6/Semigroup.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatAll": () => (/* binding */ concatAll),
/* harmony export */   "constant": () => (/* binding */ constant),
/* harmony export */   "first": () => (/* binding */ first),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "getDualSemigroup": () => (/* binding */ getDualSemigroup),
/* harmony export */   "getFirstSemigroup": () => (/* binding */ getFirstSemigroup),
/* harmony export */   "getFunctionSemigroup": () => (/* binding */ getFunctionSemigroup),
/* harmony export */   "getIntercalateSemigroup": () => (/* binding */ getIntercalateSemigroup),
/* harmony export */   "getJoinSemigroup": () => (/* binding */ getJoinSemigroup),
/* harmony export */   "getLastSemigroup": () => (/* binding */ getLastSemigroup),
/* harmony export */   "getMeetSemigroup": () => (/* binding */ getMeetSemigroup),
/* harmony export */   "getObjectSemigroup": () => (/* binding */ getObjectSemigroup),
/* harmony export */   "getStructSemigroup": () => (/* binding */ getStructSemigroup),
/* harmony export */   "getTupleSemigroup": () => (/* binding */ getTupleSemigroup),
/* harmony export */   "intercalate": () => (/* binding */ intercalate),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "semigroupAll": () => (/* binding */ semigroupAll),
/* harmony export */   "semigroupAny": () => (/* binding */ semigroupAny),
/* harmony export */   "semigroupProduct": () => (/* binding */ semigroupProduct),
/* harmony export */   "semigroupString": () => (/* binding */ semigroupString),
/* harmony export */   "semigroupSum": () => (/* binding */ semigroupSum),
/* harmony export */   "semigroupVoid": () => (/* binding */ semigroupVoid),
/* harmony export */   "struct": () => (/* binding */ struct),
/* harmony export */   "tuple": () => (/* binding */ tuple)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");
/* harmony import */ var _Magma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Magma */ "./node_modules/fp-ts/es6/Magma.js");
/* harmony import */ var _Ord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/es6/Ord.js");
/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */




// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.min(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (O) { return ({
    concat: _Ord__WEBPACK_IMPORTED_MODULE_0__.min(O)
}); };
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.max(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (O) { return ({
    concat: _Ord__WEBPACK_IMPORTED_MODULE_0__.max(O)
}); };
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
 *
 * @since 2.10.0
 */
var reverse = _Magma__WEBPACK_IMPORTED_MODULE_1__.reverse;
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = struct<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @since 2.10.0
 */
var struct = function (semigroups) { return ({
    concat: function (first, second) {
        var r = {};
        for (var k in semigroups) {
            if (_internal__WEBPACK_IMPORTED_MODULE_2__.has.call(semigroups, k)) {
                r[k] = semigroups[k].concat(first[k], second[k]);
            }
        }
        return r;
    }
}); };
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Semigroup'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.10.0
 */
var tuple = function () {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return ({
        concat: function (first, second) { return semigroups.map(function (s, i) { return s.concat(first[i], second[i]); }); }
    });
};
/**
 * Between each pair of elements insert `middle`.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
 *
 * @since 2.10.0
 */
var intercalate = function (middle) {
    return function (S) { return ({
        concat: function (x, y) { return S.concat(x, S.concat(middle, y)); }
    }); };
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
var first = function () { return ({ concat: _function__WEBPACK_IMPORTED_MODULE_3__.identity }); };
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var last = function () { return ({ concat: function (_, y) { return y; } }); };
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = concatAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.10.0
 */
var concatAll = _Magma__WEBPACK_IMPORTED_MODULE_1__.concatAll;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `void` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupVoid = constant(undefined);
/**
 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getObjectSemigroup = function () { return ({
    concat: function (first, second) { return Object.assign({}, first, second); }
}); };
/**
 * Use [`last`](#last) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getLastSemigroup = last;
/**
 * Use [`first`](#first) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getFirstSemigroup = first;
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getTupleSemigroup = tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getStructSemigroup = struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getDualSemigroup = reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getJoinSemigroup = max;
/**
 * Use [`min`](#min) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getMeetSemigroup = min;
/**
 * Use [`intercalate`](#intercalate) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var getIntercalateSemigroup = intercalate;
function fold(S) {
    var concatAllS = concatAll(S);
    return function (startWith, as) { return (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as)); };
}
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getFunctionSemigroup = _function__WEBPACK_IMPORTED_MODULE_3__.getSemigroup;
/**
 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupProduct = {
    concat: function (x, y) { return x * y; }
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/Separated.js":
/*!*********************************************!*\
  !*** ./node_modules/fp-ts/es6/Separated.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bifunctor": () => (/* binding */ Bifunctor),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "bimap": () => (/* binding */ bimap),
/* harmony export */   "flap": () => (/* binding */ flap),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapLeft": () => (/* binding */ mapLeft),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "separated": () => (/* binding */ separated)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Functor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/es6/Functor.js");
/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */


// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
var separated = function (left, right) { return ({ left: left, right: right }); };
var _map = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, map(f)); };
var _mapLeft = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, mapLeft(f)); };
var _bimap = function (fa, g, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, bimap(g, f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.10.0
 */
var map = function (f) {
    return function (fa) {
        return separated(left(fa), f(right(fa)));
    };
};
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.10.0
 */
var mapLeft = function (f) {
    return function (fa) {
        return separated(f(left(fa)), right(fa));
    };
};
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.10.0
 */
var bimap = function (f, g) {
    return function (fa) {
        return separated(f(left(fa)), g(right(fa)));
    };
};
/**
 * @category type lambdas
 * @since 2.10.0
 */
var URI = 'Separated';
/**
 * @category instances
 * @since 2.10.0
 */
var Bifunctor = {
    URI: URI,
    mapLeft: _mapLeft,
    bimap: _bimap
};
/**
 * @category instances
 * @since 2.10.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ (0,_Functor__WEBPACK_IMPORTED_MODULE_1__.flap)(Functor);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
var left = function (s) { return s.left; };
/**
 * @since 2.10.0
 */
var right = function (s) { return s.right; };


/***/ }),

/***/ "./node_modules/fp-ts/es6/Witherable.js":
/*!**********************************************!*\
  !*** ./node_modules/fp-ts/es6/Witherable.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterE": () => (/* binding */ filterE),
/* harmony export */   "wiltDefault": () => (/* binding */ wiltDefault),
/* harmony export */   "witherDefault": () => (/* binding */ witherDefault)
/* harmony export */ });
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/fp-ts/es6/internal.js");

function wiltDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
function witherDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _internal__WEBPACK_IMPORTED_MODULE_0__.some(a) : _internal__WEBPACK_IMPORTED_MODULE_0__.none); }); }); }; };
    };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Zero.js":
/*!****************************************!*\
  !*** ./node_modules/fp-ts/es6/Zero.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "guard": () => (/* binding */ guard)
/* harmony export */ });
function guard(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/function.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/function.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SK": () => (/* binding */ SK),
/* harmony export */   "absurd": () => (/* binding */ absurd),
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "constFalse": () => (/* binding */ constFalse),
/* harmony export */   "constNull": () => (/* binding */ constNull),
/* harmony export */   "constTrue": () => (/* binding */ constTrue),
/* harmony export */   "constUndefined": () => (/* binding */ constUndefined),
/* harmony export */   "constVoid": () => (/* binding */ constVoid),
/* harmony export */   "constant": () => (/* binding */ constant),
/* harmony export */   "decrement": () => (/* binding */ decrement),
/* harmony export */   "dual": () => (/* binding */ dual),
/* harmony export */   "flip": () => (/* binding */ flip),
/* harmony export */   "flow": () => (/* binding */ flow),
/* harmony export */   "getBooleanAlgebra": () => (/* binding */ getBooleanAlgebra),
/* harmony export */   "getEndomorphismMonoid": () => (/* binding */ getEndomorphismMonoid),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getRing": () => (/* binding */ getRing),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getSemiring": () => (/* binding */ getSemiring),
/* harmony export */   "hole": () => (/* binding */ hole),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "increment": () => (/* binding */ increment),
/* harmony export */   "not": () => (/* binding */ not),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "tuple": () => (/* binding */ tuple),
/* harmony export */   "tupled": () => (/* binding */ tupled),
/* harmony export */   "unsafeCoerce": () => (/* binding */ unsafeCoerce),
/* harmony export */   "untupled": () => (/* binding */ untupled)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var getBooleanAlgebra = function (B) {
    return function () { return ({
        meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
        join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
        zero: function () { return B.zero; },
        one: function () { return B.one; },
        implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
        not: function (x) { return function (a) { return B.not(x(a)); }; }
    }); };
};
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function (S) {
    return function () { return ({
        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
    }); };
};
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getMonoid = function (M) {
    var getSemigroupM = getSemigroup(M);
    return function () { return ({
        concat: getSemigroupM().concat,
        empty: function () { return M.empty; }
    }); };
};
/**
 * @category instances
 * @since 2.10.0
 */
var getSemiring = function (S) { return ({
    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
    zero: function () { return S.zero; },
    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
    one: function () { return S.one; }
}); };
/**
 * @category instances
 * @since 2.10.0
 */
var getRing = function (R) {
    var S = getSemiring(R);
    return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
    };
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var apply = function (a) {
    return function (f) {
        return f(a);
    };
};
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
/**
 * @since 2.0.0
 */
var unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
var constTrue = /*#__PURE__*/ constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
var constFalse = /*#__PURE__*/ constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
var constNull = /*#__PURE__*/ constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
var constUndefined = /*#__PURE__*/ constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
var constVoid = constUndefined;
function flip(f) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 1) {
            return f(args[1], args[0]);
        }
        return function (a) { return f(a)(args[0]); };
    };
}
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
            var ret = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
        }
    }
}
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
var hole = absurd;
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
/**
 * Use `Predicate` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
/**
 * Use `Endomorphism` module instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return ({
    concat: function (first, second) { return flow(first, second); },
    empty: identity
}); };
/** @internal */
var dual = function (arity, body) {
    var isDataFirst = typeof arity === 'number' ? function (args) { return args.length >= arity; } : arity;
    return function () {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
            return body.apply(this, args);
        }
        return function (self) { return body.apply(void 0, __spreadArray([self], args, false)); };
    };
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/internal.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/internal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyReadonlyArray": () => (/* binding */ emptyReadonlyArray),
/* harmony export */   "emptyRecord": () => (/* binding */ emptyRecord),
/* harmony export */   "fromReadonlyNonEmptyArray": () => (/* binding */ fromReadonlyNonEmptyArray),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "isLeft": () => (/* binding */ isLeft),
/* harmony export */   "isNonEmpty": () => (/* binding */ isNonEmpty),
/* harmony export */   "isNone": () => (/* binding */ isNone),
/* harmony export */   "isRight": () => (/* binding */ isRight),
/* harmony export */   "isSome": () => (/* binding */ isSome),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "none": () => (/* binding */ none),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "tail": () => (/* binding */ tail)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isNone = function (fa) { return fa._tag === 'None'; };
/** @internal */
var isSome = function (fa) { return fa._tag === 'Some'; };
/** @internal */
var none = { _tag: 'None' };
/** @internal */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft = function (ma) { return ma._tag === 'Left'; };
/** @internal */
var isRight = function (ma) { return ma._tag === 'Right'; };
/** @internal */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
/** @internal */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var singleton = function (a) { return [a]; };
/** @internal */
var isNonEmpty = function (as) { return as.length > 0; };
/** @internal */
var head = function (as) { return as[0]; };
/** @internal */
var tail = function (as) { return as.slice(1); };
// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------
/** @internal */
var emptyReadonlyArray = [];
/** @internal */
var emptyRecord = {};
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
var has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1), true); };


/***/ }),

/***/ "./node_modules/fp-ts/es6/number.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/number.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bounded": () => (/* binding */ Bounded),
/* harmony export */   "Eq": () => (/* binding */ Eq),
/* harmony export */   "Field": () => (/* binding */ Field),
/* harmony export */   "MagmaSub": () => (/* binding */ MagmaSub),
/* harmony export */   "MonoidProduct": () => (/* binding */ MonoidProduct),
/* harmony export */   "MonoidSum": () => (/* binding */ MonoidSum),
/* harmony export */   "Ord": () => (/* binding */ Ord),
/* harmony export */   "SemigroupProduct": () => (/* binding */ SemigroupProduct),
/* harmony export */   "SemigroupSum": () => (/* binding */ SemigroupSum),
/* harmony export */   "Show": () => (/* binding */ Show),
/* harmony export */   "isNumber": () => (/* binding */ isNumber)
/* harmony export */ });
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @category refinements
 * @since 2.11.0
 */
var isNumber = function (u) { return typeof u === 'number'; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var Ord = {
    equals: Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @category instances
 * @since 2.10.0
 */
var Bounded = {
    equals: Eq.equals,
    compare: Ord.compare,
    top: Infinity,
    bottom: -Infinity
};
/**
 * @category instances
 * @since 2.10.0
 */
var Show = {
    show: function (n) { return JSON.stringify(n); }
};
/**
 * @category instances
 * @since 2.11.0
 */
var MagmaSub = {
    concat: function (first, second) { return first - second; }
};
/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.10.0
 */
var SemigroupSum = {
    concat: function (first, second) { return first + second; }
};
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.10.0
 */
var SemigroupProduct = {
    concat: function (first, second) { return first * second; }
};
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var MonoidSum = {
    concat: SemigroupSum.concat,
    empty: 0
};
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var MonoidProduct = {
    concat: SemigroupProduct.concat,
    empty: 1
};
/**
 * @category instances
 * @since 2.10.0
 */
var Field = {
    add: SemigroupSum.concat,
    zero: 0,
    mul: SemigroupProduct.concat,
    one: 1,
    sub: MagmaSub.concat,
    degree: function (_) { return 1; },
    div: function (first, second) { return first / second; },
    mod: function (first, second) { return first % second; }
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/Apply.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/lib/Apply.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequenceS = exports.sequenceT = exports.getApplySemigroup = exports.apS = exports.apSecond = exports.apFirst = exports.ap = void 0;
/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
 * const fa: O.Option<string> = O.some('s')
 * const fb: O.Option<number> = O.some(1)
 * const fc: O.Option<boolean> = O.some(true)
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     // lift a function
 *     O.some(f),
 *     // apply the first argument
 *     O.ap(fa),
 *     // apply the second argument
 *     O.ap(fb),
 *     // apply the third argument
 *     O.ap(fc)
 *   ),
 *   O.some('s1true')
 * )
 *
 * @since 2.0.0
 */
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
function ap(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
exports.ap = ap;
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
exports.apFirst = apFirst;
function apSecond(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
exports.apSecond = apSecond;
function apS(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
exports.apS = apS;
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
exports.getApplySemigroup = getApplySemigroup;
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!_.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
exports.sequenceT = sequenceT;
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}
exports.sequenceS = sequenceS;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Chain.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/lib/Chain.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bind = exports.chainFirst = void 0;
function chainFirst(M) {
    return function (f) { return function (first) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); }; };
}
exports.chainFirst = chainFirst;
function bind(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}
exports.bind = bind;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Console.js":
/*!*******************************************!*\
  !*** ./node_modules/fp-ts/lib/Console.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.info = exports.error = exports.warn = exports.log = void 0;
/**
 * @since 2.0.0
 */
var log = function (a) {
    return function () {
        return console.log(a);
    };
};
exports.log = log;
/**
 * @since 2.0.0
 */
var warn = function (a) {
    return function () {
        return console.warn(a);
    };
};
exports.warn = warn;
/**
 * @since 2.0.0
 */
var error = function (a) {
    return function () {
        return console.error(a);
    };
};
exports.error = error;
/**
 * @since 2.0.0
 */
var info = function (a) {
    return function () {
        return console.info(a);
    };
};
exports.info = info;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Endomorphism.js":
/*!************************************************!*\
  !*** ./node_modules/fp-ts/lib/Endomorphism.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @since 2.11.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMonoid = exports.getSemigroup = exports.URI = void 0;
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
/**
 * @category type lambdas
 * @since 2.11.0
 */
exports.URI = 'Endomorphism';
/**
 * Endomorphism form a `Semigroup` where the `concat` operation is the usual function composition.
 *
 * @category instances
 * @since 2.11.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return (0, function_1.flow)(first, second); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Endomorphism form a `Monoid` where the `empty` value is the `identity` function.
 *
 * @category instances
 * @since 2.11.0
 */
var getMonoid = function () { return ({
    concat: (0, exports.getSemigroup)().concat,
    empty: function_1.identity
}); };
exports.getMonoid = getMonoid;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Eq.js":
/*!**************************************!*\
  !*** ./node_modules/fp-ts/lib/Eq.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eqDate = exports.eqNumber = exports.eqString = exports.eqBoolean = exports.eq = exports.strictEqual = exports.getStructEq = exports.getTupleEq = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.eqStrict = exports.URI = exports.contramap = exports.tuple = exports.struct = exports.fromEquals = void 0;
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromEquals = function (equals) { return ({
    equals: function (x, y) { return x === y || equals(x, y); }
}); };
exports.fromEquals = fromEquals;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
var struct = function (eqs) {
    return (0, exports.fromEquals)(function (first, second) {
        for (var key in eqs) {
            if (!eqs[key].equals(first[key], second[key])) {
                return false;
            }
        }
        return true;
    });
};
exports.struct = struct;
/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @example
 * import { tuple } from 'fp-ts/Eq'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import * as B from 'fp-ts/boolean'
 *
 * const E = tuple(S.Eq, N.Eq, B.Eq)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
 *
 * @since 2.10.0
 */
var tuple = function () {
    var eqs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        eqs[_i] = arguments[_i];
    }
    return (0, exports.fromEquals)(function (first, second) { return eqs.every(function (E, i) { return E.equals(first[i], second[i]); }); });
};
exports.tuple = tuple;
/* istanbul ignore next */
var contramap_ = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.contramap)(f)); };
/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Eq<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for equality (meaning we have an `Eq<X>`)
 *
 * For example, given the following `User` type, we want to construct an `Eq<User>` that just looks at the `key` field
 * for each user (since it's known to be unique).
 *
 * If we have a way of comparing `UUID`s for equality (`eqUUID: Eq<UUID>`) and we know how to go from `User -> UUID`,
 * using `contramap` we can do this
 *
 * @example
 * import { contramap, Eq } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/string'
 *
 * type UUID = string
 *
 * interface User {
 *   readonly key: UUID
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const eqUUID: Eq<UUID> = S.Eq
 *
 * const eqUserByKey: Eq<User> = pipe(
 *   eqUUID,
 *   contramap((user) => user.key)
 * )
 *
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k2', firstName: 'a1', lastName: 'b1' }
 *   ),
 *   false
 * )
 * assert.deepStrictEqual(
 *   eqUserByKey.equals(
 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
 *     { key: 'k1', firstName: 'a2', lastName: 'b1' }
 *   ),
 *   true
 * )
 *
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return (0, exports.fromEquals)(function (x, y) { return fa.equals(f(x), f(y)); });
}; };
exports.contramap = contramap;
/**
 * @category type lambdas
 * @since 2.0.0
 */
exports.URI = 'Eq';
/**
 * @category instances
 * @since 2.5.0
 */
exports.eqStrict = {
    equals: function (a, b) { return a === b; }
};
var empty = {
    equals: function () { return true; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (x, y) { return (0, exports.fromEquals)(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * @category instances
 * @since 2.6.0
 */
var getMonoid = function () { return ({
    concat: (0, exports.getSemigroup)().concat,
    empty: empty
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleEq = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getStructEq = exports.struct;
/**
 * Use [`eqStrict`](#eqstrict) instead
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.strictEqual = exports.eqStrict.equals;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Contravariant` instance, pass `E.Contravariant` instead of `E.eq`
 * (where `E` is from `import E from 'fp-ts/Eq'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.eq = exports.Contravariant;
/**
 * Use [`Eq`](./boolean.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.eqBoolean = exports.eqStrict;
/**
 * Use [`Eq`](./string.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.eqString = exports.eqStrict;
/**
 * Use [`Eq`](./number.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.eqNumber = exports.eqStrict;
/**
 * Use [`Eq`](./Date.ts.html#eq) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.eqDate = {
    equals: function (first, second) { return first.valueOf() === second.valueOf(); }
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/FromEither.js":
/*!**********************************************!*\
  !*** ./node_modules/fp-ts/lib/FromEither.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterOrElse = exports.chainFirstEitherK = exports.chainEitherK = exports.fromEitherK = exports.chainOptionK = exports.fromOptionK = exports.fromPredicate = exports.fromOption = void 0;
var Chain_1 = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/lib/Chain.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_.isNone(ma) ? _.left(onNone()) : _.right(ma.value)); }; };
}
exports.fromOption = fromOption;
function fromPredicate(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a)));
        };
    };
}
exports.fromPredicate = fromPredicate;
function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return (0, function_1.flow)(f, from); };
    };
}
exports.fromOptionK = fromOptionK;
function chainOptionK(F, M) {
    var fromOptionKF = fromOptionK(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
exports.chainOptionK = chainOptionK;
function fromEitherK(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromEither); };
}
exports.fromEitherK = fromEitherK;
function chainEitherK(F, M) {
    var fromEitherKF = fromEitherK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
exports.chainEitherK = chainEitherK;
function chainFirstEitherK(F, M) {
    return (0, function_1.flow)(fromEitherK(F), (0, Chain_1.chainFirst)(M));
}
exports.chainFirstEitherK = chainFirstEitherK;
function filterOrElse(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _.right(a) : _.left(onFalse(a))); });
        };
    };
}
exports.filterOrElse = filterOrElse;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Functor.js":
/*!*******************************************!*\
  !*** ./node_modules/fp-ts/lib/Functor.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFunctorComposition = exports["let"] = exports.bindTo = exports.flap = exports.map = void 0;
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
function map(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
exports.map = map;
function flap(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
exports.flap = flap;
function bindTo(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
exports.bindTo = bindTo;
function let_(F) {
    return function (name, f) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
    }); }; };
}
exports["let"] = let_;
/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map(F, G);
    return {
        map: function (fga, f) { return (0, function_1.pipe)(fga, _map(f)); }
    };
}
exports.getFunctorComposition = getFunctorComposition;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Magma.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/lib/Magma.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 2.0.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatAll = exports.endo = exports.filterSecond = exports.filterFirst = exports.reverse = void 0;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @since 2.11.0
 */
var reverse = function (M) { return ({
    concat: function (first, second) { return M.concat(second, first); }
}); };
exports.reverse = reverse;
/**
 * @since 2.11.0
 */
var filterFirst = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(first) ? M.concat(first, second) : second); }
    }); };
};
exports.filterFirst = filterFirst;
/**
 * @since 2.11.0
 */
var filterSecond = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(second) ? M.concat(first, second) : first); }
    }); };
};
exports.filterSecond = filterSecond;
/**
 * @since 2.11.0
 */
var endo = function (f) {
    return function (M) { return ({
        concat: function (first, second) { return M.concat(f(first), f(second)); }
    }); };
};
exports.endo = endo;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
var concatAll = function (M) {
    return function (startWith) {
        return function (as) {
            return as.reduce(function (a, acc) { return M.concat(a, acc); }, startWith);
        };
    };
};
exports.concatAll = concatAll;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Monoid.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/lib/Monoid.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.monoidProduct = exports.monoidSum = exports.monoidString = exports.getEndomorphismMonoid = exports.getFunctionMonoid = exports.monoidAny = exports.monoidAll = exports.fold = exports.getMeetMonoid = exports.getJoinMonoid = exports.getDualMonoid = exports.getStructMonoid = exports.getTupleMonoid = exports.monoidVoid = exports.concatAll = exports.tuple = exports.struct = exports.reverse = exports.max = exports.min = void 0;
var Endomorphism_1 = __webpack_require__(/*! ./Endomorphism */ "./node_modules/fp-ts/lib/Endomorphism.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
var Se = __importStar(__webpack_require__(/*! ./Semigroup */ "./node_modules/fp-ts/lib/Semigroup.js"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a monoid where `concat` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.min(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (B) { return ({
    concat: Se.min(B).concat,
    empty: B.top
}); };
exports.min = min;
/**
 * Get a monoid where `concat` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as M from 'fp-ts/Monoid'
 *
 * const M1 = M.max(N.Bounded)
 *
 * assert.deepStrictEqual(M1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (B) { return ({
    concat: Se.max(B).concat,
    empty: B.bottom
}); };
exports.max = max;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Monoid'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Monoid).concat('a', 'b'), 'ba')
 *
 * @since 2.10.0
 */
var reverse = function (M) { return ({
    concat: Se.reverse(M).concat,
    empty: M.empty
}); };
exports.reverse = reverse;
/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const M = struct<Point>({
 *   x: N.MonoidSum,
 *   y: N.MonoidSum
 * })
 *
 * assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @since 2.10.0
 */
var struct = function (monoids) {
    var empty = {};
    for (var k in monoids) {
        if (_.has.call(monoids, k)) {
            empty[k] = monoids[k].empty;
        }
    }
    return {
        concat: Se.struct(monoids).concat,
        empty: empty
    };
};
exports.struct = struct;
/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Monoid'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const M1 = tuple(S.Monoid, N.MonoidSum)
 * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
 * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.10.0
 */
var tuple = function () {
    var monoids = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        monoids[_i] = arguments[_i];
    }
    return ({
        concat: Se.tuple.apply(Se, monoids).concat,
        empty: monoids.map(function (m) { return m.empty; })
    });
};
exports.tuple = tuple;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
 * assert.deepStrictEqual(concatAll(N.MonoidSum)([]), 0)
 *
 * @since 2.10.0
 */
var concatAll = function (M) { return Se.concatAll(M)(M.empty); };
exports.concatAll = concatAll;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`Monoid`](./void.ts.html#monoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidVoid = {
    concat: Se.semigroupVoid.concat,
    empty: undefined
};
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleMonoid = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getStructMonoid = exports.struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getDualMonoid = exports.reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getJoinMonoid = exports.max;
/**
 * Use [`min`](#min) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getMeetMonoid = exports.min;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.fold = exports.concatAll;
/**
 * Use [`MonoidAll`](./boolean.ts.html#monoidall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidAll = {
    concat: Se.semigroupAll.concat,
    empty: true
};
/**
 * Use [`MonoidAny`](./boolean.ts.html#monoidany) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidAny = {
    concat: Se.semigroupAny.concat,
    empty: false
};
/**
 * Use [`getMonoid`](./function.ts.html#getmonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getFunctionMonoid = function_1.getMonoid;
/**
 * Use [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) instead.
 *
 * **Note**. The execution order in [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) is reversed.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return (0, exports.reverse)((0, Endomorphism_1.getMonoid)()); };
exports.getEndomorphismMonoid = getEndomorphismMonoid;
/**
 * Use [`Monoid`](./string.ts.html#monoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidString = {
    concat: Se.semigroupString.concat,
    empty: ''
};
/**
 * Use [`MonoidSum`](./number.ts.html#monoidsum) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidSum = {
    concat: Se.semigroupSum.concat,
    empty: 0
};
/**
 * Use [`MonoidProduct`](./number.ts.html#monoidproduct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.monoidProduct = {
    concat: Se.semigroupProduct.concat,
    empty: 1
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/Ord.js":
/*!***************************************!*\
  !*** ./node_modules/fp-ts/lib/Ord.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ordDate = exports.ordNumber = exports.ordString = exports.ordBoolean = exports.ord = exports.getDualOrd = exports.getTupleOrd = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.equals = exports.trivial = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.URI = exports.contramap = exports.reverse = exports.tuple = exports.fromCompare = exports.equalsDefault = void 0;
var Eq_1 = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/lib/Eq.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------
/**
 * @category defaults
 * @since 2.10.0
 */
var equalsDefault = function (compare) {
    return function (first, second) {
        return first === second || compare(first, second) === 0;
    };
};
exports.equalsDefault = equalsDefault;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromCompare = function (compare) { return ({
    equals: (0, exports.equalsDefault)(compare),
    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
}); };
exports.fromCompare = fromCompare;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Ord'
 * import * as B from 'fp-ts/boolean'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 *
 * const O = tuple(S.Ord, N.Ord, B.Ord)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.10.0
 */
var tuple = function () {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    return (0, exports.fromCompare)(function (first, second) {
        var i = 0;
        for (; i < ords.length - 1; i++) {
            var r = ords[i].compare(first[i], second[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(first[i], second[i]);
    });
};
exports.tuple = tuple;
/**
 * @since 2.10.0
 */
var reverse = function (O) { return (0, exports.fromCompare)(function (first, second) { return O.compare(second, first); }); };
exports.reverse = reverse;
/* istanbul ignore next */
var contramap_ = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.contramap)(f)); };
/**
 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Ord<User>`.
 *
 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
 * for ordering (meaning we have an `Ord<X>`)
 *
 * For example, given the following `User` type, there are lots of possible choices for `X`,
 * but let's say we want to sort a list of users by `lastName`.
 *
 * If we have a way of comparing `lastName`s for ordering (`ordLastName: Ord<string>`) and we know how to go from `User -> string`,
 * using `contramap` we can do this
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { contramap, Ord } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly firstName: string
 *   readonly lastName: string
 * }
 *
 * const ordLastName: Ord<string> = S.Ord
 *
 * const ordByLastName: Ord<User> = pipe(
 *   ordLastName,
 *   contramap((user) => user.lastName)
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordByLastName)([
 *     { firstName: 'a', lastName: 'd' },
 *     { firstName: 'c', lastName: 'b' }
 *   ]),
 *   [
 *     { firstName: 'c', lastName: 'b' },
 *     { firstName: 'a', lastName: 'd' }
 *   ]
 * )
 *
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return (0, exports.fromCompare)(function (first, second) { return fa.compare(f(first), f(second)); });
}; };
exports.contramap = contramap;
/**
 * @category type lambdas
 * @since 2.0.0
 */
exports.URI = 'Ord';
/**
 * A typical use case for the `Semigroup` instance of `Ord` is merging two or more orderings.
 *
 * For example the following snippet builds an `Ord` for a type `User` which
 * sorts by `created` date descending, and **then** `lastName`
 *
 * @example
 * import * as D from 'fp-ts/Date'
 * import { pipe } from 'fp-ts/function'
 * import { contramap, getSemigroup, Ord, reverse } from 'fp-ts/Ord'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * interface User {
 *   readonly id: string
 *   readonly lastName: string
 *   readonly created: Date
 * }
 *
 * const ordByLastName: Ord<User> = pipe(
 *   S.Ord,
 *   contramap((user) => user.lastName)
 * )
 *
 * const ordByCreated: Ord<User> = pipe(
 *   D.Ord,
 *   contramap((user) => user.created)
 * )
 *
 * const ordUserByCreatedDescThenLastName = getSemigroup<User>().concat(
 *   reverse(ordByCreated),
 *   ordByLastName
 * )
 *
 * assert.deepStrictEqual(
 *   RA.sort(ordUserByCreatedDescThenLastName)([
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) }
 *   ]),
 *   [
 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) }
 *   ]
 * )
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) {
        return (0, exports.fromCompare)(function (a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
        });
    }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as B from 'fp-ts/boolean'
 * import { pipe } from 'fp-ts/function'
 * import { concatAll } from 'fp-ts/Monoid'
 * import * as N from 'fp-ts/number'
 *
 * interface User {
 *   readonly id: number
 *   readonly name: string
 *   readonly age: number
 *   readonly rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   S.Ord,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   N.Ord,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   B.Ord,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
var getMonoid = function () { return ({
    concat: (0, exports.getSemigroup)().concat,
    empty: (0, exports.fromCompare)(function () { return 0; })
}); };
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Contravariant = {
    URI: exports.URI,
    contramap: contramap_
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
exports.trivial = {
    equals: function_1.constTrue,
    compare: /*#__PURE__*/ (0, function_1.constant)(0)
};
/**
 * @since 2.11.0
 */
var equals = function (O) {
    return function (second) {
        return function (first) {
            return first === second || O.compare(first, second) === 0;
        };
    };
};
exports.equals = equals;
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
var lt = function (O) {
    return function (first, second) {
        return O.compare(first, second) === -1;
    };
};
exports.lt = lt;
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
var gt = function (O) {
    return function (first, second) {
        return O.compare(first, second) === 1;
    };
};
exports.gt = gt;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
var leq = function (O) {
    return function (first, second) {
        return O.compare(first, second) !== 1;
    };
};
exports.leq = leq;
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
var geq = function (O) {
    return function (first, second) {
        return O.compare(first, second) !== -1;
    };
};
exports.geq = geq;
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var min = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
    };
};
exports.min = min;
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var max = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
    };
};
exports.max = max;
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
var clamp = function (O) {
    var minO = (0, exports.min)(O);
    var maxO = (0, exports.max)(O);
    return function (low, hi) { return function (a) { return maxO(minO(a, hi), low); }; };
};
exports.clamp = clamp;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
var between = function (O) {
    var ltO = (0, exports.lt)(O);
    var gtO = (0, exports.gt)(O);
    return function (low, hi) { return function (a) { return ltO(a, low) || gtO(a, hi) ? false : true; }; };
};
exports.between = between;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleOrd = exports.tuple;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getDualOrd = exports.reverse;
/**
 * Use [`Contravariant`](#contravariant) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.ord = exports.Contravariant;
// default compare for primitive types
function compare(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
}
var strictOrd = {
    equals: Eq_1.eqStrict.equals,
    compare: compare
};
/**
 * Use [`Ord`](./boolean.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.ordBoolean = strictOrd;
/**
 * Use [`Ord`](./string.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.ordString = strictOrd;
/**
 * Use [`Ord`](./number.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.ordNumber = strictOrd;
/**
 * Use [`Ord`](./Date.ts.html#ord) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.ordDate = (0, function_1.pipe)(exports.ordNumber, 
/*#__PURE__*/
(0, exports.contramap)(function (date) { return date.valueOf(); }));


/***/ }),

/***/ "./node_modules/fp-ts/lib/ReadonlyArray.js":
/*!*************************************************!*\
  !*** ./node_modules/fp-ts/lib/ReadonlyArray.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.flatten = exports.chain = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.zero = exports.of = exports._chainRecBreadthFirst = exports._chainRecDepthFirst = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = void 0;
exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.Witherable = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.chainFirst = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = exports.sequence = void 0;
exports.readonlyArray = exports.prependToAll = exports.snoc = exports.cons = exports.range = exports.apS = exports.bind = exports["let"] = exports.bindTo = exports.Do = exports.intercalate = exports.exists = exports.some = exports.every = exports.empty = exports.fromArray = exports.toArray = void 0;
var Apply_1 = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/lib/Apply.js");
var Chain_1 = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/lib/Chain.js");
var Eq_1 = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/lib/Eq.js");
var FromEither_1 = __webpack_require__(/*! ./FromEither */ "./node_modules/fp-ts/lib/FromEither.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var Functor_1 = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/lib/Functor.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
var N = __importStar(__webpack_require__(/*! ./number */ "./node_modules/fp-ts/lib/number.js"));
var Ord_1 = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/lib/Ord.js");
var RNEA = __importStar(__webpack_require__(/*! ./ReadonlyNonEmptyArray */ "./node_modules/fp-ts/lib/ReadonlyNonEmptyArray.js"));
var Separated_1 = __webpack_require__(/*! ./Separated */ "./node_modules/fp-ts/lib/Separated.js");
var Witherable_1 = __webpack_require__(/*! ./Witherable */ "./node_modules/fp-ts/lib/Witherable.js");
var Zero_1 = __webpack_require__(/*! ./Zero */ "./node_modules/fp-ts/lib/Zero.js");
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Test whether a `ReadonlyArray` is empty.
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @category refinements
 * @since 2.5.0
 */
var isEmpty = function (as) { return as.length === 0; };
exports.isEmpty = isEmpty;
/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category refinements
 * @since 2.5.0
 */
exports.isNonEmpty = RNEA.isNonEmpty;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
exports.prepend = RNEA.prepend;
/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @since 2.11.0
 */
exports.prependW = RNEA.prependW;
/**
 * Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
exports.append = RNEA.append;
/**
 * Less strict version of [`append`](#append).
 *
 * @since 2.11.0
 */
exports.appendW = RNEA.appendW;
/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
var makeBy = function (n, f) { return (n <= 0 ? exports.empty : RNEA.makeBy(f)(n)); };
exports.makeBy = makeBy;
/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
var replicate = function (n, a) { return (0, exports.makeBy)(n, function () { return a; }); };
exports.replicate = replicate;
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? [a] : exports.empty); };
}
exports.fromPredicate = fromPredicate;
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.11.0
 */
var fromOption = function (ma) { return (_.isNone(ma) ? exports.empty : [ma.value]); };
exports.fromOption = fromOption;
/**
 * Transforms an `Either` to a `ReadonlyArray`.
 *
 * @category conversions
 * @since 2.11.0
 */
var fromEither = function (e) { return (_.isLeft(e) ? exports.empty : [e.right]); };
exports.fromEither = fromEither;
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(as) : onEmpty();
    };
};
exports.matchW = matchW;
/**
 * @category pattern matching
 * @since 2.11.0
 */
exports.match = exports.matchW;
/**
 * Less strict version of [`matchLeft`](#matchleft).
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeftW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.head(as), RNEA.tail(as)) : onEmpty();
    };
};
exports.matchLeftW = matchLeftW;
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category pattern matching
 * @since 2.10.0
 */
exports.matchLeft = exports.matchLeftW;
/**
 * Alias of [`matchLeft`](#matchleft).
 *
 * @category pattern matching
 * @since 2.5.0
 */
exports.foldLeft = exports.matchLeft;
/**
 * Less strict version of [`matchRight`](#matchright).
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRightW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.init(as), RNEA.last(as)) : onEmpty();
    };
};
exports.matchRightW = matchRightW;
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 2.10.0
 */
exports.matchRight = exports.matchRightW;
/**
 * Alias of [`matchRight`](#matchright).
 *
 * @category pattern matching
 * @since 2.5.0
 */
exports.foldRight = exports.matchRight;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category sequencing
 * @since 2.7.0
 */
var chainWithIndex = function (f) {
    return function (as) {
        if ((0, exports.isEmpty)(as)) {
            return exports.empty;
        }
        var out = [];
        for (var i = 0; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
exports.chainWithIndex = chainWithIndex;
/**
 * Same as `reduce` but it carries over the intermediate steps.
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @since 2.5.0
 */
var scanLeft = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[0] = b;
        for (var i = 0; i < len; i++) {
            out[i + 1] = f(out[i], as[i]);
        }
        return out;
    };
};
exports.scanLeft = scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 2.5.0
 */
var scanRight = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[len] = b;
        for (var i = len - 1; i >= 0; i--) {
            out[i] = f(as[i], out[i + 1]);
        }
        return out;
    };
};
exports.scanRight = scanRight;
/**
 * Calculate the number of elements in a `ReadonlyArray`.
 *
 * @since 2.10.0
 */
var size = function (as) { return as.length; };
exports.size = size;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
exports.isOutOfBound = RNEA.isOutOfBound;
function lookup(i, as) {
    return as === undefined ? function (as) { return lookup(i, as); } : (0, exports.isOutOfBound)(i, as) ? _.none : _.some(as[i]);
}
exports.lookup = lookup;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
var head = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(RNEA.head(as)) : _.none); };
exports.head = head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
var last = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(RNEA.last(as)) : _.none); };
exports.last = last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
var tail = function (as) {
    return (0, exports.isNonEmpty)(as) ? _.some(RNEA.tail(as)) : _.none;
};
exports.tail = tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
var init = function (as) {
    return (0, exports.isNonEmpty)(as) ? _.some(RNEA.init(as)) : _.none;
};
exports.init = init;
/**
 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
 *
 * @since 2.5.0
 */
var takeLeft = function (n) {
    return function (as) {
        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(0, n);
    };
};
exports.takeLeft = takeLeft;
/**
 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeRight(4)), input)
 * assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
 *
 * @since 2.5.0
 */
var takeRight = function (n) {
    return function (as) {
        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(-n);
    };
};
exports.takeRight = takeRight;
function takeLeftWhile(predicate) {
    return function (as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        var len = out.length;
        return len === as.length ? as : len === 0 ? exports.empty : out;
    };
}
exports.takeLeftWhile = takeLeftWhile;
var spanLeftIndex = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
        return { init: init, rest: rest };
    };
}
exports.spanLeft = spanLeft;
/**
 * Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
 *
 * @since 2.5.0
 */
var dropLeft = function (n) {
    return function (as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(n, as.length);
    };
};
exports.dropLeft = dropLeft;
/**
 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
 *
 * @since 2.5.0
 */
var dropRight = function (n) {
    return function (as) {
        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(0, as.length - n);
    };
};
exports.dropRight = dropRight;
function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanLeftIndex(as, predicate);
        return i === 0 ? as : i === as.length ? exports.empty : as.slice(i);
    };
}
exports.dropLeftWhile = dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
var findIndex = function (predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return _.some(i);
            }
        }
        return _.none;
    };
};
exports.findIndex = findIndex;
function findFirst(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return _.some(as[i]);
            }
        }
        return _.none;
    };
}
exports.findFirst = findFirst;
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
var findFirstMap = function (f) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            var out = f(as[i]);
            if (_.isSome(out)) {
                return out;
            }
        }
        return _.none;
    };
};
exports.findFirstMap = findFirstMap;
function findLast(predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _.some(as[i]);
            }
        }
        return _.none;
    };
}
exports.findLast = findLast;
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
var findLastMap = function (f) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            var out = f(as[i]);
            if (_.isSome(out)) {
                return out;
            }
        }
        return _.none;
    };
};
exports.findLastMap = findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
var findLastIndex = function (predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _.some(i);
            }
        }
        return _.none;
    };
};
exports.findLastIndex = findLastIndex;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
var insertAt = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? _.none : _.some(RNEA.unsafeInsertAt(i, a, as));
    };
};
exports.insertAt = insertAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return (0, exports.modifyAt)(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
var deleteAt = function (i) {
    return function (as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeDeleteAt)(i, as));
    };
};
exports.deleteAt = deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
var modifyAt = function (i, f) {
    return function (as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
    };
};
exports.modifyAt = modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.5.0
 */
var reverse = function (as) { return (as.length <= 1 ? as : as.slice().reverse()); };
exports.reverse = reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.5.0
 */
var rights = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
exports.rights = rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
var lefts = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
exports.lefts = lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.5.0
 */
var sort = function (O) {
    return function (as) {
        return as.length <= 1 ? as : as.slice().sort(O.compare);
    };
};
exports.sort = sort;
// TODO: curry and make data-last in v3
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 2.5.0
 */
var zipWith = function (fa, fb, f) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
var unzip = function (as) {
    var fa = [];
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll = function (middle) {
    var f = RNEA.prependAll(middle);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
};
exports.prependAll = prependAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse = function (middle) {
    var f = RNEA.intersperse(middle);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
};
exports.intersperse = intersperse;
/**
 * Rotate a `ReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.5.0
 */
var rotate = function (n) {
    var f = RNEA.rotate(n);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
};
exports.rotate = rotate;
function elem(E) {
    return function (a, as) {
        if (as === undefined) {
            var elemE_1 = elem(E);
            return function (as) { return elemE_1(a, as); };
        }
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        for (; i < as.length; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.5.0
 */
var uniq = function (E) {
    var f = RNEA.uniq(E);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
};
exports.uniq = uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.5.0
 */
var sortBy = function (ords) {
    var f = RNEA.sortBy(ords);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
};
exports.sortBy = sortBy;
/**
 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
 * `ReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
 * value and the tail of the `ReadonlyArray`.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return RA.chop(as => {
 *     const { init, rest } = pipe(as, RA.spanLeft((a: A) => S.equals(a, as[0])))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.5.0
 */
var chop = function (f) {
    var g = RNEA.chop(f);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? g(as) : exports.empty); };
};
exports.chop = chop;
/**
 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
var splitAt = function (n) {
    return function (as) {
        return n >= 1 && (0, exports.isNonEmpty)(as) ? RNEA.splitAt(n)(as) : (0, exports.isEmpty)(as) ? [as, exports.empty] : [exports.empty, as];
    };
};
exports.splitAt = splitAt;
/**
 * Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that:
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `as`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 2.5.0
 */
var chunksOf = function (n) {
    var f = RNEA.chunksOf(n);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : exports.empty); };
};
exports.chunksOf = chunksOf;
/**
 * @category lifting
 * @since 2.11.0
 */
var fromOptionK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return (0, exports.fromOption)(f.apply(void 0, a));
    };
};
exports.fromOptionK = fromOptionK;
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        return (0, exports.isNonEmpty)(input)
            ? (0, function_1.pipe)(RNEA.head(input), (0, exports.chain)(function (x) { return go((0, function_1.pipe)(scope, (0, exports.append)(x)), RNEA.tail(input)); }))
            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
                : exports.empty;
    };
    return go(exports.empty, input);
}
exports.comprehension = comprehension;
/**
 * @since 2.11.0
 */
var concatW = function (second) {
    return function (first) {
        return (0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second);
    };
};
exports.concatW = concatW;
/**
 * @since 2.11.0
 */
exports.concat = exports.concatW;
function union(E) {
    var unionE = RNEA.union(E);
    return function (first, second) {
        if (second === undefined) {
            var unionE_1 = union(E);
            return function (second) { return unionE_1(second, first); };
        }
        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? first : second;
    };
}
exports.union = union;
function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
exports.intersection = intersection;
function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
exports.difference = difference;
var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
var _filter = function (fa, predicate) {
    return (0, function_1.pipe)(fa, (0, exports.filter)(predicate));
};
var _filterMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMap)(f)); };
var _partition = function (fa, predicate) {
    return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
};
var _partitionMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f)); };
var _partitionWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.partitionWithIndex)(predicateWithIndex)); };
var _partitionMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMapWithIndex)(f)); };
var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
var _foldMap = function (M) {
    var foldMapM = (0, exports.foldMap)(M);
    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
var _reduceWithIndex = function (fa, b, f) {
    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
};
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
};
var _reduceRightWithIndex = function (fa, b, f) {
    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
};
var _filterMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMapWithIndex)(f)); };
var _filterWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.filterWithIndex)(predicateWithIndex)); };
var _extend = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.extend)(f)); };
var _traverse = function (F) {
    var traverseF = (0, exports.traverse)(F);
    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
};
/** @internal */
var _chainRecDepthFirst = function (a, f) { return (0, function_1.pipe)(a, (0, exports.chainRecDepthFirst)(f)); };
exports._chainRecDepthFirst = _chainRecDepthFirst;
/** @internal */
var _chainRecBreadthFirst = function (a, f) { return (0, function_1.pipe)(a, (0, exports.chainRecBreadthFirst)(f)); };
exports._chainRecBreadthFirst = _chainRecBreadthFirst;
/**
 * @category constructors
 * @since 2.5.0
 */
exports.of = RNEA.of;
/**
 * @since 2.7.0
 */
var zero = function () { return exports.empty; };
exports.zero = zero;
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) {
    return function (fa) {
        return fa.concat(that());
    };
};
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.5.0
 */
exports.alt = exports.altW;
/**
 * @since 2.5.0
 */
var ap = function (fa) {
    return (0, exports.chain)(function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); });
};
exports.ap = ap;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 2.14.0
 */
exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (_, a) { return f(a); }));
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.5.0
 */
exports.chain = exports.flatMap;
/**
 * @category sequencing
 * @since 2.5.0
 */
exports.flatten = (0, exports.chain)(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.5.0
 */
var map = function (f) { return function (fa) {
    return fa.map(function (a) { return f(a); });
}; };
exports.map = map;
/**
 * @category mapping
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (fa) {
    return fa.map(function (a, i) { return f(i, a); });
}; };
exports.mapWithIndex = mapWithIndex;
/**
 * @category filtering
 * @since 2.5.0
 */
var separate = function (fa) {
    var left = [];
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return (0, Separated_1.separated)(left, right);
};
exports.separate = separate;
/**
 * @category filtering
 * @since 2.5.0
 */
var filter = function (predicate) {
    return function (as) {
        return as.filter(predicate);
    };
};
exports.filter = filter;
/**
 * @category filtering
 * @since 2.5.0
 */
var filterMapWithIndex = function (f) {
    return function (fa) {
        var out = [];
        for (var i = 0; i < fa.length; i++) {
            var optionB = f(i, fa[i]);
            if (_.isSome(optionB)) {
                out.push(optionB.value);
            }
        }
        return out;
    };
};
exports.filterMapWithIndex = filterMapWithIndex;
/**
 * @category filtering
 * @since 2.5.0
 */
var filterMap = function (f) {
    return (0, exports.filterMapWithIndex)(function (_, a) { return f(a); });
};
exports.filterMap = filterMap;
/**
 * @category filtering
 * @since 2.5.0
 */
exports.compact = (0, exports.filterMap)(function_1.identity);
/**
 * @category filtering
 * @since 2.5.0
 */
var partition = function (predicate) {
    return (0, exports.partitionWithIndex)(function (_, a) { return predicate(a); });
};
exports.partition = partition;
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionWithIndex = function (predicateWithIndex) {
    return function (as) {
        var left = [];
        var right = [];
        for (var i = 0; i < as.length; i++) {
            var a = as[i];
            if (predicateWithIndex(i, a)) {
                right.push(a);
            }
            else {
                left.push(a);
            }
        }
        return (0, Separated_1.separated)(left, right);
    };
};
exports.partitionWithIndex = partitionWithIndex;
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return (0, exports.partitionMapWithIndex)(function (_, a) { return f(a); });
};
exports.partitionMap = partitionMap;
/**
 * @category filtering
 * @since 2.5.0
 */
var partitionMapWithIndex = function (f) {
    return function (fa) {
        var left = [];
        var right = [];
        for (var i = 0; i < fa.length; i++) {
            var e = f(i, fa[i]);
            if (e._tag === 'Left') {
                left.push(e.left);
            }
            else {
                right.push(e.right);
            }
        }
        return (0, Separated_1.separated)(left, right);
    };
};
exports.partitionMapWithIndex = partitionMapWithIndex;
/**
 * @category filtering
 * @since 2.5.0
 */
var filterWithIndex = function (predicateWithIndex) {
    return function (as) {
        return as.filter(function (a, i) { return predicateWithIndex(i, a); });
    };
};
exports.filterWithIndex = filterWithIndex;
/**
 * @since 2.5.0
 */
var extend = function (f) { return function (wa) {
    return wa.map(function (_, i) { return f(wa.slice(i)); });
}; };
exports.extend = extend;
/**
 * @since 2.5.0
 */
exports.duplicate = (0, exports.extend)(function_1.identity);
/**
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex = function (M) {
    return function (f) {
        return function (fa) {
            return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
        };
    };
};
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category folding
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return (0, exports.reduceWithIndex)(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * @category folding
 * @since 2.5.0
 */
var foldMap = function (M) {
    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
exports.foldMap = foldMap;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (fa) {
    var len = fa.length;
    var out = b;
    for (var i = 0; i < len; i++) {
        out = f(i, out, fa[i]);
    }
    return out;
}; };
exports.reduceWithIndex = reduceWithIndex;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return (0, exports.reduceRightWithIndex)(b, function (_, a, b) { return f(a, b); });
};
exports.reduceRight = reduceRight;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (fa) {
    return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
}; };
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) {
    return function (ta) {
        return _reduce(ta, F.of((0, exports.zero)()), function (fas, fa) {
            return F.ap(F.map(fas, function (as) { return function (a) { return (0, function_1.pipe)(as, (0, exports.append)(a)); }; }), fa);
        });
    };
};
exports.sequence = sequence;
/**
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex = function (F) {
    return function (f) {
        return (0, exports.reduceWithIndex)(F.of((0, exports.zero)()), function (i, fbs, a) {
            return F.ap(F.map(fbs, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, a));
        });
    };
};
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category filtering
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
exports.wither = wither;
/**
 * @category filtering
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
exports.wilt = wilt;
/**
 * @since 2.6.6
 */
var unfold = function (b, f) {
    var out = [];
    var bb = b;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var mt = f(bb);
        if (_.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            out.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return out;
};
exports.unfold = unfold;
/**
 * @category type lambdas
 * @since 2.5.0
 */
exports.URI = 'ReadonlyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
exports.getShow = getShow;
/**
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return ((0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second)); }
}); };
exports.getSemigroup = getSemigroup;
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
var getMonoid = function () { return ({
    concat: (0, exports.getSemigroup)().concat,
    empty: exports.empty
}); };
exports.getMonoid = getMonoid;
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return (0, Eq_1.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
exports.getEq = getEq;
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
var getOrd = function (O) {
    return (0, Ord_1.fromCompare)(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return N.Ord.compare(aLen, bLen);
    });
};
exports.getOrd = getOrd;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (E) { return ({
    concat: (0, exports.getUnionSemigroup)(E).concat,
    empty: exports.empty
}); };
exports.getUnionMonoid = getUnionMonoid;
/**
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (E) {
    var intersectionE = intersection(E);
    return {
        concat: function (first, second) { return intersectionE(second)(first); }
    };
};
exports.getIntersectionSemigroup = getIntersectionSemigroup;
/**
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function (E) {
    var differenceE = difference(E);
    return {
        concat: function (first, second) { return differenceE(second)(first); }
    };
};
exports.getDifferenceMagma = getDifferenceMagma;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
exports.flap = (0, Functor_1.flap)(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: exports.flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: exports.flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 2.5.0
 */
exports.chainFirst = 
/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Unfoldable = {
    URI: exports.URI,
    unfold: exports.unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
exports.Zero = {
    URI: exports.URI,
    zero: exports.zero
};
/**
 * @category do notation
 * @since 2.11.0
 */
exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alternative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    alt: _alt,
    zero: exports.zero
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Extend = {
    URI: exports.URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Compactable = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Filterable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FilterableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverse: _traverse,
    sequence: exports.sequence,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecDepthFirst = function (f) {
    return function (a) {
        var todo = __spreadArray([], f(a), true);
        var out = [];
        while (todo.length > 0) {
            var e = todo.shift();
            if (_.isLeft(e)) {
                todo.unshift.apply(todo, f(e.left));
            }
            else {
                out.push(e.right);
            }
        }
        return out;
    };
};
exports.chainRecDepthFirst = chainRecDepthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecDepthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: exports.flatMap,
    chainRec: exports._chainRecDepthFirst
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecBreadthFirst = function (f) {
    return function (a) {
        var initial = f(a);
        var todo = [];
        var out = [];
        function go(e) {
            if (_.isLeft(e)) {
                f(e.left).forEach(function (v) { return todo.push(v); });
            }
            else {
                out.push(e.right);
            }
        }
        for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
            var e = initial_1[_i];
            go(e);
        }
        while (todo.length > 0) {
            go(todo.shift());
        }
        return out;
    };
};
exports.chainRecBreadthFirst = chainRecBreadthFirst;
/**
 * @category instances
 * @since 2.11.0
 */
exports.ChainRecBreadthFirst = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: exports.flatMap,
    chainRec: exports._chainRecBreadthFirst
};
var _wither = /*#__PURE__*/ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
var _wilt = /*#__PURE__*/ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Witherable = {
    URI: exports.URI,
    map: _map,
    compact: exports.compact,
    separate: exports.separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    wither: _wither,
    wilt: _wilt
};
/**
 * Filter values inside a context.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as T from 'fp-ts/Task'
 *
 * const filterE = RA.filterE(T.ApplicativePar)
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       [-1, 2, 3],
 *       filterE((n) => T.of(n > 0))
 *     )(),
 *     [2, 3]
 *   )
 * }
 * test()
 *
 * @since 2.11.0
 */
exports.filterE = (0, Witherable_1.filterE)(exports.Witherable);
/**
 * @category instances
 * @since 2.11.0
 */
exports.FromEither = {
    URI: exports.URI,
    fromEither: exports.fromEither
};
/**
 * @category lifting
 * @since 2.11.0
 */
exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.5.0
 */
exports.unsafeInsertAt = RNEA.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt = function (i, a, as) {
    return (0, exports.isNonEmpty)(as) ? RNEA.unsafeUpdateAt(i, a, as) : as;
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeDeleteAt = function (i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
exports.unsafeDeleteAt = unsafeDeleteAt;
/**
 * @category conversions
 * @since 2.5.0
 */
var toArray = function (as) { return as.slice(); };
exports.toArray = toArray;
/**
 * @category conversions
 * @since 2.5.0
 */
var fromArray = function (as) { return ((0, exports.isEmpty)(as) ? exports.empty : as.slice()); };
exports.fromArray = fromArray;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.5.0
 */
exports.empty = RNEA.empty;
function every(predicate) {
    return function (as) { return as.every(predicate); };
}
exports.every = every;
/**
 * Check if a predicate holds true for any array member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 2.9.0
 */
var some = function (predicate) {
    return function (as) {
        return as.some(predicate);
    };
};
exports.some = some;
/**
 * Alias of [`some`](#some)
 *
 * @since 2.11.0
 */
exports.exists = exports.some;
/**
 * Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate = function (M) {
    var intercalateM = RNEA.intercalate(M);
    return function (middle) { return (0, exports.match)(function () { return M.empty; }, intercalateM(middle)); };
};
exports.intercalate = intercalate;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
exports.Do = (0, exports.of)(_.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
exports["let"] = let_;
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bind = (0, Chain_1.bind)(exports.Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
exports.apS = (0, Apply_1.apS)(exports.Apply);
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `ReadonlyNonEmptyArray` module instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.range = RNEA.range;
/**
 * Use [`prepend`](#prepend) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.cons = RNEA.cons;
/**
 * Use [`append`](#append) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.snoc = RNEA.snoc;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RA.Functor` instead of `RA.readonlyArray`
 * (where `RA` is from `import RA from 'fp-ts/ReadonlyArray'`)
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyArray = {
    URI: exports.URI,
    compact: exports.compact,
    separate: exports.separate,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: exports.flatMap,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    alt: _alt,
    zero: exports.zero,
    unfold: exports.unfold,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    extend: _extend,
    wither: _wither,
    wilt: _wilt
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/ReadonlyNonEmptyArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/fp-ts/lib/ReadonlyNonEmptyArray.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.chain = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
exports.groupSort = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports["let"] = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = exports.reduceRight = void 0;
exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = void 0;
var Apply_1 = __webpack_require__(/*! ./Apply */ "./node_modules/fp-ts/lib/Apply.js");
var Chain_1 = __webpack_require__(/*! ./Chain */ "./node_modules/fp-ts/lib/Chain.js");
var Eq_1 = __webpack_require__(/*! ./Eq */ "./node_modules/fp-ts/lib/Eq.js");
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var Functor_1 = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/lib/Functor.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
var Ord_1 = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/lib/Ord.js");
var Se = __importStar(__webpack_require__(/*! ./Semigroup */ "./node_modules/fp-ts/lib/Semigroup.js"));
// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
exports.empty = _.emptyReadonlyArray;
/**
 * @internal
 */
exports.isNonEmpty = _.isNonEmpty;
/**
 * @internal
 */
var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
exports.isOutOfBound = isOutOfBound;
/**
 * @internal
 */
var prependW = function (head) {
    return function (tail) {
        return __spreadArray([head], tail, true);
    };
};
exports.prependW = prependW;
/**
 * @internal
 */
exports.prepend = exports.prependW;
/**
 * @internal
 */
var appendW = function (end) {
    return function (init) {
        return __spreadArray(__spreadArray([], init, true), [end], false);
    };
};
exports.appendW = appendW;
/**
 * @internal
 */
exports.append = exports.appendW;
/**
 * @internal
 */
var unsafeInsertAt = function (i, a, as) {
    if ((0, exports.isNonEmpty)(as)) {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
exports.unsafeInsertAt = unsafeInsertAt;
/**
 * @internal
 */
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = _.fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};
exports.unsafeUpdateAt = unsafeUpdateAt;
/**
 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.11.0
 */
var uniq = function (E) {
    return function (as) {
        if (as.length === 1) {
            return as;
        }
        var out = [(0, exports.head)(as)];
        var rest = (0, exports.tail)(as);
        var _loop_1 = function (a) {
            if (out.every(function (o) { return !E.equals(o, a); })) {
                out.push(a);
            }
        };
        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
            var a = rest_1[_i];
            _loop_1(a);
        }
        return out;
    };
};
exports.uniq = uniq;
/**
 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 *
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 *
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
 *
 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 },
 *   { name: 'b', age: 2 }
 * ]
 *
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.11.0
 */
var sortBy = function (ords) {
    if ((0, exports.isNonEmpty)(ords)) {
        var M = (0, Ord_1.getMonoid)();
        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
    }
    return function_1.identity;
};
exports.sortBy = sortBy;
/**
 * @since 2.11.0
 */
var union = function (E) {
    var uniqE = (0, exports.uniq)(E);
    return function (second) { return function (first) { return uniqE((0, function_1.pipe)(first, concat(second))); }; };
};
exports.union = union;
/**
 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @since 2.11.0
 */
var rotate = function (n) {
    return function (as) {
        var len = as.length;
        var m = Math.round(n) % len;
        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
            return as;
        }
        if (m < 0) {
            var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
            return (0, function_1.pipe)(s, concat(f));
        }
        else {
            return (0, exports.rotate)(m - len)(as);
        }
    };
};
exports.rotate = rotate;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
 *
 * @category conversions
 * @since 2.5.0
 */
var fromReadonlyArray = function (as) {
    return (0, exports.isNonEmpty)(as) ? _.some(as) : _.none;
};
exports.fromReadonlyArray = fromReadonlyArray;
/**
 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy = function (f) {
    return function (n) {
        var j = Math.max(0, Math.floor(n));
        var out = [f(0)];
        for (var i = 1; i < j; i++) {
            out.push(f(i));
        }
        return out;
    };
};
exports.makeBy = makeBy;
/**
 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate = function (a) { return (0, exports.makeBy)(function () { return a; }); };
exports.replicate = replicate;
/**
 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range = function (start, end) {
    return start <= end ? (0, exports.makeBy)(function (i) { return start + i; })(end - start + 1) : [start];
};
exports.range = range;
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
 *
 * @since 2.9.0
 */
var unprepend = function (as) { return [(0, exports.head)(as), (0, exports.tail)(as)]; };
exports.unprepend = unprepend;
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @since 2.9.0
 */
var unappend = function (as) { return [(0, exports.init)(as), (0, exports.last)(as)]; };
exports.unappend = unappend;
/**
 * @category conversions
 * @since 2.5.0
 */
var fromArray = function (as) { return (0, exports.fromReadonlyArray)(as.slice()); };
exports.fromArray = fromArray;
function concatW(second) {
    return function (first) { return first.concat(second); };
}
exports.concatW = concatW;
function concat(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
exports.concat = concat;
/**
 * @since 2.5.0
 */
var reverse = function (as) {
    return as.length === 1 ? as : __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
};
exports.reverse = reverse;
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return exports.empty;
        }
        var out = [];
        var head = as[0];
        var nea = [head];
        for (var i = 1; i < len; i++) {
            var a = as[i];
            if (E.equals(a, head)) {
                nea.push(a);
            }
            else {
                out.push(nea);
                head = a;
                nea = [head];
            }
        }
        out.push(nea);
        return out;
    };
}
exports.group = group;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @since 2.5.0
 */
var groupBy = function (f) {
    return function (as) {
        var out = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (_.has.call(out, k)) {
                out[k].push(a);
            }
            else {
                out[k] = [a];
            }
        }
        return out;
    };
};
exports.groupBy = groupBy;
/**
 * @since 2.5.0
 */
var sort = function (O) {
    return function (as) {
        return as.length === 1 ? as : as.slice().sort(O.compare);
    };
};
exports.sort = sort;
/**
 * @since 2.5.0
 */
var updateAt = function (i, a) {
    return (0, exports.modifyAt)(i, function () { return a; });
};
exports.updateAt = updateAt;
/**
 * @since 2.5.0
 */
var modifyAt = function (i, f) {
    return function (as) {
        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
    };
};
exports.modifyAt = modifyAt;
/**
 * @since 2.5.1
 */
var zipWith = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
exports.zipWith = zipWith;
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
}
exports.zip = zip;
/**
 * @since 2.5.1
 */
var unzip = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
exports.unzip = unzip;
/**
 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll = function (middle) {
    return function (as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
exports.prependAll = prependAll;
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse = function (middle) {
    return function (as) {
        var rest = (0, exports.tail)(as);
        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : as;
    };
};
exports.intersperse = intersperse;
/**
 * @category sequencing
 * @since 2.10.0
 */
var chainWithIndex = function (f) {
    return function (as) {
        var out = _.fromReadonlyNonEmptyArray(f(0, (0, exports.head)(as)));
        for (var i = 1; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
exports.chainWithIndex = chainWithIndex;
/**
 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
 * value and the tail of the `ReadonlyNonEmptyArray`.
 *
 * @since 2.10.0
 */
var chop = function (f) {
    return function (as) {
        var _a = f(as), b = _a[0], rest = _a[1];
        var out = [b];
        var next = rest;
        while ((0, exports.isNonEmpty)(next)) {
            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
            out.push(b_1);
            next = rest_2;
        }
        return out;
    };
};
exports.chop = chop;
/**
 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @since 2.10.0
 */
var splitAt = function (n) {
    return function (as) {
        var m = Math.max(1, n);
        return m >= as.length ? [as, exports.empty] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
    };
};
exports.splitAt = splitAt;
/**
 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyNonEmptyArray`.
 *
 * @since 2.10.0
 */
var chunksOf = function (n) { return (0, exports.chop)((0, exports.splitAt)(n)); };
exports.chunksOf = chunksOf;
var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) {
    var foldMapM = (0, exports.foldMap)(M);
    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
/* istanbul ignore next */
var _traverse = function (F) {
    var traverseF = (0, exports.traverse)(F);
    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
/* istanbul ignore next */
var _reduceWithIndex = function (fa, b, f) {
    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex = function (M) {
    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex = function (fa, b, f) {
    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex = function (F) {
    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
};
/**
 * @category constructors
 * @since 2.5.0
 */
exports.of = _.singleton;
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
 *     RNEA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) {
    return function (as) {
        return (0, function_1.pipe)(as, concatW(that()));
    };
};
exports.altW = altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.6.2
 */
exports.alt = exports.altW;
/**
 * @since 2.5.0
 */
var ap = function (as) { return (0, exports.chain)(function (f) { return (0, function_1.pipe)(as, (0, exports.map)(f)); }); };
exports.ap = ap;
/**
 * @example
 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RNEA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 *
 * @category sequencing
 * @since 2.14.0
 */
exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (_, a) { return f(a); }));
});
/**
 * Alias of `flatMap`.
 *
 * @category sequencing
 * @since 2.5.0
 */
exports.chain = exports.flatMap;
/**
 * @since 2.5.0
 */
var extend = function (f) {
    return function (as) {
        var next = (0, exports.tail)(as);
        var out = [f(as)];
        while ((0, exports.isNonEmpty)(next)) {
            out.push(f(next));
            next = (0, exports.tail)(next);
        }
        return out;
    };
};
exports.extend = extend;
/**
 * @since 2.5.0
 */
exports.duplicate = 
/*#__PURE__*/ (0, exports.extend)(function_1.identity);
/**
 * @category sequencing
 * @since 2.5.0
 */
exports.flatten = 
/*#__PURE__*/ (0, exports.chain)(function_1.identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.5.0
 */
var map = function (f) {
    return (0, exports.mapWithIndex)(function (_, a) { return f(a); });
};
exports.map = map;
/**
 * @category mapping
 * @since 2.5.0
 */
var mapWithIndex = function (f) {
    return function (as) {
        var out = [f(0, (0, exports.head)(as))];
        for (var i = 1; i < as.length; i++) {
            out.push(f(i, as[i]));
        }
        return out;
    };
};
exports.mapWithIndex = mapWithIndex;
/**
 * @category folding
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return (0, exports.reduceWithIndex)(b, function (_, b, a) { return f(b, a); });
};
exports.reduce = reduce;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMap = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
        };
    };
};
exports.foldMap = foldMap;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return (0, exports.reduceRightWithIndex)(b, function (_, b, a) { return f(b, a); });
};
exports.reduceRight = reduceRight;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) {
    return function (as) {
        return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
    };
};
exports.reduceWithIndex = reduceWithIndex;
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0]));
        };
    };
};
exports.foldMapWithIndex = foldMapWithIndex;
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) {
    return function (as) {
        return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
    };
};
exports.reduceRightWithIndex = reduceRightWithIndex;
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
exports.traverse = traverse;
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) { return (0, exports.traverseWithIndex)(F)(function_1.SK); };
exports.sequence = sequence;
/**
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex = function (F) {
    return function (f) {
        return function (as) {
            var out = F.map(f(0, (0, exports.head)(as)), exports.of);
            for (var i = 1; i < as.length; i++) {
                out = F.ap(F.map(out, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, as[i]));
            }
            return out;
        };
    };
};
exports.traverseWithIndex = traverseWithIndex;
/**
 * @category Comonad
 * @since 2.6.3
 */
exports.extract = _.head;
/**
 * @category type lambdas
 * @since 2.5.0
 */
exports.URI = 'ReadonlyNonEmptyArray';
/**
 * @category instances
 * @since 2.5.0
 */
var getShow = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
exports.getShow = getShow;
/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
var getSemigroup = function () { return ({
    concat: concat
}); };
exports.getSemigroup = getSemigroup;
/**
 * @example
 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq = function (E) {
    return (0, Eq_1.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
exports.getEq = getEq;
/**
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = (0, exports.union)(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
exports.getUnionSemigroup = getUnionSemigroup;
/**
 * @category instances
 * @since 2.7.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
exports.flap = (0, Functor_1.flap)(exports.Functor);
/**
 * @category instances
 * @since 2.10.0
 */
exports.Pointed = {
    URI: exports.URI,
    of: exports.of
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FunctorWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Apply = {
    URI: exports.URI,
    map: _map,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Applicative = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Chain = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    chain: exports.flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 *
 * @category sequencing
 * @since 2.5.0
 */
exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
/**
 * @category instances
 * @since 2.7.0
 */
exports.Monad = {
    URI: exports.URI,
    map: _map,
    ap: _ap,
    of: exports.of,
    chain: exports.flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Foldable = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.FoldableWithIndex = {
    URI: exports.URI,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Traversable = {
    URI: exports.URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.TraversableWithIndex = {
    URI: exports.URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Alt = {
    URI: exports.URI,
    map: _map,
    alt: _alt
};
/**
 * @category instances
 * @since 2.7.0
 */
exports.Comonad = {
    URI: exports.URI,
    map: _map,
    extend: _extend,
    extract: exports.extract
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
exports.Do = (0, exports.of)(_.emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
exports["let"] = let_;
/**
 * @category do notation
 * @since 2.8.0
 */
exports.bind = (0, Chain_1.bind)(exports.Chain);
/**
 * @category do notation
 * @since 2.8.0
 */
exports.apS = (0, Apply_1.apS)(exports.Apply);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
exports.head = exports.extract;
/**
 * @since 2.5.0
 */
exports.tail = _.tail;
/**
 * @since 2.5.0
 */
var last = function (as) { return as[as.length - 1]; };
exports.last = last;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
var init = function (as) { return as.slice(0, -1); };
exports.init = init;
/**
 * @since 2.5.0
 */
var min = function (O) {
    var S = Se.min(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.min = min;
/**
 * @since 2.5.0
 */
var max = function (O) {
    var S = Se.max(O);
    return function (as) { return as.reduce(S.concat); };
};
exports.max = max;
/**
 * @since 2.10.0
 */
var concatAll = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
exports.concatAll = concatAll;
/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeft = function (f) {
    return function (as) {
        return f((0, exports.head)(as), (0, exports.tail)(as));
    };
};
exports.matchLeft = matchLeft;
/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRight = function (f) {
    return function (as) {
        return f((0, exports.init)(as), (0, exports.last)(as));
    };
};
exports.matchRight = matchRight;
/**
 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) {
    return function (as) {
        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
    };
};
exports.modifyHead = modifyHead;
/**
 * Change the head, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateHead = function (a) { return (0, exports.modifyHead)(function () { return a; }); };
exports.updateHead = updateHead;
/**
 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) {
    return function (as) {
        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
    };
};
exports.modifyLast = modifyLast;
/**
 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateLast = function (a) { return (0, exports.modifyLast)(function () { return a; }); };
exports.updateLast = updateLast;
/**
 * Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate = function (S) {
    var concatAllS = (0, exports.concatAll)(S);
    return function (middle) { return (0, function_1.flow)((0, exports.intersperse)(middle), concatAllS); };
};
exports.intercalate = intercalate;
function groupSort(O) {
    var sortO = (0, exports.sort)(O);
    var groupO = group(O);
    return function (as) { return ((0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : exports.empty); };
}
exports.groupSort = groupSort;
function filter(predicate) {
    return (0, exports.filterWithIndex)(function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var filterWithIndex = function (predicate) {
    return function (as) {
        return (0, exports.fromReadonlyArray)(as.filter(function (a, i) { return predicate(i, a); }));
    };
};
exports.filterWithIndex = filterWithIndex;
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
exports.uncons = exports.unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
exports.unsnoc = exports.unappend;
function cons(head, tail) {
    return tail === undefined ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail, (0, exports.prepend)(head));
}
exports.cons = cons;
/**
 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var snoc = function (init, end) { return (0, function_1.pipe)(init, concat([end])); };
exports.snoc = snoc;
/**
 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var insertAt = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
    };
};
exports.insertAt = insertAt;
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
exports.prependToAll = exports.prependAll;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.fold = exports.concatAll;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
 * (where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.readonlyNonEmptyArray = {
    URI: exports.URI,
    of: exports.of,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: exports.flatMap,
    extend: _extend,
    extract: exports.extract,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: exports.sequence,
    reduceWithIndex: _reduceWithIndex,
    foldMapWithIndex: _foldMapWithIndex,
    reduceRightWithIndex: _reduceRightWithIndex,
    traverseWithIndex: _traverseWithIndex,
    alt: _alt
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/Semigroup.js":
/*!*********************************************!*\
  !*** ./node_modules/fp-ts/lib/Semigroup.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
var M = __importStar(__webpack_require__(/*! ./Magma */ "./node_modules/fp-ts/lib/Magma.js"));
var Or = __importStar(__webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/lib/Ord.js"));
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Get a semigroup where `concat` will return the minimum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.min(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 1)
 *
 * @category constructors
 * @since 2.10.0
 */
var min = function (O) { return ({
    concat: Or.min(O)
}); };
exports.min = min;
/**
 * Get a semigroup where `concat` will return the maximum, based on the provided order.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/Semigroup'
 *
 * const S1 = S.max(N.Ord)
 *
 * assert.deepStrictEqual(S1.concat(1, 2), 2)
 *
 * @category constructors
 * @since 2.10.0
 */
var max = function (O) { return ({
    concat: Or.max(O)
}); };
exports.max = max;
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
exports.constant = constant;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 *
 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
 *
 * @since 2.10.0
 */
exports.reverse = M.reverse;
/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @example
 * import { struct } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * interface Point {
 *   readonly x: number
 *   readonly y: number
 * }
 *
 * const S = struct<Point>({
 *   x: N.SemigroupSum,
 *   y: N.SemigroupSum
 * })
 *
 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
 *
 * @since 2.10.0
 */
var struct = function (semigroups) { return ({
    concat: function (first, second) {
        var r = {};
        for (var k in semigroups) {
            if (_.has.call(semigroups, k)) {
                r[k] = semigroups[k].concat(first[k], second[k]);
            }
        }
        return r;
    }
}); };
exports.struct = struct;
/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @example
 * import { tuple } from 'fp-ts/Semigroup'
 * import * as B from 'fp-ts/boolean'
 * import * as N from 'fp-ts/number'
 * import * as S from 'fp-ts/string'
 *
 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
 *
 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
 *
 * @since 2.10.0
 */
var tuple = function () {
    var semigroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        semigroups[_i] = arguments[_i];
    }
    return ({
        concat: function (first, second) { return semigroups.map(function (s, i) { return s.concat(first[i], second[i]); }); }
    });
};
exports.tuple = tuple;
/**
 * Between each pair of elements insert `middle`.
 *
 * @example
 * import { intercalate } from 'fp-ts/Semigroup'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const S1 = pipe(S.Semigroup, intercalate(' + '))
 *
 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
 *
 * @since 2.10.0
 */
var intercalate = function (middle) {
    return function (S) { return ({
        concat: function (x, y) { return S.concat(x, S.concat(middle, y)); }
    }); };
};
exports.intercalate = intercalate;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
var first = function () { return ({ concat: function_1.identity }); };
exports.first = first;
/**
 * Always return the last argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
 *
 * @category instances
 * @since 2.10.0
 */
var last = function () { return ({ concat: function (_, y) { return y; } }); };
exports.last = last;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Semigroup'
 * import * as N from 'fp-ts/number'
 *
 * const sum = concatAll(N.SemigroupSum)(0)
 *
 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
 * assert.deepStrictEqual(sum([]), 0)
 *
 * @since 2.10.0
 */
exports.concatAll = M.concatAll;
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `void` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupVoid = (0, exports.constant)(undefined);
/**
 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getObjectSemigroup = function () { return ({
    concat: function (first, second) { return Object.assign({}, first, second); }
}); };
exports.getObjectSemigroup = getObjectSemigroup;
/**
 * Use [`last`](#last) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getLastSemigroup = exports.last;
/**
 * Use [`first`](#first) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getFirstSemigroup = exports.first;
/**
 * Use [`tuple`](#tuple) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getTupleSemigroup = exports.tuple;
/**
 * Use [`struct`](#struct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getStructSemigroup = exports.struct;
/**
 * Use [`reverse`](#reverse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getDualSemigroup = exports.reverse;
/**
 * Use [`max`](#max) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getJoinSemigroup = exports.max;
/**
 * Use [`min`](#min) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getMeetSemigroup = exports.min;
/**
 * Use [`intercalate`](#intercalate) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
exports.getIntercalateSemigroup = exports.intercalate;
function fold(S) {
    var concatAllS = (0, exports.concatAll)(S);
    return function (startWith, as) { return (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as)); };
}
exports.fold = fold;
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.getFunctionSemigroup = function_1.getSemigroup;
/**
 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupString = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
exports.semigroupProduct = {
    concat: function (x, y) { return x * y; }
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/Separated.js":
/*!*********************************************!*\
  !*** ./node_modules/fp-ts/lib/Separated.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
var function_1 = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/lib/function.js");
var Functor_1 = __webpack_require__(/*! ./Functor */ "./node_modules/fp-ts/lib/Functor.js");
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
var separated = function (left, right) { return ({ left: left, right: right }); };
exports.separated = separated;
var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
var _mapLeft = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f)); };
var _bimap = function (fa, g, f) { return (0, function_1.pipe)(fa, (0, exports.bimap)(g, f)); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.10.0
 */
var map = function (f) {
    return function (fa) {
        return (0, exports.separated)((0, exports.left)(fa), f((0, exports.right)(fa)));
    };
};
exports.map = map;
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.10.0
 */
var mapLeft = function (f) {
    return function (fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), (0, exports.right)(fa));
    };
};
exports.mapLeft = mapLeft;
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.10.0
 */
var bimap = function (f, g) {
    return function (fa) {
        return (0, exports.separated)(f((0, exports.left)(fa)), g((0, exports.right)(fa)));
    };
};
exports.bimap = bimap;
/**
 * @category type lambdas
 * @since 2.10.0
 */
exports.URI = 'Separated';
/**
 * @category instances
 * @since 2.10.0
 */
exports.Bifunctor = {
    URI: exports.URI,
    mapLeft: _mapLeft,
    bimap: _bimap
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Functor = {
    URI: exports.URI,
    map: _map
};
/**
 * @category mapping
 * @since 2.10.0
 */
exports.flap = (0, Functor_1.flap)(exports.Functor);
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.10.0
 */
var left = function (s) { return s.left; };
exports.left = left;
/**
 * @since 2.10.0
 */
var right = function (s) { return s.right; };
exports.right = right;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Witherable.js":
/*!**********************************************!*\
  !*** ./node_modules/fp-ts/lib/Witherable.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterE = exports.witherDefault = exports.wiltDefault = void 0;
var _ = __importStar(__webpack_require__(/*! ./internal */ "./node_modules/fp-ts/lib/internal.js"));
function wiltDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
exports.wiltDefault = wiltDefault;
function witherDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
exports.witherDefault = witherDefault;
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _.some(a) : _.none); }); }); }; };
    };
}
exports.filterE = filterE;


/***/ }),

/***/ "./node_modules/fp-ts/lib/Zero.js":
/*!****************************************!*\
  !*** ./node_modules/fp-ts/lib/Zero.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guard = void 0;
function guard(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
}
exports.guard = guard;


/***/ }),

/***/ "./node_modules/fp-ts/lib/boolean.js":
/*!*******************************************!*\
  !*** ./node_modules/fp-ts/lib/boolean.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Show = exports.Ord = exports.MonoidAny = exports.MonoidAll = exports.SemigroupAny = exports.SemigroupAll = exports.BooleanAlgebra = exports.Eq = exports.fold = exports.match = exports.foldW = exports.matchW = exports.isBoolean = void 0;
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @category refinements
 * @since 2.11.0
 */
var isBoolean = function (u) { return typeof u === 'boolean'; };
exports.isBoolean = isBoolean;
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchW = function (onFalse, onTrue) {
    return function (value) {
        return value ? onTrue() : onFalse();
    };
};
exports.matchW = matchW;
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
exports.foldW = exports.matchW;
/**
 * Defines the fold over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is false, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 * import { match } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(match(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @category pattern matching
 * @since 2.10.0
 */
exports.match = exports.foldW;
/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.2.0
 */
exports.fold = exports.match;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
exports.Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.BooleanAlgebra = {
    meet: function (first, second) { return first && second; },
    join: function (first, second) { return first || second; },
    zero: false,
    one: true,
    implies: function (first, second) { return !first || second; },
    not: function (b) { return !b; }
};
/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(SemigroupAll.concat(true, true), true)
 * assert.deepStrictEqual(SemigroupAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupAll = {
    concat: function (first, second) { return first && second; }
};
/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(SemigroupAny.concat(true, true), true)
 * assert.deepStrictEqual(SemigroupAny.concat(true, false), true)
 * assert.deepStrictEqual(SemigroupAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupAny = {
    concat: function (first, second) { return first || second; }
};
/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @example
 * import { MonoidAll } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(MonoidAll.concat(true, true), true)
 * assert.deepStrictEqual(MonoidAll.concat(true, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidAll = {
    concat: exports.SemigroupAll.concat,
    empty: true
};
/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @example
 * import { MonoidAny } from 'fp-ts/boolean'
 *
 * assert.deepStrictEqual(MonoidAny.concat(true, true), true)
 * assert.deepStrictEqual(MonoidAny.concat(true, false), true)
 * assert.deepStrictEqual(MonoidAny.concat(false, false), false)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidAny = {
    concat: exports.SemigroupAny.concat,
    empty: false
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Ord = {
    equals: exports.Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Show = {
    show: function (b) { return JSON.stringify(b); }
};


/***/ }),

/***/ "./node_modules/fp-ts/lib/function.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/lib/function.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dual = exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var getBooleanAlgebra = function (B) {
    return function () { return ({
        meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
        join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
        zero: function () { return B.zero; },
        one: function () { return B.one; },
        implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
        not: function (x) { return function (a) { return B.not(x(a)); }; }
    }); };
};
exports.getBooleanAlgebra = getBooleanAlgebra;
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function (S) {
    return function () { return ({
        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
    }); };
};
exports.getSemigroup = getSemigroup;
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getMonoid = function (M) {
    var getSemigroupM = (0, exports.getSemigroup)(M);
    return function () { return ({
        concat: getSemigroupM().concat,
        empty: function () { return M.empty; }
    }); };
};
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemiring = function (S) { return ({
    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
    zero: function () { return S.zero; },
    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
    one: function () { return S.one; }
}); };
exports.getSemiring = getSemiring;
/**
 * @category instances
 * @since 2.10.0
 */
var getRing = function (R) {
    var S = (0, exports.getSemiring)(R);
    return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
    };
};
exports.getRing = getRing;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var apply = function (a) {
    return function (f) {
        return f(a);
    };
};
exports.apply = apply;
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
exports.identity = identity;
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
exports.constant = constant;
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
exports.constTrue = constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
exports.constFalse = constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
exports.constNull = constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
exports.constUndefined = constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
exports.constVoid = exports.constUndefined;
function flip(f) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 1) {
            return f(args[1], args[0]);
        }
        return function (a) { return f(a)(args[0]); };
    };
}
exports.flip = flip;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
exports.flow = flow;
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
exports.tuple = tuple;
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
exports.increment = increment;
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
exports.decrement = decrement;
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
exports.tupled = tupled;
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
exports.untupled = untupled;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
            var ret = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
        }
    }
}
exports.pipe = pipe;
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
exports.hole = absurd;
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
exports.SK = SK;
/**
 * Use `Predicate` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
exports.not = not;
/**
 * Use `Endomorphism` module instead.
 *
 * @category zone of death
 * @since 2.10.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return ({
    concat: function (first, second) { return flow(first, second); },
    empty: identity
}); };
exports.getEndomorphismMonoid = getEndomorphismMonoid;
/** @internal */
var dual = function (arity, body) {
    var isDataFirst = typeof arity === 'number' ? function (args) { return args.length >= arity; } : arity;
    return function () {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
            return body.apply(this, args);
        }
        return function (self) { return body.apply(void 0, __spreadArray([self], args, false)); };
    };
};
exports.dual = dual;


/***/ }),

/***/ "./node_modules/fp-ts/lib/internal.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/lib/internal.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isNone = function (fa) { return fa._tag === 'None'; };
exports.isNone = isNone;
/** @internal */
var isSome = function (fa) { return fa._tag === 'Some'; };
exports.isSome = isSome;
/** @internal */
exports.none = { _tag: 'None' };
/** @internal */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
exports.some = some;
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft = function (ma) { return ma._tag === 'Left'; };
exports.isLeft = isLeft;
/** @internal */
var isRight = function (ma) { return ma._tag === 'Right'; };
exports.isRight = isRight;
/** @internal */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
exports.left = left;
/** @internal */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
exports.right = right;
// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var singleton = function (a) { return [a]; };
exports.singleton = singleton;
/** @internal */
var isNonEmpty = function (as) { return as.length > 0; };
exports.isNonEmpty = isNonEmpty;
/** @internal */
var head = function (as) { return as[0]; };
exports.head = head;
/** @internal */
var tail = function (as) { return as.slice(1); };
exports.tail = tail;
// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------
/** @internal */
exports.emptyReadonlyArray = [];
/** @internal */
exports.emptyRecord = {};
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
exports.has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1), true); };
exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;


/***/ }),

/***/ "./node_modules/fp-ts/lib/number.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/lib/number.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Field = exports.MonoidProduct = exports.MonoidSum = exports.SemigroupProduct = exports.SemigroupSum = exports.MagmaSub = exports.Show = exports.Bounded = exports.Ord = exports.Eq = exports.isNumber = void 0;
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @category refinements
 * @since 2.11.0
 */
var isNumber = function (u) { return typeof u === 'number'; };
exports.isNumber = isNumber;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
exports.Eq = {
    equals: function (first, second) { return first === second; }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Ord = {
    equals: exports.Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Bounded = {
    equals: exports.Eq.equals,
    compare: exports.Ord.compare,
    top: Infinity,
    bottom: -Infinity
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Show = {
    show: function (n) { return JSON.stringify(n); }
};
/**
 * @category instances
 * @since 2.11.0
 */
exports.MagmaSub = {
    concat: function (first, second) { return first - second; }
};
/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupSum = {
    concat: function (first, second) { return first + second; }
};
/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
 *
 * @category instances
 * @since 2.10.0
 */
exports.SemigroupProduct = {
    concat: function (first, second) { return first * second; }
};
/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { MonoidSum } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidSum = {
    concat: exports.SemigroupSum.concat,
    empty: 0
};
/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @example
 * import { MonoidProduct } from 'fp-ts/number'
 *
 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
 *
 * @category instances
 * @since 2.10.0
 */
exports.MonoidProduct = {
    concat: exports.SemigroupProduct.concat,
    empty: 1
};
/**
 * @category instances
 * @since 2.10.0
 */
exports.Field = {
    add: exports.SemigroupSum.concat,
    zero: 0,
    mul: exports.SemigroupProduct.concat,
    one: 1,
    sub: exports.MagmaSub.concat,
    degree: function (_) { return 1; },
    div: function (first, second) { return first / second; },
    mod: function (first, second) { return first % second; }
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var C = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Canvas */ "./node_modules/@onur1/drawing3d/lib/Canvas.js"));
var D = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Drawing */ "./node_modules/@onur1/drawing3d/lib/Drawing.js"));
var IO = __importStar(__webpack_require__(/*! fp-ts/IO */ "./node_modules/fp-ts/es6/IO.js"));
var Console_1 = __webpack_require__(/*! fp-ts/lib/Console */ "./node_modules/fp-ts/lib/Console.js");
var function_1 = __webpack_require__(/*! fp-ts/lib/function */ "./node_modules/fp-ts/lib/function.js");
var p197_1 = __webpack_require__(/*! ./p197 */ "./src/p197.ts");
var p161_1 = __webpack_require__(/*! ./p161 */ "./src/p161.ts");
var draw = function (f) {
    return function (canvasId) {
        var canvas = C.unsafeGetCanvasElementById(canvasId);
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio;
        // Set the "actual" size of the canvas
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        // Set the "drawn" size of the canvas
        canvas.style.width = "".concat(rect.width, "px");
        canvas.style.height = "".concat(rect.height, "px");
        return (0, function_1.pipe)(C.getContext2D(canvas), IO.chain(function (ctx) {
            // Scale the 2d context to ensure correct drawing operations
            ctx.scale(dpr, dpr);
            return (0, function_1.pipe)(C.getDimensions(canvas), IO.map(function (dim) { return ({ width: dim.width / dpr, height: dim.height / dpr }); }), IO.chain((0, function_1.flow)(f, D.render, C.renderTo(canvasId, function () { return (0, Console_1.error)("no canvas not found with id ".concat(canvasId)); }))));
        }));
    };
};
exports["default"] = {
    p197: draw(p197_1.p197),
    p161: draw(p161_1.p161),
};


/***/ }),

/***/ "./src/p161.ts":
/*!*********************!*\
  !*** ./src/p161.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.p161 = void 0;
var RA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js"));
var RNEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var E = __importStar(__webpack_require__(/*! fp-ts/Either */ "./node_modules/fp-ts/es6/Either.js"));
var function_1 = __webpack_require__(/*! fp-ts/lib/function */ "./node_modules/fp-ts/lib/function.js");
var S = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Shape */ "./node_modules/@onur1/drawing3d/lib/Shape.js"));
var Color = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Color */ "./node_modules/@onur1/drawing3d/lib/Color.js"));
var D = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Drawing */ "./node_modules/@onur1/drawing3d/lib/Drawing.js"));
var path = S.path(RA.Foldable);
var points = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
];
var getEdges = function (i) { return [
    [i, (i + 1) % 4],
    [i + 4, ((i + 1) % 4) + 4],
    [i, i + 4],
]; };
var drawCube = function (shouldDrawEdge) {
    return S.composite((0, function_1.pipe)(RNEA.range(0, 3), RA.flatMap(function (i) {
        return (0, function_1.pipe)(getEdges(i), RNEA.map(function (ix) {
            return (0, function_1.pipe)((0, function_1.tuple)(points[ix[0]], points[ix[1]]), RNEA.map(function (vec) { return S.point(vec[0], vec[1], vec[2]); }));
        }), RA.chainWithIndex(function (j, m) { return (shouldDrawEdge(i + j * 4) ? [path(m)] : []); }));
    })));
};
var isBitSet = function (n) { return function (index) { return Boolean(n & (1 << index)); }; };
var cubeFromNumber = (0, function_1.flow)(isBitSet, drawCube);
var nextNumber = function (v) { return (0, function_1.pipe)((v | (v - 1)) + 1, function (t) { return t | ((((t & -t) / (v & -v)) >> 1) - 1); }); };
var lineColor = D.outlineColor(Color.white);
var cubeLineStyle = D.monoidOutlineStyle.concat(lineColor, D.lineCap('round'));
var closed = S.closed(RA.Foldable);
var renderLines = function (n, height, vertical) {
    var size = height / n;
    return D.many((0, function_1.pipe)(RNEA.range(1, n), RA.map(function (i) {
        return D.outline(path(vertical
            ? [
                [i * size, 0, 0],
                [i * size, height, 0],
            ]
            : [
                [0, i * size, 0],
                [height, i * size, 0],
            ]), D.outlineColor(Color.white));
    })));
};
var p161 = function (_a) {
    var width = _a.width, height = _a.height;
    var background = D.fill(closed([
        [0, 0, 0],
        [width, 0, 0],
        [width, height, 0],
        [0, width, height],
    ]), D.fillStyle(Color.hex('#1c1b17')));
    var scaleFactor = width / 31;
    return D.many([
        background,
        renderLines(31, width, false),
        renderLines(31, height, true),
        D.rotate(S.degrees(30), S.degrees(-60), S.degrees(0), D.scale(scaleFactor / 5, scaleFactor / 5, 1, D.many((0, function_1.pipe)(63, RA.chainRecDepthFirst(function (a) { return (a < 4095 ? [E.right(a), E.left(nextNumber(a))] : []); }), RA.map(cubeFromNumber), RA.map(function (s) { return D.outline(s, cubeLineStyle); }), RA.mapWithIndex(function (i, d) {
            return D.translate(-(scaleFactor / 2) + (scaleFactor * 31 - scaleFactor * Math.floor(i / 31)), scaleFactor / 2 + scaleFactor * (i % 31), 0, d);
        }))))),
    ]);
};
exports.p161 = p161;


/***/ }),

/***/ "./src/p197.ts":
/*!*********************!*\
  !*** ./src/p197.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.p197 = void 0;
var D = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Drawing */ "./node_modules/@onur1/drawing3d/lib/Drawing.js"));
var S = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Shape */ "./node_modules/@onur1/drawing3d/lib/Shape.js"));
var RNEA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyNonEmptyArray */ "./node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js"));
var RA = __importStar(__webpack_require__(/*! fp-ts/ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js"));
var Color = __importStar(__webpack_require__(/*! @onur1/drawing3d/lib/Color */ "./node_modules/@onur1/drawing3d/lib/Color.js"));
var function_1 = __webpack_require__(/*! fp-ts/lib/function */ "./node_modules/fp-ts/lib/function.js");
var path = S.path(RNEA.Foldable);
var foldMap = RNEA.foldMap(D.monoidDrawing);
var closed = S.closed(RA.Foldable);
var getCubeEdges = function (i) { return [
    [i, (i + 1) % 4],
    [i + 4, ((i + 1) % 4) + 4],
    [i, i + 4],
]; };
var cubePoints = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
];
var cubeSides = [
    [
        // abfe
        [-1, -1, -1],
        [1, -1, -1],
        [1, -1, 1],
        [-1, -1, 1],
    ],
    [
        // adhe
        [-1, -1, -1],
        [-1, 1, -1],
        [-1, 1, 1],
        [-1, -1, 1],
    ],
    [
        // bcgf
        [1, -1, -1],
        [1, 1, -1],
        [1, 1, 1],
        [1, -1, 1],
    ],
    [
        // cdhg
        [1, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, 1, 1],
    ],
    [
        // efgh
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
    ],
    [
        // abcd
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
    ],
];
var renderCube = function (_a) {
    var x = _a.x, y = _a.y, scale = _a.scale, rotateX = _a.rotateX, rotateY = _a.rotateY;
    return D.translate(x, y, 0, D.scale(scale, scale, 0, D.many([
        D.rotate(S.degrees(rotateX), S.degrees(rotateY), S.degrees(0), D.many((0, function_1.pipe)(cubeSides.map(function (m) { return closed(m.map(function (v) { return S.point(v[0] * 0.25, v[1] * 0.25, v[2] * 0.25); })); }), RA.map(function (shape) { return D.fill(shape, D.fillStyle(Color.hex('#1c1b17'))); }), RA.concat([
            D.outline(S.composite((0, function_1.pipe)(RNEA.range(0, 3), RA.flatMap(function (i) {
                return (0, function_1.pipe)(getCubeEdges(i), RNEA.map(function (ix) {
                    return (0, function_1.pipe)((0, function_1.tuple)(cubePoints[ix[0]], cubePoints[ix[1]]), RNEA.map(function (vec) { return S.point(vec[0] * 0.25, vec[1] * 0.25, vec[2] * 0.25); }));
                }), RA.chain(function (m) { return [path(m)]; }));
            }))), D.outlineColor(Color.white)),
        ])))),
        D.clipped(closed([
            [-0.25, -0.25, 0],
            [0.25, -0.25, 0],
            [0.25, 0.25, 0],
            [-0.25, 0.25, 0],
        ]), D.rotate(S.degrees(rotateX), S.degrees(rotateY), S.degrees(0), D.outline(S.composite((0, function_1.pipe)(RNEA.range(0, 3), RA.flatMap(function (i) {
            return (0, function_1.pipe)(getCubeEdges(i), RNEA.map(function (ix) {
                return (0, function_1.pipe)((0, function_1.tuple)(cubePoints[ix[0]], cubePoints[ix[1]]), RNEA.map(function (vec) { return S.point(vec[0] * 0.25, vec[1] * 0.25, vec[2] * 0.25); }));
            }), RA.chain(function (m) { return [path(m)]; }));
        }))), D.monoidOutlineStyle.concat(D.monoidOutlineStyle.concat(D.outlineColor(Color.hex('#fff')), D.lineCap('round')), D.lineWidth(4))))),
    ])));
};
var withClipping = function (n, offset, scale, d) {
    if (offset === void 0) { offset = 0; }
    if (scale === void 0) { scale = 1; }
    return D.clipped(S.composite((0, function_1.pipe)(RNEA.range(0, n - offset), RA.map(function (i) {
        return closed([
            [i * (2 * scale) + offset * scale, 0, 0],
            [i * (2 * scale) + scale + offset * scale, 0, 0],
            [i * (2 * scale) + scale + offset * scale, scale + n * (2 * scale), 0],
            [i * (2 * scale) + offset * scale, scale + n * (2 * scale), 0],
        ]);
    }))), d);
};
var renderLines = function (n, len, vertical) {
    return D.many((0, function_1.pipe)(RNEA.range(1, n), RA.map(function (i) {
        return D.outline(path(vertical
            ? [
                [i, 0, 0],
                [i, len, 0],
            ]
            : [
                [0, i, 0],
                [len, i, 0],
            ]), D.outlineColor(Color.white));
    })));
};
var p197 = function (_a) {
    var width = _a.width, height = _a.height;
    var background = D.fill(closed([
        [0, 0, 0],
        [width, 0, 0],
        [width, height, 0],
        [0, width, height],
    ]), D.fillStyle(Color.hex('#1c1b17')));
    var scaleFactor = Math.max(width, height) / 8;
    var scaled = function (d) {
        var s = scaleFactor;
        return D.scale(s - s / 8, s - s / 8, 0, d);
    };
    return D.many([
        background,
        scaled(D.many([renderLines(8, 9, false)])),
        withClipping(4, 0, scaleFactor - scaleFactor / 8, foldMap(renderCube)((0, function_1.pipe)(RNEA.range(0, 63), RNEA.map(function (i) { return ({
            x: 1 + (i % 8),
            y: 1 + Math.floor(i / 8),
            scale: scaleFactor - scaleFactor / 8,
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
        }); })))),
        withClipping(4, 1, scaleFactor - scaleFactor / 8, foldMap(renderCube)((0, function_1.pipe)(RNEA.range(0, 63), RNEA.map(function (i) { return ({
            x: 1 + (i % 8),
            y: 1 + Math.floor(i / 8),
            scale: scaleFactor - scaleFactor / 8,
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
        }); })))),
        scaled(D.many([renderLines(8, 9, true)])),
    ]);
};
exports.p197 = p197;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	window.cubiclimit = __webpack_exports__["default"];
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map