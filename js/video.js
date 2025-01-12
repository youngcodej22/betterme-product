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