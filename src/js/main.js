'use strict';
import {videoList} from './data.js'

let container = null;
let canvas = null;
let volumeBarCanvasContext = null;
let videoTimerId = null;
let audioTimerId = null;
let currentVideo = null;
let context = new (window.AudioContext || window.webkitAudioContext)();
let analyser = context.createAnalyser();

const backcanvas = document.createElement('canvas');
const bc = backcanvas.getContext('2d');

analyser.connect(context.destination);

videoList.forEach((videoItem) => {
    initVideo(videoItem)
});

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

function buttonClickHandler() {
    container.classList.add('z-index-1');
    container.classList.add('video-open');
    container.classList.remove('video-open');

    disableCanvas();

    setTimeout(() => {
        container.classList.remove('z-index-1');
    }, 200);
}

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

function drawVolumeBar(average) {
    volumeBarCanvasContext.clearRect(0, 0, 25, 100);
    volumeBarCanvasContext.fillRect(0, 100, 25, -10 * average);
    volumeBarCanvasContext.stroke();
}

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