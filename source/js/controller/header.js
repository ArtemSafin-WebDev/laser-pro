export default function () {
  controller('header', self => {
    let btn = self.find('.js-header-btn'),
        drop = self.find('.js-header-drop'),
        overlay = self.find('.js-header-overlay');

    btn.on('click', function() {
      $(this).toggleClass('active');
      drop.toggleClass('active');
      overlay.toggleClass('active');
      $('body').toggleClass('hidden');
    })

    overlay.on('click', function() {
      $(this).removeClass('active');
      drop.removeClass('active');
      btn.removeClass('active');
      $('body').removeClass('hidden');
    })
  })
}
