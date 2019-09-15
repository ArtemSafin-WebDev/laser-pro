export default function() {
    controller("indicators", elements => {
        const indicators = elements.toArray();

        indicators.forEach(indicator => {
            console.log('indicator before', indicator)
            let self = $(indicator);

            const content = Array.from(
                indicator.querySelectorAll(".indicators__content")
            );
            const placeToPutContent = indicator.querySelector(
                ".js-place-to-put-content"
            );
            if (placeToPutContent) {
                content.forEach(item => {
                    placeToPutContent.appendChild(item);

                });
            }

            let slider = self.find(".js-indicators-slider"),
                sliderNav = self.find(".js-indicators-nav");



            slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                lazyLoad: "ondemand",
                asNavFor: sliderNav
            });
            sliderNav.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                // centerMode: true,
                asNavFor: slider,
                arrows: false,
                lazyLoad: "ondemand",
                variableWidth: true,
                // infinite: false,
                focusOnSelect: true
            });

            let btn = self.find(".js-indicators-btn"),
                drop = self.find(".js-indicators-drop");

            btn.on("click", function(e) {
                e.preventDefault();
                let $this = $(this);
                let item = $this.closest(".js-indicators-item");


                if ($this.hasClass("active")) {
                    self.find(btn).removeClass("active");
                    self.find(drop).slideUp("300");

                    return true;
                }

                self.find(drop).slideUp("300");
                item.find(drop).slideDown("300");

                self.find(btn).removeClass("active");
                $this.addClass("active");

                const hash = this.hash;
                Array.from(indicator.querySelectorAll(".indicators__content")).forEach(item => item.classList.remove('active'));
                console.log('Indicator', indicator)
                const newElement = indicator.querySelector(hash);
                if (newElement) {
                    newElement.classList.add('active');
                } else {
                    console.log('no new element')
                }

                slider.slick("setPosition");
                sliderNav.slick("setPosition");
            });
        });
    });

    if (!$("body").hasClass("is-admin")) {
        $(".concept__info").each(function() {
            if ($(this).children().length == 1) {
                if (
                    $(this)
                        .find(".concept__info-name")
                        .text()
                        .replace(/\s/g, "") == "" &&
                    $(this)
                        .find(".concept__info-price")
                        .text()
                        .replace(/\s/g, "") == ""
                ) {
                    $(this).remove();
                }
            }
        });

        $(".concept__title").each(function() {
            if (
                $(this)
                    .text()
                    .replace(/\s/g, "") == ""
            ) {
                $(this).remove();
            }
        });

        $(".concept__list").each(function() {
            if ($(this).children().length == 1) {
                if (
                    $(this)
                        .children(".concept__list-item")
                        .text()
                        .replace(/\s/g, "") == ""
                ) {
                    $(this).remove();
                }
            }
        });

        $(".concept__indicators").each(function() {
            if ($(this).children().length == 1) {
                if (
                    $(this)
                        .children(".concept__indicators-item")
                        .text()
                        .replace(/\s/g, "") == ""
                ) {
                    $(this).remove();
                }
            }
        });
    }
}