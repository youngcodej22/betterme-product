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

// ! youtube iframe modal
// document.addEventListener("DOMContentLoaded", function () {
//     // YouTube API 로드
//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName("script")[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     let currentPlayer = null;

//     // 모달 관련 요소들
//     const modal = document.querySelector(".videoModal");
//     const modalClose = document.querySelector(".videoModal__close");
//     const clips = document.querySelector(".videoModal__clips");
//     const videoClips = document.querySelectorAll(".videoModal__clip");

//     // 썸네일 클릭 이벤트 처리
//     document.querySelectorAll(".videoclips__thumbA").forEach((thumb, index) => {
//         thumb.addEventListener("click", function (e) {
//             e.preventDefault();

//             // 모달 표시
//             modal.style.display = "block";

//             // 클립 표시 애니메이션
//             setTimeout(() => {
//                 clips.classList.add("videoModal__clips--opened");
//             }, 100);

//             // 현재 비디오 표시
//             showVideo(index + 1);
//         });
//     });

//     // 모달 닫기
//     modalClose.addEventListener("click", closeModal);

//     // 배경 클릭으로 모달 닫기
//     modal.addEventListener("click", function (e) {
//         if (e.target === modal) {
//             closeModal();
//         }
//     });

//     // ESC 키로 모달 닫기
//     document.addEventListener("keydown", function (e) {
//         if (e.key === "Escape") {
//             closeModal();
//         }
//     });

//     function closeModal() {
//         // 애니메이션 제거
//         clips.classList.remove("videoModal__clips--opened");

//         // 현재 재생 중인 비디오 정지
//         if (currentPlayer) {
//             currentPlayer.stopVideo();
//         }

//         // 모든 클립 숨기기
//         videoClips.forEach((clip) => {
//             clip.classList.remove("videoModal__clip--show");
//         });

//         // 모달 숨기기
//         setTimeout(() => {
//             modal.style.display = "none";
//         }, 400); // SCSS의 transition 시간과 맞춤
//     }

//     function showVideo(index) {
//         // 이전 비디오 정지
//         if (currentPlayer) {
//             currentPlayer.stopVideo();
//         }

//         // 모든 클립 숨기기
//         videoClips.forEach((clip) => {
//             clip.classList.remove("videoModal__clip--show");
//         });

//         // 선택된 클립 표시
//         const targetClip = document.querySelector(
//             `#videoModal__clip--${index}`
//         );
//         const videoContainer = document.querySelector(
//             `#videoModal__video--${index}`
//         );
//         const videoId = videoContainer.dataset.videoId;

//         targetClip.classList.add("videoModal__clip--show");

//         // YouTube 플레이어 생성
//         currentPlayer = new YT.Player(`videoModal__video--${index}`, {
//             videoId: videoId,
//             width: "100%",
//             height: "100%",
//             playerVars: {
//                 autoplay: 1,
//                 playsinline: 1,
//                 rel: 0,
//                 modestbranding: 1,
//             },
//         });
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     // YouTube API 로드
//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName("script")[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     let players = {}; // 여러 플레이어를 저장할 객체

//     // 모달 관련 요소들
//     const modal = document.querySelector(".videoModal");
//     const modalClose = document.querySelector(".videoModal__close");
//     const clips = document.querySelector(".videoModal__clips");
//     const videoClips = document.querySelectorAll(".videoModal__clip");

//     // YouTube API 준비 완료 시 실행될 함수
//     window.onYouTubeIframeAPIReady = function () {
//         // 각 비디오 컨테이너에 대해 플레이어 초기화
//         document.querySelectorAll(".videoModal__video").forEach((container) => {
//             const videoId = container.dataset.videoId;
//             const playerId = container.id;

//             players[playerId] = new YT.Player(playerId, {
//                 videoId: videoId,
//                 width: "100%",
//                 height: "100%",
//                 playerVars: {
//                     autoplay: 0,
//                     playsinline: 1,
//                     rel: 0,
//                     modestbranding: 1,
//                 },
//             });
//         });
//     };

//     // 썸네일 클릭 이벤트 처리
//     document.querySelectorAll(".videoclips__thumbA").forEach((thumb, index) => {
//         thumb.addEventListener("click", function (e) {
//             e.preventDefault();

//             // 모달 표시
//             modal.classList.remove("mModal-close");
//             modal.classList.add("mModal-open");

//             // 클립 표시 애니메이션
//             setTimeout(() => {
//                 clips.classList.add("videoModal__clips--opened");
//             }, 100);

//             // 현재 비디오 표시
//             showVideo(index + 1);
//         });
//     });

//     // 모달 닫기
//     modalClose.addEventListener("click", closeModal);

//     // 배경 클릭으로 모달 닫기
//     modal.addEventListener("click", function (e) {
//         if (e.target.classList.contains("mModal-modal")) {
//             closeModal();
//         }
//     });

//     // ESC 키로 모달 닫기
//     document.addEventListener("keydown", function (e) {
//         if (e.key === "Escape") {
//             closeModal();
//         }
//     });

//     function closeModal() {
//         // 애니메이션 제거
//         clips.classList.remove("videoModal__clips--opened");

//         // 모든 플레이어 정지
//         Object.values(players).forEach((player) => {
//             if (player.stopVideo) {
//                 player.stopVideo();
//             }
//         });

//         // 모든 클립 숨기기
//         videoClips.forEach((clip) => {
//             clip.classList.remove("videoModal__clip--show");
//         });

//         // 모달 숨기기
//         modal.classList.remove("mModal-open");
//         modal.classList.add("mModal-close");
//     }

//     function showVideo(index) {
//         // 모든 플레이어 정지
//         Object.values(players).forEach((player) => {
//             if (player.stopVideo) {
//                 player.stopVideo();
//             }
//         });

//         // 모든 클립 숨기기
//         videoClips.forEach((clip) => {
//             clip.classList.remove("videoModal__clip--show");
//         });

//         // 선택된 클립 표시
//         const targetClip = document.querySelector(
//             `#videoModal__clip--${index}`
//         );
//         targetClip.classList.add("videoModal__clip--show");

//         // 해당 플레이어 재생
//         const playerId = `videoModal__video--${index}`;
//         if (players[playerId] && players[playerId].playVideo) {
//             setTimeout(() => {
//                 players[playerId].playVideo();
//             }, 500);
//         }
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    // YouTube API 로드
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let currentPlayer = null;

    // 모달 관련 요소들
    const modal = document.querySelector(".videoModal");
    const modalClose = document.querySelector(".videoModal__close");
    const clips = document.querySelector(".videoModal__clips");
    const videoClips = document.querySelectorAll(".videoModal__clip");

    // 썸네일 클릭 이벤트 처리
    document.querySelectorAll(".videoclips__thumbA").forEach((thumb, index) => {
        thumb.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation(); // 이벤트 전파 중지

            // 현재 스크롤 위치 저장
            const currentScroll = window.scrollY;

            // 모달 표시
            modal.style.display = "block";

            // 강제 리플로우 트리거
            modal.offsetHeight;
            modal.classList.add("fade-in");

            // 스크롤 위치 복원
            // window.scrollTo(0, currentScroll);
            document.body.style.top = `-${currentScroll}px`; // 현재 스크롤 위치 저장
            document.body.style.position = "fixed"; // 스크롤 방지
            document.body.style.width = "100%";

            // 클립 표시 애니메이션
            setTimeout(() => {
                clips.classList.add("videoModal__clips--opened");
            }, 100);

            // 현재 비디오 표시
            showVideo(index + 1);
        });
    });

    // 모달 닫기
    modalClose.addEventListener("click", closeModal);

    // 배경 클릭으로 모달 닫기
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    function closeModal() {
        // 페이드 아웃
        modal.classList.remove("fade-in");

        // 애니메이션 제거
        clips.classList.remove("videoModal__clips--opened");

        // 스크롤 위치 복원
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);

        // 현재 재생 중인 비디오 정지 및 제거
        if (currentPlayer) {
            currentPlayer.destroy(); // 플레이어 완전히 제거
            currentPlayer = null;
        }

        // 모든 클립 숨기기
        videoClips.forEach((clip) => {
            clip.classList.remove("videoModal__clip--show");
        });

        // 모달 숨기기
        setTimeout(() => {
            modal.style.display = "none";

            // 비디오 컨테이너 초기화
            document
                .querySelectorAll(".videoModal__video")
                .forEach((container) => {
                    if (!container.id.includes("temp")) {
                        const originalId = container.id;
                        // const videoId = container.dataset.videoId;
                        container.innerHTML = ""; // 내용 비우기
                        container.id = originalId; // ID 재설정
                    }
                });
        }, 300); // SCSS의 transition 시간과 맞춤
    }

    function showVideo(index) {
        // 이전 비디오 정지 및 제거
        if (currentPlayer) {
            currentPlayer.destroy();
            currentPlayer = null;
        }

        // 모든 클립 숨기기
        videoClips.forEach((clip) => {
            clip.classList.remove("videoModal__clip--show");
        });

        // 선택된 클립 표시
        const targetClip = document.querySelector(
            `#videoModal__clip--${index}`
        );
        const videoContainer = document.querySelector(
            `#videoModal__video--${index}`
        );
        const videoId = videoContainer.dataset.videoId;

        targetClip.classList.add("videoModal__clip--show");

        // YouTube 플레이어 생성
        currentPlayer = new YT.Player(`videoModal__video--${index}`, {
            videoId: videoId,
            width: "100%",
            height: "100%",
            playerVars: {
                autoplay: 1,
                playsinline: 1,
                rel: 0,
                modestbranding: 1,
            },
        });
    }
});