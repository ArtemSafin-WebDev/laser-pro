import browserUpdateOptions from "./browserUpdateOptions";
import browserUpdate from "browser-update";
import controller from "./utils/controller";
import preloader from "./controller/preloader";
import ctrl from "./controller/index";
import equalHeight from "./utils/equalHeight";

controller();
preloader();
browserUpdate(browserUpdateOptions);

// Полифилл для метода element.matches();

(function() {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Полифилл метода element.closest();

(function(ELEMENT) {
    ELEMENT.matches =
        ELEMENT.matches ||
        ELEMENT.mozMatchesSelector ||
        ELEMENT.msMatchesSelector ||
        ELEMENT.oMatchesSelector ||
        ELEMENT.webkitMatchesSelector;
    ELEMENT.closest =
        ELEMENT.closest ||
        function closest(selector) {
            if (!this) return null;
            if (this.matches(selector)) return this;
            if (!this.parentElement) {
                return null;
            } else return this.parentElement.closest(selector);
        };
})(Element.prototype);

$(document).ready(() => {
    svg4everybody();

    ctrl.forEach(controller => controller());

    new WOW().init();

    const bLazy = new Blazy();
    $(window).on("preloaderRemoved", () => {
        bLazy.revalidate();
        $(".hide").addClass("show");
    });

    equalHeight($(".js-concept-height"));
    equalHeight($(".js-indicators-height"));
    equalHeight($(".js-about-name"));
    equalHeight($(".js-about-title"));
    equalHeight($(".js-hero-slide-height"));
    equalHeight($(".js-indicators-equal-height"));
});
