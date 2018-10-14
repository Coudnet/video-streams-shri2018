/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/base.scss */ \"./src/scss/base.scss\");\n/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_base_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/*! exports provided: videoList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"videoList\", function() { return videoList; });\nconst videoList = [\r\n    {\r\n        src: 'http://192.168.0.101:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8',\r\n        source: null,\r\n        id: 'v1',\r\n        brightness: 0,\r\n        contrast: 0,\r\n    },\r\n    {\r\n        src: 'http://192.168.0.101:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8',\r\n        source: null,\r\n        id: 'v2',\r\n        brightness: 0,\r\n        contrast: 0,\r\n    },\r\n    {\r\n        src: 'http://192.168.0.101:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8',\r\n        source: null,\r\n        id: 'v3',\r\n        brightness: 0,\r\n        contrast: 0,\r\n    },\r\n    {\r\n        src: 'http://192.168.0.101:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8',\r\n        source: null,\r\n        id: 'v4',\r\n        brightness: 0,\r\n        contrast: 0,\r\n    }\r\n];\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/data.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/js/data.js\");\n\r\n\r\n\r\nlet container = null;\r\nlet canvas = null;\r\nlet volumeBarCanvasContext = null;\r\nlet videoTimerId = null;\r\nlet audioTimerId = null;\r\nlet currentVideo = null;\r\nlet context = new (window.AudioContext || window.webkitAudioContext)();\r\nlet analyser = context.createAnalyser();\r\n\r\nconst backcanvas = document.createElement('canvas');\r\nconst bc = backcanvas.getContext('2d');\r\n\r\nanalyser.connect(context.destination);\r\n\r\n_data_js__WEBPACK_IMPORTED_MODULE_0__[\"videoList\"].forEach((videoItem) => {\r\n    initVideo(videoItem)\r\n});\r\n\r\nfunction initVideo(videoItem) {\r\n    const video = document.getElementById(videoItem.id);\r\n    const url = videoItem.src;\r\n\r\n    const container = video.parentNode;\r\n    const brightnessInput = container.querySelector('.brightness-filter input');\r\n    const contrastInput = container.querySelector('.contrast-filter input');\r\n    const closeBtn = container.querySelector('.close-btn button');\r\n\r\n    if (Hls.isSupported()) {\r\n        let hls = new Hls();\r\n        hls.loadSource(url);\r\n        hls.attachMedia(video);\r\n        hls.on(Hls.Events.MANIFEST_PARSED, function () {\r\n            video.play();\r\n        });\r\n\r\n    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {\r\n        video.src = url;\r\n        video.addEventListener('loadedmetadata', function () {\r\n            video.play();\r\n        });\r\n    }\r\n    video.muted = true;\r\n    brightnessInput.addEventListener('change', brightnessValueChangeHandler);\r\n    contrastInput.addEventListener('change', contrastValueChangeHandler);\r\n    video.addEventListener('click', videoClickHandler);\r\n    closeBtn.addEventListener('click', buttonClickHandler);\r\n}\r\n\r\nfunction videoClickHandler(event) {\r\n    currentVideo = _data_js__WEBPACK_IMPORTED_MODULE_0__[\"videoList\"].find(x => x.id === event.target.id);\r\n    const video = document.getElementById(currentVideo.id);\r\n    container = event.target.parentNode;\r\n    container.classList.add('z-index-1');\r\n    container.classList.add('video-open');\r\n    if(!currentVideo.source) currentVideo.source = context.createMediaElementSource(video);\r\n    container.querySelector('.brightness-filter input').value = currentVideo.brightness;\r\n    container.querySelector('.contrast-filter input').value = currentVideo.contrast;\r\n    video.muted = false;\r\n\r\n    initCanvas();\r\n}\r\n\r\nfunction buttonClickHandler() {\r\n    container.classList.add('z-index-1');\r\n    container.classList.add('video-open');\r\n    container.classList.remove('video-open');\r\n\r\n    disableCanvas();\r\n\r\n    setTimeout(() => {\r\n        container.classList.remove('z-index-1');\r\n    }, 200);\r\n}\r\n\r\nfunction initCanvas() {\r\n    const video = container.querySelector('video');\r\n    canvas = document.createElement('canvas');\r\n    let ctx = canvas.getContext('2d');\r\n\r\n    const cw = video.clientWidth;\r\n    const ch = video.clientHeight;\r\n\r\n    canvas.width = cw;\r\n    canvas.height = ch;\r\n    canvas.classList.add('video-canvas');\r\n    backcanvas.width = cw;\r\n    backcanvas.height = ch;\r\n\r\n    container.appendChild(canvas);\r\n\r\n    draw(video, ctx, cw, ch);\r\n    volumeAnylyzerStart();\r\n\r\n}\r\n\r\nfunction draw(v, c, w, h) {\r\n    let img;\r\n    if(v.paused || v.ended) return false;\r\n    videoTimerId = setTimeout(function draw2(){\r\n        bc.drawImage(v, 0, 0, w, h);\r\n        img = bc.getImageData(0, 0, w, h);\r\n        brightness(img.data);\r\n        contrast(img.data);\r\n        c.putImageData(img, 0, 0);\r\n        videoTimerId = setTimeout(draw2, 16)\r\n    }, 16);\r\n}\r\n\r\nfunction volumeAnylyzerStart() {\r\n    currentVideo.source.connect(analyser);\r\n    volumeBarCanvasContext = container.querySelector('.volume-bar canvas').getContext('2d');\r\n    volumeBarCanvasContext.fillStyle = \"#D55240\";\r\n\r\n    audioTimerId = setTimeout(function measureVol() {\r\n        let array = new Uint8Array(analyser.fftSize);\r\n        analyser.getByteTimeDomainData(array);\r\n        let average = 0;\r\n        for (let a of array) {\r\n            a = Math.abs(a - 128);\r\n            average += a;\r\n        }\r\n        average /= array.length;\r\n        drawVolumeBar(average);\r\n        audioTimerId = setTimeout(measureVol, 50);\r\n    }, 50);\r\n}\r\n\r\nfunction drawVolumeBar(average) {\r\n    volumeBarCanvasContext.clearRect(0, 0, 25, 100);\r\n    volumeBarCanvasContext.fillRect(0, 100, 25, -10 * average);\r\n    volumeBarCanvasContext.stroke();\r\n}\r\n\r\nfunction disableCanvas() {\r\n    clearTimeout(videoTimerId);\r\n    clearTimeout(audioTimerId);\r\n    container.removeChild(canvas);\r\n    document.getElementById(currentVideo.id).muted = true;\r\n\r\n    canvas = null;\r\n    videoTimerId = null;\r\n    audioTimerId = null;\r\n    currentVideo = null;\r\n}\r\n\r\n/**\r\n * Функция для изменения яркости пикселей изображения\r\n * @param data\r\n */\r\nfunction brightness(data) {\r\n    for(let i = 0; i < data.length; i+=4) {\r\n        data[i] = truncate(data[i] + currentVideo.brightness);\r\n        data[i+1] = truncate(data[i + 1] + currentVideo.brightness);\r\n        data[i+2] = truncate(data[i + 2] + currentVideo.brightness);\r\n    }\r\n}\r\n\r\n/**\r\n * Функция для изменения контраста изображения\r\n * Формулы взяты из статьи http://thecryptmag.com/Online/56/imgproc_5.html\r\n * @param data\r\n */\r\nfunction contrast(data) {\r\n    const factor = (259 * (currentVideo.contrast + 255)) / (255 * (259 - currentVideo.contrast));\r\n\r\n    for(let i = 0; i < data.length; i+=4) {\r\n        data[i] = truncate((factor * (data[i] - 128) + 128));\r\n        data[i+1] = truncate((factor * (data[i+1] - 128) + 128));\r\n        data[i+2] = truncate((factor * (data[i+2] - 128) + 128));\r\n    }\r\n\r\n}\r\n\r\n/**\r\n * Вспомогательная функция для проверки выхода за границы значений пикселя\r\n * @param val\r\n * @returns {*}\r\n */\r\nfunction truncate(val) {\r\n    if(val < 0) return 0;\r\n    if(val > 255) return 255;\r\n    return val;\r\n}\r\n\r\nfunction brightnessValueChangeHandler(event) {\r\n    currentVideo.brightness = +event.target.value;\r\n}\r\n\r\nfunction contrastValueChangeHandler(event) {\r\n    currentVideo.contrast = +event.target.value;\r\n}\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/scss/base.scss":
/*!****************************!*\
  !*** ./src/scss/base.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/base.scss?");

/***/ })

/******/ });