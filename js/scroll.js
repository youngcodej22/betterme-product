document.addEventListener("DOMContentLoaded", () => {
    const bg = document.querySelector(".bg");
    const textPath = document.getElementById("section21Wave-textpath");
    const videoItems = document.querySelectorAll(".videoclips__item");

    let currentOffset = 0; // 현재 offset 값을 저장
    let targetOffset = 0; // 목표 offset 값을 저장
    function animate() {
        // 현재 값을 목표 값으로 부드럽게 보간
        currentOffset += (targetOffset - currentOffset) * 0.1; // 0.1은 움직임의 부드러움을 조절

        // textPath의 startOffset 업데이트
        textPath.setAttribute("startOffset", `${currentOffset}%`);

        // 다음 프레임 요청
        requestAnimationFrame(animate);
    }
    // 애니메이션 시작
    animate();

    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollPosition / maxScroll) * 100;

        // 목표 offset 값 업데이트
        targetOffset = easeInOutQuad(scrollPercent / 100) * 550;

        // Apply easing function for smoother transition
        // const easedScrollPercent = easeInOutQuad(scrollPercent / 100) * 550;

        // Set the startOffset based on the eased scroll percentage
        // textPath.setAttribute("startOffset", easedScrollPercent + "%");

        // Check if any video item is in view and adjust the background position
        videoItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Adjust textPath startOffset based on the scroll position
                // textPath.setAttribute("startOffset", easedScrollPercent + "%");
                
                // 여기서는 targetOffset만 업데이트하고 실제 애니메이션은 RAF에서 처리
                targetOffset = easeInOutQuad(scrollPercent / 100) * 550;
            }
        });
    });

    // Easing function for smooth transition
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
});