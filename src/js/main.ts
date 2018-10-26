import {IVideo, videoList} from "./data";
import Hls = require("hls.js");


let container: HTMLDivElement | null = null; // .video-container для открытого видео
let canvas: HTMLCanvasElement | null = null; // canvas для открытого видео
let volumeBarCanvasContext: CanvasRenderingContext2D | null = null; // canvas context для открытого видео, на котором
// отображается бар для громкости
let videoRequestAnimationId: number | null = null; // Таймер для отрисовки видео в canvas
let audioRequestAnimationId: number | null = null; // Таймер для анализа громкости
let currentVideo: IVideo | null = null; // Объект открытого видео
let context: AudioContext = new AudioContext();
let analyser: AnalyserNode = context.createAnalyser();

// Промежуточный canvas для обработки
const backcanvas: HTMLCanvasElement = document.createElement("canvas");
const bc: CanvasRenderingContext2D | null = backcanvas.getContext("2d");

let brightnessInput: HTMLInputElement | null = null;
let contrastInput: HTMLInputElement | null = null;

analyser.connect(context.destination); // Подключение анализатора к аудиовыходу пользователя

videoList.forEach((videoItem: IVideo): void => {
    initVideo(videoItem);
});

/**
 * Инициализация каждого видео блока
 * Навешивание обработчиков и запись начальных значений для input
 * @param videoItem
 */
function initVideo(videoItem: IVideo): void {
    const video: HTMLVideoElement | null = document.querySelector(`#${videoItem.id}`);
    if (!video) {
        return;
    }
    const url: string = videoItem.src;
    container = video.parentNode as HTMLDivElement;
    brightnessInput = container.querySelector(".brightness-filter input");
    contrastInput = container.querySelector(".contrast-filter input");
    const closeBtn: HTMLButtonElement | null = container.querySelector(".close-btn button");

    if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, (): void => {
            video.play();
        });

    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", (): void => {
            video.play();
        });
    }

    video.muted = true;
    if (brightnessInput) {
        brightnessInput.addEventListener("change", brightnessValueChangeHandler);
    }
    if (contrastInput) {
        contrastInput.addEventListener("change", contrastValueChangeHandler);
    }
    video.addEventListener("click", videoClickHandler);
    if (closeBtn) {
        closeBtn.addEventListener("click", buttonClickHandler);
    }
}

/**
 * Обработчик открытия видео
 * Инициализация глобальных переменных, которые хранят родителя тега video
 * Запускается анимация(css3) добавлением класса
 * Инициализация стартовых значений яркости, контраста( сохраненных в объекте)
 * При повторном открытии видео, настройки сохраняются
 */
function videoClickHandler(event: MouseEvent): void {
    const target: HTMLVideoElement | null = event.target as HTMLVideoElement;

    for (let i: number = 0; i < videoList.length; i++) {
        if (videoList[i].id === target.id) {
            currentVideo = videoList[i];
            break;
        }
    }
    if (!currentVideo) { return; }
    const video: HTMLVideoElement | null = document.querySelector(`#${currentVideo.id}`);
    if (!video) { return; }

    container = target.parentNode as HTMLDivElement;
    container.classList.add("z-index-1");
    container.classList.add("video-open");

    if (!currentVideo.source) {
        currentVideo.source = context.createMediaElementSource(video);
    }

    brightnessInput = container.querySelector(".brightness-filter input");
    if (brightnessInput) {
        brightnessInput.value = currentVideo.brightness + "";
    }
    contrastInput = container.querySelector(".contrast-filter input");
    if (contrastInput) {
        contrastInput.value = currentVideo.contrast + "";
    }
    video.muted = false;

    initCanvas();
}

/**
 * Обработчик закрытия(сворачивания) видео
 */
function buttonClickHandler(): void {
    if (!container) { return; }
    container.classList.add("z-index-1");
    container.classList.add("video-open");
    container.classList.remove("video-open");

    disableCanvas();

    setTimeout(() => {
        if (container) {
            container.classList.remove("z-index-1");
        }
    }, 200);
}

/**
 * Инициализация canvas для отрисловки видео при открытии
 * Добавление canvas в контейнер с видео, старт отрисовки и анаиза громкости
 */
function initCanvas(): void {
    if (!container) { return; }
    const video: HTMLVideoElement | null = container.querySelector("video");
    canvas = document.createElement("canvas");
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!video || !ctx) { return; }
    const cw = video.clientWidth;
    const ch = video.clientHeight;

    canvas.width = cw;
    canvas.height = ch;
    canvas.classList.add("video-canvas");
    backcanvas.width = cw;
    backcanvas.height = ch;

    container.appendChild(canvas);

    draw(video, ctx, cw, ch);
    volumeAnylyzerStart();
}

/**
 * Отрисовка текущего видео потока в canvas при размернутом видео
 * Вызываются функции для обработки изображения - яркость и контраст
 */
function draw(v: HTMLVideoElement, c: CanvasRenderingContext2D, w: number, h: number): void {
    let img: ImageData;
    if (v.paused || v.ended || !bc) { return; }
    videoRequestAnimationId = requestAnimationFrame(function callback(): void {
        bc.drawImage(v, 0, 0, w, h);
        img = bc.getImageData(0, 0, w, h);
        brightness(img.data);
        contrast(img.data);
        c.putImageData(img, 0, 0);
        videoRequestAnimationId = requestAnimationFrame(callback);
    });
}

/**
 * Старт анализатора громкости.
 * Текущая Video Node подсоединяется к анализатору
 * и запускается рекрсивный таймер для анализа громкости
 */
function volumeAnylyzerStart(): void {
    if (!currentVideo || !currentVideo.source || !container) { return; }
    currentVideo.source.connect(analyser);
    const audiocanvas: HTMLCanvasElement | null = container.querySelector(".volume-bar canvas");
    if (!audiocanvas) { return; }

    volumeBarCanvasContext = audiocanvas.getContext("2d");
    if (volumeBarCanvasContext) {
        volumeBarCanvasContext.fillStyle = "#D55240";
    }

    audioRequestAnimationId = requestAnimationFrame(function measureVol() {
        let array: Uint8Array = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(array);
        let average = 0;
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.abs(array[i] - 128);
            average += array[i];
        }
        average /= array.length;
        drawVolumeBar(average);
        audioRequestAnimationId = requestAnimationFrame(measureVol);
    });
}

/**
 * Отрисовка уровня громкости в canvas
 */
function drawVolumeBar(average: number): void {
    if (!volumeBarCanvasContext) { return; }
    volumeBarCanvasContext.clearRect(0, 0, 25, 100);
    volumeBarCanvasContext.fillRect(0, 100, 25, -10 * average);
    volumeBarCanvasContext.stroke();
}

/**
 * Очистка таймеров, которые использовались для отрисчовки canvas с видео и уровня громкости
 * Удаление canvas с видео
 */
function disableCanvas() {
    if (!videoRequestAnimationId || !audioRequestAnimationId || !container || !currentVideo || !canvas ) { return; }
    cancelAnimationFrame(videoRequestAnimationId);
    cancelAnimationFrame(audioRequestAnimationId);
    container.removeChild(canvas);
    const curVideo: HTMLVideoElement | null = document.querySelector(`#${currentVideo.id}`);
    if (curVideo) {
        curVideo.muted = true;
    }

    canvas = null;
    videoRequestAnimationId = null;
    audioRequestAnimationId = null;
    currentVideo = null;
}

/**
 * Функция для изменения яркости пикселей изображения
 * @param data
 */
function brightness(data: Uint8ClampedArray): void {
    if (!currentVideo) { return; }
    for (let i = 0; i < data.length; i += 4) {
        data[i] = truncate(data[i] + currentVideo.brightness);
        data[i + 1] = truncate(data[i + 1] + currentVideo.brightness);
        data[i + 2] = truncate(data[i + 2] + currentVideo.brightness);
    }
}

/**
 * Функция для изменения контраста изображения
 * Формулы взяты из статьи http://thecryptmag.com/Online/56/imgproc_5.html
 * @param data
 */
function contrast(data: Uint8ClampedArray): void {
    if (!currentVideo) { return; }
    const factor = (259 * (currentVideo.contrast + 255)) / (255 * (259 - currentVideo.contrast));

    for (let i = 0; i < data.length; i += 4) {
        data[i] = truncate((factor * (data[i] - 128) + 128));
        data[i + 1] = truncate((factor * (data[i + 1] - 128) + 128));
        data[i + 2] = truncate((factor * (data[i + 2] - 128) + 128));
    }

}

/**
 * Вспомогательная функция для проверки выхода за границы значений пикселя
 * @param val
 * @returns {*}
 */
function truncate(val: number): number {
    if (val < 0) {
        return 0;
    }
    if (val > 255) {
        return 255;
    }
    return val;
}

function brightnessValueChangeHandler(event: Event): void {
    if (!currentVideo) { return; }
    const target: HTMLInputElement | null = event.target as HTMLInputElement;
    currentVideo.brightness = +target.value;
}

function contrastValueChangeHandler(event: Event): void {
    if (!currentVideo) { return; }
    const target: HTMLInputElement | null = event.target as HTMLInputElement;
    currentVideo.contrast = +target.value;
}
