// 전역 스코프에 함수 선언, DOMContentLoaded 감싸면 실행 x
function openPopup(imgSrc) {
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImg");
    popup.style.display = "block";
    popupImg.src = imgSrc;

    // 스크롤 비활성화
    document.body.style.overflow = "hidden";
}

function closePopup() {
    document.getElementById("imagePopup").style.display = "none";

    // 스크롤 활성화
    document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", function () {
    // ESC 키를 눌러 팝업을 닫을 수 있게 하기
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePopup();
        }
    });

    // 팝업 바깥 영역 클릭시 닫기
    document
        .getElementById("imagePopup")
        .addEventListener("click", function (event) {
            if (event.target === this) {
                closePopup();
            }
        });
});
