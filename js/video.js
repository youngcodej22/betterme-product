// const video = document.querySelector(".videoclips__img");

// video.addEventListener("loadedmetadata", () => {
//     video.currentTime = 2; // 4초로 시작점 설정
// });

// // 영상이 끝날 때 이벤트 설정
// video.addEventListener("timeupdate", () => {
//     if (video.currentTime >= video.duration) { // 영상 끝에 도달하면
//         video.currentTime = 2; // 다시 4초로 이동
//         video.play(); // 재생
//     }
// });

// const video = document.querySelector(".videoclips__img");

// const segments = [
//     { start: 7, end: 11 },
//     { start: 17, end: 23 },
//     { start: 28, end: 33 }
// ];
// let currentSegment = 0;

// video.addEventListener("loadedmetadata", () => {
//     video.currentTime = segments[currentSegment].start;
//     video.play();
// });

// video.addEventListener("timeupdate", () => {
//     if (video.currentTime >= segments[currentSegment].end) {
//         currentSegment = (currentSegment + 1) % segments.length;
//         video.currentTime = segments[currentSegment].start;
//         video.play();
//     }
// });

// const videos = document.querySelectorAll(".videoclips__img");

// const videoSegments = [
//     [
//         { start: 8, end: 24 },
//         // { start: 16, end: 20 }
//     ],
//     [
//         { start: 3, end: 17 },
//         // { start: 17, end: 23 },
//         // { start: 28, end: 33 }
//     ],
//     [
//         { start: 19, end: 33 },
//         // { start: 15, end: 18 }
//     ]
// ];

// videos.forEach((video, index) => {
//     let currentSegment = 0;
//     const segments = videoSegments[index];

//     video.addEventListener("loadedmetadata", () => {
//         video.currentTime = segments[currentSegment].start;
//         video.play();
//     });

//     video.addEventListener("timeupdate", () => {
//         if (video.currentTime >= segments[currentSegment].end) {
//             currentSegment = (currentSegment + 1) % segments.length;
//             video.currentTime = segments[currentSegment].start;
//             video.play();
//         }
//     });
// });

// ! 메인코드
// document.addEventListener("DOMContentLoaded", () => {
//     const videos = document.querySelectorAll(".videoclips__img");

//     const videoSegments = [
//         [
//             { start: 8, end: 24 },
//             // { start: 16, end: 20 }
//         ],
//         [
//             { start: 3, end: 17 },
//             // { start: 17, end: 23 },
//             // { start: 28, end: 33 }
//         ],
//         [
//             { start: 19, end: 33 },
//             // { start: 15, end: 18 }
//         ]
//     ];

//     videos.forEach((video, index) => {
//         let currentSegment = 0;
//         const segments = videoSegments[index];

//         const setSegmentAndPlay = () => {
//             const targetTime = segments[currentSegment].start;

//             const trySetCurrentTime = () => {
//                 if (video.readyState >= 2) { // readyState 2 이상이면 데이터가 로드됨
//                     video.currentTime = targetTime;
//                     video.play().catch(err => console.error("Playback error:", err));
//                 } else {
//                     // 데이터가 준비되지 않았으면 100ms 후 재시도
//                     setTimeout(trySetCurrentTime, 100);
//                 }
//             };

//             trySetCurrentTime();
//         };

//         video.addEventListener("loadedmetadata", () => {
//             setSegmentAndPlay();
//         });

//         video.addEventListener("timeupdate", () => {
//             if (video.currentTime >= segments[currentSegment].end) {
//                 currentSegment = (currentSegment + 1) % segments.length;
//                 setSegmentAndPlay();
//             }
//         });

//         video.addEventListener("error", (e) => {
//             console.error("Video error:", e);
//         });
//     });

    // ! 제공된 코드에서 특정 시간대로 영상을 재생하려고 하지만 브라우저 새로 고침 후에만 설정한 시간대로 재생되지 않는 문제는 브라우저의 미디어 로드 방식이나 DOM 로딩 타이밍과 관련 있을 수 있습니다. 
    // ! 문제 원인
    // ! loadedmetadata 이벤트와 currentTime의 초기화 문제
    // ! video.currentTime을 설정하기 전에 브라우저가 미디어 데이터를 로드하지 않았을 가능성이 있습니다. 특히 currentTime을 설정하기 전에 메타데이터가 완전히 로드되지 않으면 설정이 무시될 수 있습니다.
    // ! 브라우저의 비동기적 동작
    // ! 일부 브라우저에서는 currentTime을 설정한 후 바로 재생하지 못할 수 있습니다. 이는 미디어 버퍼링이 완료되지 않았기 때문입니다.
    // ! 네트워크 및 브라우저 캐싱 이슈
    // ! 브라우저가 새로 고침 후 캐시를 비우거나 특정 조건에서만 데이터를 새로 로드하면서 간헐적으로 동작이 달라질 수 있습니다.
    // videos.forEach((video, index) => {
    //     let currentSegment = 0;
    //     const segments = videoSegments[index];

    //     // video.addEventListener("canplay", () => {
    //     video.addEventListener("loadedmetadata", () => {
    //         video.currentTime = segments[currentSegment].start;
    //         video.play();
    //     });

    //     video.addEventListener("timeupdate", () => {
    //         if (video.currentTime >= segments[currentSegment].end) {
    //             currentSegment = (currentSegment + 1) % segments.length;
    //             video.currentTime = segments[currentSegment].start;
    //             video.play();
    //         }
    //     });
    // });
// });



