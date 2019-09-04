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
    });
}
