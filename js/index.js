$(() => {
    let ch = setInterval(() => {
        let iframe = $("iframe").contents();
        let b = iframe.find('[data-ch-testid="new-chat-button"]');
        let c = iframe.find('[data-testid="bezier-react-icon"]');
        if (b.length == 1) {
            b.click(function () {
                // Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
                mixpanel.track("click_inquiryBtn_main", {
                    "click_inquiryBtn_main Type": "Referral",
                });
            });

            clearInterval(ch);
        }

        if (c.length == 1) {
            c.click(function () {
                // Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
                mixpanel.track("click_channeltalkBtn_main", {
                    "click_channeltalkBtn_main Type": "Referral",
                });
            });
            clearInterval(ch);
        }
        // if( )
    }, 1000);

    // [디스플레이] 구글 플레이 버튼 클릭 시
    // $(".btn-app-link").on("click", function () {
    //     mixpanel.track("click_googlePlayBtn_main", {
    //         "click_googlePlayBtn_main Type": "Referral",
    //     });
    // });

    // //플랜 문의하기 버튼 클릭 시
    // $(".btn-inquiry").on("click", function () {
    //     mixpanel.track("click_planInquiryBtn_main", {
    //         "click_planInquiryBtn_main Type": "Referral",
    //     });
    // });
    // //첫번째 질문 선택 시
    // $("#question1").on("click", function () {
    //     mixpanel.track("click_firstFaq_main", {
    //         "click_firstFaq_main Type": "Referral",
    //     });
    // });
    // //두번째 질문 선택 시
    // $("#question2").on("click", function () {
    //     mixpanel.track("click_secondFaq_main", {
    //         "click_secondFaq_main Type": "Referral",
    //     });
    // });

    // //세번째 질문 선택 시
    // $("#question3").on("click", function () {
    //     mixpanel.track("click_thirdFaq_main", {
    //         "click_thirdFaq_main Type": "Referral",
    //     });
    // });

    // //네번째 질문 선택 시
    // $("#question4").on("click", function () {
    //     mixpanel.track("click_fourthFaq_main", {
    //         "click_fourthFaq_main Type": "Referral",
    //     });
    // });

    // //다섯번째 질문 선택 시
    // $("#question5").on("click", function () {
    //     mixpanel.track("click_fifthFaq_main", {
    //         "click_fifthFaq_main Type": "Referral",
    //     });
    // });

    // //여섯번째 질문 선택 시
    // $("#question6").on("click", function () {
    //     mixpanel.track("click_sixthFaq_main", {
    //         "click_sixthFaq_main Type": "Referral",
    //     });
    // });

    // //일곱번째 질문 선택 시
    // $("#question7").on("click", function () {
    //     mixpanel.track("click_seventhFaq_main", {
    //         "click_seventhFaq_main Type": "Referral",
    //     });
    // });

    // //여덟번째 질문 선택 시
    // $("#question8").on("click", function () {
    //     mixpanel.track("click_eightFaq_main", {
    //         "click_eightFaq_main Type": "Referral",
    //     });
    // });

    // // 사용해보기 버튼 클릭 시
    // $(".btn-start").on("click", function () {
    //     mixpanel.track("click_tryBtn_main", {
    //         "click_tryBtn_main Type": "Referral",
    //     });
    // });
    // // 바로시작하기 버튼 클릭 시
    // $(".btn-start-now").on("click", function () {
    //     mixpanel.track("click_startBtn_main", {
    //         "click_startBtn_main Type": "Referral",
    //     });
    // });

    const hash = window.location.hash;
    if (hash) {
        const scrollTop = $(window).scrollTop();
        $("html, body").scrollTop(scrollTop - ($(".gnb").height() + 30));
    }
    let lastScrollY = 0;
    $(window).on("scroll", (e) => {
        const scrollY = window.scrollY;
        const scrollDown = scrollY > lastScrollY;
        if (scrollDown) {
            $(".gnb").removeClass("show").addClass("hide");
        } else {
            $(".gnb").removeClass("hide").addClass("show");
        }
        lastScrollY = scrollY;
    });
    $(".gnb nav a").click((e) => {
        const href = $(e.currentTarget).attr("href");

        if (href.indexOf("#") != 0) {
            return;
        }

        e.preventDefault();

        history.pushState(null, null, href);
        $("html,body").animate({
            scrollTop: $(href).offset().top - ($(".gnb").height() + 20),
        });
    });
    $(".hover-card").each((idx, el) => {
        const matrix = $(el)
            .css("transform")
            .replace(/[^0-9\-.,]/g, "")
            .split(",");
        const translateYDefault = matrix[13] || matrix[5];
        if (translateYDefault) {
            $(el).attr("data-default", translateYDefault);
        }
    });

    $(".faq-list li").on("click", (e) => {
        if (!$(e.target)[0].contains($(e.currentTarget).find(".answer")[0])) {
            $(e.currentTarget)
                .toggleClass("show")
                .children(".answer")
                .slideToggle(100);
        }
    });

    const introCardInteraction = _.throttle(() => {
        const scrollTop = $("html").scrollTop();

        let cardOffset = $(".card.intro").offset().top;
        // card
        // const clipPathXDefault = 3.333;
        const clipPathXDefault = 6.333;
        const clipPathRadiusDefault = 45;
        let clipPathX =
            clipPathXDefault * ((cardOffset - scrollTop) / cardOffset);
        let clipPathRadius =
            clipPathRadiusDefault * ((cardOffset - scrollTop) / cardOffset);
        if (scrollTop >= 2179) {
            clipPathX =
                clipPathXDefault *
                ((scrollTop - 2179) /
                    (cardOffset +
                        ($(".card.intro").height() -
                            $(window).height() -
                            2179)));
            clipPathRadius =
                clipPathRadiusDefault *
                (scrollTop /
                    (cardOffset +
                        ($(".card.intro").height() - $(window).height())));
        } else {
            clipPathX =
                clipPathXDefault * ((cardOffset - scrollTop) / cardOffset);
            clipPathRadius =
                clipPathRadiusDefault *
                ((cardOffset - scrollTop) / cardOffset);
        }

        if (clipPathRadius > clipPathRadiusDefault) {
            clipPathRadius = clipPathRadiusDefault;
        }
        if (clipPathX > clipPathXDefault) {
            clipPathX = clipPathXDefault;
        }
        if (clipPathX < 0) {
            clipPathX = 0;
        }
        if (clipPathRadius < 0) {
            clipPathRadius = 0;
        }

        $(".card.intro .card-contents").css({
            "clip-path":
                "inset(0px " +
                clipPathX +
                "% round " +
                clipPathRadius +
                "px)",
        });

        // gradient bg
        const sentinelHeight =
            $(".sentinel").offset().top + $(".sentinel").height();
        const scrollHeight = 411;
        const gradientScrollTop = scrollTop - sentinelHeight;
        let opacityValue = scrollHeight / (gradientScrollTop + scrollHeight);
        if (
            opacityValue >= 0 &&
            opacityValue <= 1 &&
            gradientScrollTop > 0
        ) {
            $(".card.intro .bg-gradient").css("opacity", opacityValue);
        }
    }, 10);

    const mobileCardInteraction = _.throttle(() => {
        const scrollTop = $("html").scrollTop();

        let cardOffset = $(".card.mobile").offset().top;
        // card
        const clipPathXDefault = 3.333;
        const clipPathRadiusDefault = 45;
        // 3.333 45
        let clipPathX =
            clipPathXDefault * ((cardOffset - scrollTop) / cardOffset);
        let clipPathRadius =
            clipPathRadiusDefault * ((cardOffset - scrollTop) / cardOffset);
        const changePoint =
            $(".card.mobile").offset().top +
            $(".card.mobile .scroll-height").height();
        if (scrollTop >= changePoint) {
            clipPathX =
                clipPathXDefault *
                ((scrollTop - changePoint) /
                    (cardOffset +
                        ($(".card.mobile").height() -
                            $(window).height() -
                            changePoint)));
            clipPathRadius =
                clipPathRadiusDefault *
                (scrollTop /
                    (cardOffset +
                        ($(".card.mobile").height() - $(window).height())));
            $(".wrap").css("background-color", "#0D0D0D");
        } else {
            $(".wrap").css("background-color", "#F9FAFB");
        }

        if (clipPathRadius > clipPathRadiusDefault) {
            clipPathRadius = clipPathRadiusDefault;
        }
        if (clipPathX > clipPathXDefault) {
            clipPathX = clipPathXDefault;
        }
        if (clipPathX < 0) {
            clipPathX = 0;
        }
        if (clipPathRadius < 0) {
            clipPathRadius = 0;
        }

        $(".card.mobile .card-contents").css({
            "clip-path":
                "inset(0px " +
                clipPathX +
                "% round " +
                clipPathRadius +
                "px)",
        });
    }, 10);

    const hoverCardInteraction = _.throttle(() => {
        const elementTop = $(".hover-card-container").offset().top;
        const elementHeight = $(".hover-card-container").outerHeight();
        const viewportHeight = $(window).height() - $(window).height() / 4;
        const scrollTop = $(window).scrollTop();
        const midpoint = scrollTop + viewportHeight;
        const distanceFromMidpoint =
            (midpoint - (elementTop + elementHeight / 2)) * -1;
        const val = distanceFromMidpoint / viewportHeight;
        $(".hover-card").each((idx, el) => {
            const translateYDefault = $(el).data("default");
            const translateYValue = translateYDefault * val;
            if (translateYDefault > 0) {
                if (translateYDefault * -1 <= translateYValue) {
                    $(el).css(
                        "transform",
                        "translateY(" + translateYValue + "px)"
                    );
                }
            } else {
                if (translateYDefault * -1 >= translateYValue) {
                    $(el).css(
                        "transform",
                        "translateY(" + translateYValue + "px)"
                    );
                }
            }
        });
    }, 10);

    // const stepCardAnimation = _.throttle(() => {
    //     const scrollTop = $("html").scrollTop();
    //     const maxScrollTop =
    //         scrollTop - $(".step-card-list").offset().top + $(".gnb").height();
    //     const opacityValue =
    //         maxScrollTop / ($(".step-card-list li:nth-child(2)").outerHeight() / 2);
    //     if (opacityValue <= 1) {
    //         $(".step-card-list li")
    //             .eq(1)
    //             .children("div")
    //             .not(".step-num")
    //             .css("opacity", opacityValue);
    //         $(".step-card-list li")
    //             .eq(2)
    //             .children("div")
    //             .not(".step-num")
    //             .css("opacity", 0);
    //     } else if (opacityValue <= 2) {
    //         $(".step-card-list li")
    //             .eq(2)
    //             .children("div")
    //             .not(".step-num")
    //             .css("opacity", opacityValue - 1);
    //         $(".step-card-list li")
    //             .eq(3)
    //             .children("div")
    //             .not(".step-num")
    //             .css("opacity", 0);
    //     } else {
    //         // $(".step-card-list li")
    //         //     .eq(2)
    //         //     .children("div")
    //         //     .not(".step-num")
    //         //     .css("opacity", opacityValue - 1.3);
    //         $(".step-card-list li")
    //             .eq(3)
    //             .children("div")
    //             .not(".step-num")
    //             .css("opacity", opacityValue - 2);
    //     }
    // }, 10);
    const stepCardAnimation = _.throttle(() => {
        const scrollTop = $("html").scrollTop();
        // const maxScrollTop =
        //     scrollTop -
        //     $(".step-card-list").offset().top +
        //     $(".gnb").height();
        // // const cardHeight =
        // //     $(".step-card-list li:nth-child(2)").outerHeight() / 2;
        // const cardHeight =
        //     $(".step-card-list li:nth-child(3)").outerHeight() / 3;
        // const opacityValue = maxScrollTop / cardHeight;
        // console.log("*opacityValue*:", opacityValue);

        $(".step-card-list li")
            .children("div")
            .not(".step-num")
            .css("opacity", 1);

        // if (opacityValue <= 1) {
        //     $(".step-card-list li")
        //         .eq(1)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        //     $(".step-card-list li")
        //         .eq(2)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        // } else if (opacityValue <= 1.5) {
        //     $(".step-card-list li")
        //         .eq(2)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        //     $(".step-card-list li")
        //         .eq(3)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        // } else if (opacityValue <= 2.5) {
        //     $(".step-card-list li")
        //         .eq(3)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        //     $(".step-card-list li")
        //         .eq(4)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        // } else {
        //     $(".step-card-list li")
        //         .eq(4)
        //         .children("div")
        //         .not(".step-num")
        //         .css("opacity", opacityValue);
        //     // .css("opacity", opacityValue - 3);
        // }
    }, 10);

    const scrollOb = new IntersectionObserver((entries) => {
        let scrollEvent = () => {};
        for (const entry of entries) {
            switch (entry.target) {
                case $(".card.intro")[0]:
                    scrollEvent = introCardInteraction;
                    break;
                case $(".card.mobile")[0]:
                    scrollEvent = mobileCardInteraction;
                    break;
                case $(".step-card-list")[0]:
                    scrollEvent = stepCardAnimation;
                    break;
                case $(".hover-card-container")[0]:
                    scrollEvent = hoverCardInteraction;
                    break;
            }
            // show
            if (entry.isIntersecting) {
                $(window).on("scroll", scrollEvent);
            } else {
                // hide
                $(window).off("scroll", scrollEvent);
            }
        }
    });

    const spreadCardOb = new IntersectionObserver(
        (entries) => {
            // Check if screen width is greater than 720px
            // const mediaQuery = window.matchMedia('(min-width: 720px)');
            const mediaQuery = window.matchMedia('(min-width: 100px)');
            
            const handleIntersection = (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && mediaQuery.matches) {
                        $(".card-list").addClass("spread");
                    } else {
                        $(".card-list").removeClass("spread");
                    }
                }
            }

            // Initial check
            handleIntersection(entries);

            // Add listener for screen size changes
            mediaQuery.addListener(() => handleIntersection(entries));
        },
        {
            threshold: 0.5,
        }
    );

    let run;
    const chatListOb = new IntersectionObserver((entries) => {
        let delay = 800;
        let i = 1;
        let opIdx = 1;
        let isFirstTime = true;

        function request() {
            clearInterval(run);

            $(".chat-msg").each((idx, el) => {
                $(el).css("opacity", 0.25 * opIdx);
                if (i == 0 || opIdx == 4) {
                    opIdx = 1;
                }
                opIdx++;
            });

            $(".chat-msg-container").css({
                transform:
                    "translateY(" +
                    -$(".chat-msg").outerHeight(true) * i +
                    "px)",
                transition: "transform 0.5s",
            });

            if (i == 0) {
                delay = 0;
                $(".chat-msg-container").addClass("ready").css({
                    transition: "none",
                });
                iOp = 1;
            } else {
                delay = 800;
            }
            if (isFirstTime) {
                if (i == 8) {
                    i = 0;
                    isFirstTime = false;
                } else {
                    i++;
                }
            } else {
                if (i == 5) {
                    i = 0;
                } else {
                    i++;
                }
            }
            run = setInterval(request, delay);
        }

        for (const entry of entries) {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    run = setInterval(request, delay);
                }, 500);
            } else {
                $(".chat-msg-container")
                    .removeClass("ready")
                    .css("transform", "none");
                clearInterval(run);
            }
        }
    });

    const reservationScreenOb = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const order = $(entry.target).data("order") - 1 || 0;
                setTimeout(() => {
                    $(entry.target).addClass("show");
                }, 300 * order);
            } else {
                $(entry.target).removeClass("show");
            }
        }
    });


    // * excute
    // scrollOb.observe(document.querySelector(".card.intro"));
    // scrollOb.observe(document.querySelector(".card.mobile"));
    // scrollOb.observe(document.querySelector(".step-card-list"));
    // scrollOb.observe(document.querySelector(".hover-card-container"));
    // spreadCardOb.observe(document.querySelector(".card-list"));
    // chatListOb.observe(document.querySelector(".chat-list"));

    const introCard = document.querySelector(".card.intro");
    const mobileCard = document.querySelector(".card.mobile");
    const stepCardList = document.querySelector(".step-card-list");
    const hoverCardContainer = document.querySelector(".hover-card-container");
    const cardList = document.querySelector(".card-list");
    const chatList = document.querySelector(".chat-list");

    if (introCard) scrollOb.observe(introCard);
    if (mobileCard) scrollOb.observe(mobileCard);
    if (stepCardList) scrollOb.observe(stepCardList);
    if (hoverCardContainer) scrollOb.observe(hoverCardContainer);
    if (cardList) spreadCardOb.observe(cardList);
    if (chatList) chatListOb.observe(chatList);

    $(".fade-up, .fade-right, .fade-in, .show-card")
        .not(".show")
        .each((idx, el) => {
            reservationScreenOb.observe(el);
        });
});



