export default function () {
  controller('indicators', (self) => {

    const content = Array.from(document.querySelectorAll('.indicators__content'));
    const placeToPutContent = document.querySelector('.js-place-to-put-content');
    if (!placeToPutContent) {
      return;
    }
    content.forEach(item => {
      placeToPutContent.appendChild(item);
    })

    let slider = self.find('.js-indicators-slider'),
        sliderNav = self.find('.js-indicators-nav');

    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      lazyLoad: 'ondemand',
      asNavFor: sliderNav
    });
    sliderNav.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      // centerMode: true,
      asNavFor: slider,
      arrows: false,
      lazyLoad: 'ondemand',
      variableWidth: true,
      // infinite: false,
      focusOnSelect: true
    });
    
    let btn = self.find('.js-indicators-btn'),
        drop = self.find('.js-indicators-drop');
    
    btn.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          item = $this.closest('.js-indicators-item'),
          href = $this.attr('href');

      if($this.hasClass('active') ) {
        self.find(btn).removeClass('active');
        self.find(drop).slideUp('300');

        return true;
      }

      self.find(drop).slideUp('300');
      item.find(drop).slideDown('300');

      self.find(btn).removeClass('active');
      $this.addClass('active');

      $('.js-indicators-content').removeClass('active');
      $(href).addClass('active');

      slider.slick('setPosition');
      sliderNav.slick('setPosition');
    });
  });
}