export default function () {
  controller('subscribe-form', self => {
    let wrap = self.find('.js-subscribe-wrap'),
        input = self.find('.js-subscribe-input'),
        placeholder = self.find('.js-subscribe-title');
    
    input.on('focusin', function() {
      wrap.addClass('focus');
      $(this).closest('.subscribe-form__box').find(placeholder).addClass('active');
    })
    input.on('focusout', function() {
      wrap.removeClass('focus');
      var length = $(this).val().length;

      if (length != 0) {
        $(this).closest('.subscribe-form__box').find(placeholder).addClass('active');
      } else {
        $(this).closest('.subscribe-form__box').find(placeholder).removeClass('active');
      }
    })
  })
}
