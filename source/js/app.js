import browserUpdateOptions from './browserUpdateOptions'
import browserUpdate from 'browser-update';
import controller from './utils/controller';
import preloader from './controller/preloader';
import ctrl from './controller/index';
import equalHeight from './utils/equalHeight';

controller();
preloader();
browserUpdate(browserUpdateOptions);

$(document).ready(() => {
  svg4everybody();

  ctrl.forEach(controller => controller());

  new WOW().init();

  const bLazy = new Blazy();
  $(window).on('preloaderRemoved', () => {
    bLazy.revalidate();
    $('.hide').addClass('show');
  });

  equalHeight($('.js-concept-height'));
  equalHeight($('.js-indicators-height'));
  equalHeight($('.js-about-name'));
  equalHeight($('.js-about-title'));
  equalHeight($('.js-hero-slide-height'));
  equalHeight($('.js-indicators-equal-height'));
});
