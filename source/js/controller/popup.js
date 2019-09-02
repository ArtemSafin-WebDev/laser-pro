export default function () {
  $('[data-fancybox]').fancybox({
    autoFocus: false,
    touch: false
  });

  $('.js-popup-open').on('click', function(e) {
    e.preventDefault();
    
    let href = $(this).attr('href');
    $.fancybox.open($(href), {
      autoFocus: false,
      touch: false
    });
  })
}
  