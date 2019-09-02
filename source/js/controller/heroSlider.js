export default function () {
  controller('hero-slider', self => {
    self.slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: true,
      speed: 700,
      infinite: false,
      lazyLoad: 'ondemand',
      prevArrow: '<span class="slick-prev"></span>',
      nextArrow: '<span class="slick-next"></span>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            speed: 400,
            dots: true
          }
        }
      ]
    })
  })
}
  