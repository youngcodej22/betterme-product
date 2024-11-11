function showPlanInfo(planId) {
    // // Get all info wraps
    // const allInfoWraps = document.querySelectorAll(".plan-detail-info-wrap");

    // // Hide all first
    // allInfoWraps.forEach((wrap) => {
    //     wrap.classList.remove("active");
    // });

    // // Show the selected one
    // const selectedInfo = document.getElementById(planId);
    // if (selectedInfo) {
    //     selectedInfo.classList.add("active");
    // }

    // Determine which container is visible
    const isMobile =
        window.getComputedStyle(
            document.querySelector(".plan-detail-container.pc")
        ).display === "none";
    const activeContainer = isMobile
        ? ".plan-detail-container.mobile"
        : ".plan-detail-container.pc";

    // Get all info wraps from the visible container
    const allInfoWraps = document.querySelectorAll(
        `${activeContainer} .plan-detail-info-wrap`
    );
    console.log("🚀 ~ showPlanInfo ~ allInfoWraps:", allInfoWraps);

    // Hide all first
    allInfoWraps.forEach((wrap) => {
        wrap.classList.remove("active");
    });

    // Show the selected one in the visible container
    const selectedInfo = document.querySelector(
        `${activeContainer} #${planId}`
    );
    if (selectedInfo) {
        selectedInfo.classList.add("active");
    }
}

// Add click event listeners
// document
//     .querySelector(".btn-online-counseling")
//     .addEventListener("click", function (e) {
//         e.preventDefault();
//         showPlanInfo("online-counseling-info");
//     });

// document.querySelector(".btn-standard").addEventListener("click", function (e) {
//     e.preventDefault();
//     showPlanInfo("standard-info");
// });

// document.querySelector(".btn-premium").addEventListener("click", function (e) {
//     e.preventDefault();
//     showPlanInfo("premium-info");
// });

// Show online counseling info by default
document.addEventListener("DOMContentLoaded", function () {
    showPlanInfo("online-counseling-info");

    // Add event listeners to all buttons (both mobile and PC)
    const buttons = {
        ".btn-online-counseling": "online-counseling-info",
        ".btn-standard": "standard-info",
        ".btn-premium": "premium-info",
    };

    for (let [btnClass, infoId] of Object.entries(buttons)) {
        document.querySelectorAll(btnClass).forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                showPlanInfo(infoId);
            });
        });
    }
});
