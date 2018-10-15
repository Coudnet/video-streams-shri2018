'use strict';
import {videoList} from './data.js'  // Данные о видео

let container = null; // .video-container для открытого видео
let canvas = null; // canvas для открытого видео
let volumeBarCanvasContext = null; // canvas context для открытого видео, на которм отображается бар для громкости
let videoTimerId = null; // Таймер для отрисовки видео в canvas
let audioTimerId = null; // Таймер для анализа громкости
let currentVideo = null; // Объект открытого видео
let context = new (window.AudioContext || window.webkitAudioContext)();
let analyser = context.createAnalyser();

// Промежуточный canvas для обработки
const backcanvas = document.createElement('canvas');
const bc = backcanvas.getContext('2d');

analyser.connect(context.destination); // Подключение анализатора к аудиовыходу пользователя

videoList.forEach((videoItem) => {
    initVideo(videoItem)
});

/**
 * Инициализация каждого видео блока
 * Навешивание обработчиков и запись начальных значений для input
 * @param videoItem
 */
function initVideo(videoItem) {
    const video = document.getElementById(videoItem.id);
    const url = videoItem.src;

    const container = video.parentNode;
    const brightnessInput = container.querySelector('.brightness-filter input');
    const contrastInput = container.querySelector('.contrast-filter input');
    const closeBtn = container.querySelector('.close-btn button');

    if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
    video.muted = true;
    brightnessInput.addEventListener('change', brightnessValueChangeHandler);
    contrastInput.addEventListener('change', contrastValueChangeHandler);
    video.addEventListener('click', videoClickHandler);
    closeBtn.addEventListener('click', buttonClickHandler);
}

/**
 * Обработчик открытия видео
 * Инициализация глобальных переменных, которые хранят родителя тега video
 * Запускается анимация(css3) добавлением класса
 * Инициализация стартовых значений яркости, контраста( сохраненных в объекте)
 * При повторном открытии видео, настройки сохраняются
 */
function videoClickHandler(event) {
    currentVideo = videoList.find(x => x.id === event.target.id);
    const video = document.getElementById(currentVideo.id);
    container = event.target.parentNode;
    container.classList.add('z-index-1');
    container.classList.add('video-open');

    if(!currentVideo.source) currentVideo.source = context.createMediaElementSource(video);

    container.querySelector('.brightness-filter input').value = currentVideo.brightness;
    container.querySelector('.contrast-filter input').value = currentVideo.contrast;
    video.muted = false;

    initCanvas();
}

/**
 * Обработчик закрытия(сворачивания) видео
 */
function buttonClickHandler() {
    container.classList.add('z-index-1');
    container.classList.add('video-open');
    container.classList.remove('video-open');

    disableCanvas();

    setTimeout(() => {
        container.classList.remove('z-index-1');
    }, 200);
}

/**
 * Инициализация canvas для отрисловки видео при открытии
 * Добавление canvas в контейнер с видео, старт отрисовки и анаиза громкости
 */
function initCanvas() {
    const video = container.querySelector('video');
    canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    const cw = video.clientWidth;
    const ch = video.clientHeight;

    canvas.width = cw;
    canvas.height = ch;
    canvas.classList.add('video-canvas');
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
function draw(v, c, w, h) {
    let img;
    if(v.paused || v.ended) return false;
    videoTimerId = setTimeout(function draw2(){
        bc.drawImage(v, 0, 0, w, h);
        img = bc.getImageData(0, 0, w, h);
        brightness(img.data);
        contrast(img.data);
        c.putImageData(img, 0, 0);
        videoTimerId = setTimeout(draw2, 16)
    }, 16);
}

/**
 * Старт анализатора громкости.
 * Текущая Video Node подсоединяется к анализатору
 * и запускается рекрсивный таймер для анализа громкости
 */
function volumeAnylyzerStart() {
    currentVideo.source.connect(analyser);
    volumeBarCanvasContext = container.querySelector('.volume-bar canvas').getContext('2d');
    volumeBarCanvasContext.fillStyle = "#D55240";

    audioTimerId = setTimeout(function measureVol() {
        let array = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(array);
        let average = 0;
        for (let a of array) {
            a = Math.abs(a - 128);
            average += a;
        }
        average /= array.length;
        drawVolumeBar(average);
        audioTimerId = setTimeout(measureVol, 50);
    }, 50);
}

/**
 * Отрисовка уровня громкости в canvas
 */
function drawVolumeBar(average) {
    volumeBarCanvasContext.clearRect(0, 0, 25, 100);
    volumeBarCanvasContext.fillRect(0, 100, 25, -10 * average);
    volumeBarCanvasContext.stroke();
}

/**
 * Очистка таймеров, которые использовались для отрисчовки canvas с видео и уровня громкости
 * Удаление canvas с видео
 */
function disableCanvas() {
    clearTimeout(videoTimerId);
    clearTimeout(audioTimerId);
    container.removeChild(canvas);
    document.getElementById(currentVideo.id).muted = true;

    canvas = null;
    videoTimerId = null;
    audioTimerId = null;
    currentVideo = null;
}

/**
 * Функция для изменения яркости пикселей изображения
 * @param data
 */
function brightness(data) {
    for(let i = 0; i < data.length; i+=4) {
        data[i] = truncate(data[i] + currentVideo.brightness);
        data[i+1] = truncate(data[i + 1] + currentVideo.brightness);
        data[i+2] = truncate(data[i + 2] + currentVideo.brightness);
    }
}

/**
 * Функция для изменения контраста изображения
 * Формулы взяты из статьи http://thecryptmag.com/Online/56/imgproc_5.html
 * @param data
 */
function contrast(data) {
    const factor = (259 * (currentVideo.contrast + 255)) / (255 * (259 - currentVideo.contrast));

    for(let i = 0; i < data.length; i+=4) {
        data[i] = truncate((factor * (data[i] - 128) + 128));
        data[i+1] = truncate((factor * (data[i+1] - 128) + 128));
        data[i+2] = truncate((factor * (data[i+2] - 128) + 128));
    }

}

/**
 * Вспомогательная функция для проверки выхода за границы значений пикселя
 * @param val
 * @returns {*}
 */
function truncate(val) {
    if(val < 0) return 0;
    if(val > 255) return 255;
    return val;
}

function brightnessValueChangeHandler(event) {
    currentVideo.brightness = +event.target.value;
}

function contrastValueChangeHandler(event) {
    currentVideo.contrast = +event.target.value;
}