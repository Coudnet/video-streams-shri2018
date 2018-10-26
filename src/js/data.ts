interface IVideo {
    brightness: number;
    contrast: number;
    id: string;
    source: MediaElementAudioSourceNode | null;
    src: string;
}

const videoList: IVideo[] = [
    {
        brightness: 0,
        contrast: 0,
        id: "v1",
        source: null,
        src: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8",
    },
    {
        brightness: 0,
        contrast: 0,
        id: "v2",
        source: null,
        src: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
    },
    {
        brightness: 0,
        contrast: 0,
        id: "v3",
        source: null,
        src: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
    },
    {
        brightness: 0,
        contrast: 0,
        id: "v4",
        source: null,
        src: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8",
    },
];

export {videoList, IVideo}
