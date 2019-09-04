export default function() {
    controller("about", self => {
        let val = self.find(".js-about-val");

        let about = new Waypoint({
            element: document.getElementById("about"),
            offset: "80%",
            handler: function(direction) {
                if (direction === "down") {
                    val.each(function() {
                        $(this)
                            .prop("counter", 0)
                            .animate(
                                {
                                    counter: $(this)
                                        .parents(".about__col")
                                        .data("count")
                                },
                                {
                                    duration: 2000,
                                    easing: "swing",
                                    step: function(now) {
                                        $(this).text(Math.ceil(now));
                                    }
                                }
                            );
                    });
                }
            }
        });

        if (!$("body").hasClass("is-admin")) {
            $(".about__holder").each(function() {
                var flag1,
                    flag2 = false;
                var holder = $(this);

                holder.find(".js-about-title").each(function() {
                    if (
                        $(this)
                            .text()
                            .replace(/\s/g, "") != ""
                    )
                        flag1 = true;
                });
                holder.find(".about__item-descr").each(function() {
                    if (
                        $(this)
                            .text()
                            .replace(/\s/g, "") != ""
                    )
                        flag2 = true;
                });

                if (!flag1) {
                    holder.find(".js-about-title").each(function() {
                        $(this).remove();
                    });
                }
                if (!flag2) {
                    holder.find(".about__item-descr").each(function() {
                        $(this).remove();
                    });
                }
            });
        }
    });
}
