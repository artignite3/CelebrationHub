"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DomeGallery;
var react_1 = require("react");
var DEFAULT_IMAGES = [
    { src: "/data/pic/1.jpg", alt: "Birthday celebration" },
    { src: "/data/pic/2.jpg", alt: "Party decorations" },
    { src: "/data/pic/3.jpg", alt: "Festive lights" },
    { src: "/data/pic/4.jpg", alt: "Birthday cake" },
    { src: "/data/pic/5.jpg", alt: "Confetti" },
    { src: "/data/pic/6.jpg", alt: "Celebration moment" },
    { src: "/data/pic/7.jpg", alt: "Happy birthday" },
    { src: "/data/pic/8.jpg", alt: "Birthday celebration" },
    { src: "/data/pic/9.jpg", alt: "Party decorations" },
    { src: "/data/pic/10.jpg", alt: "Festive lights" },
    { src: "/data/pic/11.jpg", alt: "Birthday cake" },
    { src: "/data/pic/12.jpg", alt: "Confetti" },
    { src: "/data/pic/15.jpg", alt: "Celebration moment" },
    { src: "/data/pic/14.jpg", alt: "Happy birthday" },
    { src: "/data/pic/15.jpg", alt: "Party decorations" },
    { src: "/data/pic/16.jpg", alt: "Festive lights" },
    { src: "/data/pic/17.jpg", alt: "Birthday cake" },
    { src: "/data/pic/18.jpg", alt: "Confetti" },
    { src: "/data/pic/19.jpg", alt: "Celebration moment" },
    { src: "/data/pic/20.jpg", alt: "Happy birthday" },
    { src: "/data/pic/21.jpg", alt: "Birthday celebration" },
];
var DEFAULTS = {
    maxVerticalRotationDeg: 5,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 35,
};
var clamp = function (v, min, max) { return Math.min(Math.max(v, min), max); };
var normalizeAngle = function (d) { return ((d % 360) + 360) % 360; };
var wrapAngleSigned = function (deg) {
    var a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
};
function buildItems(pool, seg) {
    var xCols = Array.from({ length: seg }, function (_, i) { return -37 + i * 2; });
    var evenYs = [-4, -2, 0, 2, 4];
    var oddYs = [-3, -1, 1, 3, 5];
    var coords = xCols.flatMap(function (x, c) {
        var ys = c % 2 === 0 ? evenYs : oddYs;
        return ys.map(function (y) { return ({ x: x, y: y, sizeX: 2, sizeY: 2 }); });
    });
    var totalSlots = coords.length;
    if (pool.length === 0) {
        return coords.map(function (c) { return (__assign(__assign({}, c), { src: "", alt: "" })); });
    }
    var normalizedImages = pool.map(function (image) {
        if (typeof image === "string") {
            return { src: image, alt: "" };
        }
        return { src: image.src || "", alt: image.alt || "" };
    });
    var usedImages = Array.from({ length: totalSlots }, function (_, i) { return normalizedImages[i % normalizedImages.length]; });
    return coords.map(function (c, i) { return (__assign(__assign({}, c), { src: usedImages[i].src, alt: usedImages[i].alt })); });
}
function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
    var unit = 360 / segments / 2;
    var rotateY = unit * (offsetX + (sizeX - 1) / 2);
    var rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return { rotateX: rotateX, rotateY: rotateY };
}
function DomeGallery(_a) {
    var _b;
    var _c = _a.images, images = _c === void 0 ? DEFAULT_IMAGES : _c, _d = _a.fit, fit = _d === void 0 ? 0.5 : _d, _e = _a.fitBasis, fitBasis = _e === void 0 ? "auto" : _e, _f = _a.minRadius, minRadius = _f === void 0 ? 600 : _f, _g = _a.maxRadius, maxRadius = _g === void 0 ? Number.POSITIVE_INFINITY : _g, _h = _a.padFactor, padFactor = _h === void 0 ? 0.25 : _h, _j = _a.overlayBlurColor, overlayBlurColor = _j === void 0 ? "#0f172a" : _j, _k = _a.maxVerticalRotationDeg, maxVerticalRotationDeg = _k === void 0 ? DEFAULTS.maxVerticalRotationDeg : _k, _l = _a.dragSensitivity, dragSensitivity = _l === void 0 ? DEFAULTS.dragSensitivity : _l, _m = _a.enlargeTransitionMs, enlargeTransitionMs = _m === void 0 ? DEFAULTS.enlargeTransitionMs : _m, _o = _a.segments, segments = _o === void 0 ? DEFAULTS.segments : _o, _p = _a.dragDampening, dragDampening = _p === void 0 ? 2 : _p, _q = _a.openedImageWidth, openedImageWidth = _q === void 0 ? "400px" : _q, _r = _a.openedImageHeight, openedImageHeight = _r === void 0 ? "400px" : _r, _s = _a.imageBorderRadius, imageBorderRadius = _s === void 0 ? "20px" : _s, _t = _a.openedImageBorderRadius, openedImageBorderRadius = _t === void 0 ? "20px" : _t, _u = _a.grayscale, grayscale = _u === void 0 ? false : _u;
    var _v = (0, react_1.useState)(false), isLoaded = _v[0], setIsLoaded = _v[1];
    var rootRef = (0, react_1.useRef)(null);
    var mainRef = (0, react_1.useRef)(null);
    var sphereRef = (0, react_1.useRef)(null);
    var frameRef = (0, react_1.useRef)(null);
    var viewerRef = (0, react_1.useRef)(null);
    var scrimRef = (0, react_1.useRef)(null);
    var rotationRef = (0, react_1.useRef)({ x: 0, y: 0 });
    var startRotRef = (0, react_1.useRef)({ x: 0, y: 0 });
    var startPosRef = (0, react_1.useRef)(null);
    var draggingRef = (0, react_1.useRef)(false);
    var movedRef = (0, react_1.useRef)(false);
    var inertiaRAF = (0, react_1.useRef)(null);
    var lastDragEndAt = (0, react_1.useRef)(0);
    var lockedRadiusRef = (0, react_1.useRef)(null);
    var items = (0, react_1.useMemo)(function () { return buildItems(images, segments); }, [images, segments]);
    var applyTransform = function (xDeg, yDeg) {
        try {
            var el = sphereRef.current;
            if (el) {
                el.style.transform = "translateZ(calc(var(--radius) * -1)) rotateX(" + xDeg + "deg) rotateY(" + yDeg + "deg)";
            }
        }
        catch (error) {
            console.warn('Failed to apply transform:', error);
        }
    };
    var stopInertia = (0, react_1.useCallback)(function () {
        if (inertiaRAF.current) {
            cancelAnimationFrame(inertiaRAF.current);
            inertiaRAF.current = null;
        }
    }, []);
    var startInertia = (0, react_1.useCallback)(function (vx, vy) {
        var MAX_V = 1.4;
        var vX = clamp(vx, -MAX_V, MAX_V) * 80;
        var vY = clamp(vy, -MAX_V, MAX_V) * 80;
        var frames = 0;
        var d = clamp(dragDampening !== null && dragDampening !== void 0 ? dragDampening : 0.6, 0, 1);
        var frictionMul = 0.94 + 0.055 * d;
        var stopThreshold = 0.015 - 0.01 * d;
        var maxFrames = Math.round(90 + 270 * d);
        var step = function () {
            vX *= frictionMul;
            vY *= frictionMul;
            if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                inertiaRAF.current = null;
                return;
            }
            if (++frames > maxFrames) {
                inertiaRAF.current = null;
                return;
            }
            var nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
            var nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);
            inertiaRAF.current = requestAnimationFrame(step);
        };
        stopInertia();
        inertiaRAF.current = requestAnimationFrame(step);
    }, [dragDampening, maxVerticalRotationDeg, stopInertia]);
    (0, react_1.useEffect)(function () {
        var main = mainRef.current;
        if (!main)
            return;
        var isPointerDown = false;
        var startX = 0;
        var startY = 0;
        var handlePointerDown = function (e) {
            try {
                stopInertia();
                isPointerDown = true;
                startX = e.clientX;
                startY = e.clientY;
                startRotRef.current = __assign({}, rotationRef.current);
                startPosRef.current = { x: startX, y: startY };
                movedRef.current = false;
                main.style.cursor = "grabbing";
            }
            catch (error) {
                console.warn('Error in handlePointerDown:', error);
            }
        };
        var handlePointerMove = function (e) {
            try {
                if (!isPointerDown || !startPosRef.current)
                    return;
                var dxTotal = e.clientX - startPosRef.current.x;
                var dyTotal = e.clientY - startPosRef.current.y;
                if (!movedRef.current) {
                    var dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
                    if (dist2 > 16)
                        movedRef.current = true;
                }
                if (movedRef.current) {
                    var nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                    var nextY = startRotRef.current.y + dxTotal / dragSensitivity;
                    rotationRef.current = { x: nextX, y: nextY };
                    applyTransform(nextX, nextY);
                }
            }
            catch (error) {
                console.warn('Error in handlePointerMove:', error);
            }
        };
        var handlePointerUp = function (e) {
            try {
                if (!isPointerDown)
                    return;
                isPointerDown = false;
                main.style.cursor = "grab";
                if (startPosRef.current && movedRef.current) {
                    var dx = e.clientX - startPosRef.current.x;
                    var dy = e.clientY - startPosRef.current.y;
                    var vx = (dx / dragSensitivity) * 0.02;
                    var vy = (dy / dragSensitivity) * 0.02;
                    if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
                        startInertia(vx, vy);
                    }
                }
                startPosRef.current = null;
                movedRef.current = false;
                lastDragEndAt.current = performance.now();
            }
            catch (error) {
                console.warn('Error in handlePointerUp:', error);
            }
        };
        main.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        return function () {
            main.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [dragSensitivity, maxVerticalRotationDeg, stopInertia, startInertia]);
    (0, react_1.useEffect)(function () {
        var root = rootRef.current;
        if (!root)
            return;
        try {
            var ro_1 = new ResizeObserver(function (entries) {
                try {
                    var cr = entries[0].contentRect;
                    var w = Math.max(1, cr.width);
                    var h = Math.max(1, cr.height);
                    var minDim = Math.min(w, h);
                    var maxDim = Math.max(w, h);
                    var aspect = w / h;
                    var basis = void 0;
                    switch (fitBasis) {
                        case "min":
                            basis = minDim;
                            break;
                        case "max":
                            basis = maxDim;
                            break;
                        case "width":
                            basis = w;
                            break;
                        case "height":
                            basis = h;
                            break;
                        default:
                            basis = aspect >= 1.3 ? w : minDim;
                    }
                    var radius = basis * fit;
                    var heightGuard = h * 1.35;
                    radius = Math.min(radius, heightGuard);
                    radius = clamp(radius, minRadius, maxRadius);
                    lockedRadiusRef.current = Math.round(radius);
                    var viewerPad = Math.max(8, Math.round(minDim * padFactor));
                    root.style.setProperty("--radius", lockedRadiusRef.current + "px");
                    root.style.setProperty("--viewer-pad", viewerPad + "px");
                    root.style.setProperty("--overlay-blur-color", overlayBlurColor);
                    root.style.setProperty("--tile-radius", imageBorderRadius);
                    root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
                    root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
                    applyTransform(rotationRef.current.x, rotationRef.current.y);
                }
                catch (error) {
                    console.warn('Error in ResizeObserver callback:', error);
                }
            });
            ro_1.observe(root);
            return function () { return ro_1.disconnect(); };
        }
        catch (error) {
            console.warn('Error creating ResizeObserver:', error);
        }
    }, [
        fit,
        fitBasis,
        minRadius,
        maxRadius,
        padFactor,
        overlayBlurColor,
        grayscale,
        imageBorderRadius,
        openedImageBorderRadius,
    ]);
    (0, react_1.useEffect)(function () {
        try {
            applyTransform(rotationRef.current.x, rotationRef.current.y);
        }
        catch (error) {
            console.warn('Error applying initial transform:', error);
        }
    }, []);
    var cssStyles = ".sphere-root {" +
        "  --radius: 520px;" +
        "  --viewer-pad: 72px;" +
        "  --circ: calc(var(--radius) * 3.14);" +
        "  --rot-y: calc((360deg / var(--segments-x)) / 2);" +
        "  --rot-x: calc((360deg / var(--segments-y)) / 2);" +
        "  --item-width: calc(var(--circ) / var(--segments-x));" +
        "  --item-height: calc(var(--circ) / var(--segments-y));" +
        "}" +
        ".sphere-root * { box-sizing: border-box; }" +
        ".sphere, .sphere-item, .item__image { transform-style: preserve-3d; }" +
        ".stage {" +
        "  width: 100%;" +
        "  height: 100%;" +
        "  display: grid;" +
        "  place-items: center;" +
        "  position: absolute;" +
        "  inset: 0;" +
        "  margin: auto;" +
        "  perspective: calc(var(--radius) * 2);" +
        "  perspective-origin: 50% 50%;" +
        "}" +
        ".sphere {" +
        "  transform: translateZ(calc(var(--radius) * -1));" +
        "  will-change: transform;" +
        "  position: absolute;" +
        "}" +
        ".sphere-item {" +
        "  width: calc(var(--item-width) * var(--item-size-x));" +
        "  height: calc(var(--item-height) * var(--item-size-y));" +
        "  position: absolute;" +
        "  top: -999px;" +
        "  bottom: -999px;" +
        "  left: -999px;" +
        "  right: -999px;" +
        "  margin: auto;" +
        "  transform-origin: 50% 50%;" +
        "  backface-visibility: hidden;" +
        "  transition: transform 300ms;" +
        "  transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))" +
        "           rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))" +
        "           translateZ(var(--radius));" +
        "}" +
        ".item__image {" +
        "  position: absolute;" +
        "  inset: 10px;" +
        "  border-radius: var(--tile-radius, 12px);" +
        "  overflow: hidden;" +
        "  cursor: grab;" +
        "  backface-visibility: hidden;" +
        "  -webkit-backface-visibility: hidden;" +
        "  transition: transform 300ms;" +
        "  pointer-events: auto;" +
        "  -webkit-transform: translateZ(0);" +
        "  transform: translateZ(0);" +
        "}" +
        ".item__image:active {" +
        "  cursor: grabbing;" +
        "}";
    return (<>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }}/>
      <div ref={rootRef} className="sphere-root relative w-full h-full" style={_b = {},
            _b["--segments-x"] = segments,
            _b["--segments-y"] = segments,
            _b["--overlay-blur-color"] = overlayBlurColor,
            _b["--tile-radius"] = imageBorderRadius,
            _b["--enlarge-radius"] = openedImageBorderRadius,
            _b["--image-filter"] = grayscale ? "grayscale(1)" : "none",
            _b}>
        {!isLoaded ? (<div className="absolute inset-0 flex items-center justify-center bg-black/50 z-[10]">
            <div className="text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
              <p className="mt-2">Loading memories...</p>
            </div>
          </div>) : (<main ref={mainRef} className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent" style={{
                touchAction: "none",
                WebkitUserSelect: "none",
                cursor: "grab",
            }}>
            <div className="stage">
              <div ref={sphereRef} className="sphere">
                {items.map(function (it, i) {
                var _a;
                return (<div key={it.x + "," + it.y + "," + i} className="sphere-item absolute m-auto" data-src={it.src} data-alt={it.alt} data-offset-x={it.x} data-offset-y={it.y} data-size-x={it.sizeX} data-size-y={it.sizeY} style={_a = {},
                        _a["--offset-x"] = it.x,
                        _a["--offset-y"] = it.y,
                        _a["--item-size-x"] = it.sizeX,
                        _a["--item-size-y"] = it.sizeY,
                        _a.top = "-999px",
                        _a.bottom = "-999px",
                        _a.left = "-999px",
                        _a.right = "-999px",
                        _a}>
                    <div className="item__image absolute block overflow-hidden bg-slate-900" style={{
                        inset: "10px",
                        borderRadius: "var(--tile-radius, ".concat(imageBorderRadius, ")"),
                        backfaceVisibility: "hidden",
                    }}>
                      <img src={it.src || "/placeholder.svg"} draggable={false} alt={it.alt} className="w-full h-full object-cover pointer-events-none" loading="lazy" onLoad={function () {
                        var _a;
                        try {
                            // Check if all images have loaded
                            var images_1 = Array.from(((_a = sphereRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('img')) || []);
                            if (images_1.every(function (img) { return img.complete; })) {
                                setIsLoaded(true);
                            }
                        }
                        catch (error) {
                            console.warn('Error checking image load status:', error);
                            // Still consider loaded to prevent hanging
                            setIsLoaded(true);
                        }
                    }} onError={function () {
                        var _a;
                        try {
                            // Still count as loaded even if error (shows broken image but prevents hanging)
                            var images_2 = Array.from(((_a = sphereRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('img')) || []);
                            if (images_2.every(function (img) { return img.complete; })) {
                                setIsLoaded(true);
                            }
                        }
                        catch (error) {
                            console.warn('Error in image onError handler:', error);
                            // Still consider loaded to prevent hanging
                            setIsLoaded(true);
                        }
                    }} style={{
                        backfaceVisibility: "hidden",
                        filter: "var(--image-filter, ".concat(grayscale ? "grayscale(1)" : "none", ")"),
                    }}/>
                    </div>
                  </div>);
            })}
              </div>
            </div>

          {!isLoaded ? null : (<>
            <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{
                    backgroundImage: "radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color) 100%)",
                }}/>

            <div className="absolute inset-0 m-auto z-[3] pointer-events-none" style={{
                    WebkitMaskImage: "radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color) 90%)",
                    maskImage: "radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color) 90%)",
                    backdropFilter: "blur(3px)",
                }}/>
            <div className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none" style={{
                    background: "linear-gradient(to bottom, transparent, var(--overlay-blur-color, ".concat(overlayBlurColor, "))"),
                }}/>

            <div ref={viewerRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ padding: "var(--viewer-pad)" }}>
              <div ref={scrimRef} className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500" style={{
                    background: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(3px)",
                }}/>
              <div ref={frameRef} className="viewer-frame h-full aspect-square flex" style={{
                    borderRadius: "var(--enlarge-radius, ".concat(openedImageBorderRadius, ")"),
                }}/>
            </div>
          </>)}
      </main>)}
      </div>
    </>);
}
