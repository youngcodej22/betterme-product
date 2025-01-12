function showPlanInfo(planId) {
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

    // Update button states
    updateButtonStates(planId, activeContainer);
}

function updateButtonStates(planId, activeContainer) {
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll(
        `${activeContainer} button[class^="btn-"]`
    );
    allButtons.forEach((btn) => {
        btn.classList.remove("active");
    });

    // Add active class to the corresponding button
    let buttonClass;
    switch (planId) {
        case "online-counseling-info":
            buttonClass = "btn-online-counseling";
            break;
        case "standard-info":
            buttonClass = "btn-standard";
            break;
        case "premium-info":
            buttonClass = "btn-premium";
            break;
    }

    if (buttonClass) {
        const activeButton = document.querySelector(
            `${activeContainer} .${buttonClass}`
        );
        if (activeButton) {
            activeButton.classList.add("active");
        }
    }
}

// Show online counseling info by default
document.addEventListener("DOMContentLoaded", function () {
    // showPlanInfo("online-counseling-info");

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
