export default function () {
  controller('reviews-slider', self => {
    self.slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            prevArrow: '<span class="slick-prev"></span>',
            nextArrow: '<span class="slick-next"></span>'
          }
        }
      ]
    });

    let navItem = $('.reviews__item');

    navItem.on('click', function() {
      let slideIndex = $(this).data('slick-index');
      self.slick('slickGoTo', slideIndex);
    })
  })
}
  
