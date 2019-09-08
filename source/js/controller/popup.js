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
  });

//   var popup = $('.popup-subscribe');
//     popup.find('input[type="tel"]').mask('+7 (999) 999-99-99');

//     var input = popup.find('input');
//     var form = popup.find('form');

//     input.on('keyup', function(){
//         popup.find('.form-txt-error').text('').hide();
//         if ($(this).attr('type') == 'text') {
//             if ($(this).val() != '') {
//                 $(this).addClass('success');
//             } else {
//                 $(this).removeClass('success');
//                 popup.find('.form-txt-error').text('Укажите имя').show();
//             }
//         } else if ($(this).attr('type') == 'tel') {
//             var phone = $(this).val().replace(/\D+/g, '');
//             if( phone.length == 11) {
//                 $(this).addClass('success');
//             } else {
//                 $(this).removeClass('success');
//                 popup.find('.form-txt-error').text('Укажите корректное значение телефона').show();
//             }
//         } else if ($(this).attr('type') == 'email') {
//             if( isEmailAddress($(this).val())) {
//                 $(this).addClass('success');
//             } else {
//                 $(this).removeClass('success');
//                 popup.find('.form-txt-error').text('Укажите корректное значение Email').show();
//             }
//         }
//     });

//     function isEmailAddress(str) {
//         var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         return pattern.test(str);  // returns a boolean
//     }

//     form.on('submit', function(e){
//         e.preventDefault();

//         var form = $(this);
//         var button = form.find('button');

//         form.find('.form-txt-success').hide();
//         form.find('.form-txt-error').hide();

//         if (input.length > form.find('.js-subscribe-input.success')){
//             form.find('.js-subscribe-input:not(.success):first').focus();
//         } else {
//             $.ajax({
//                 url : '/.ajax.php',
//                 dataType: 'json',
//                 data : form.serialize() + '&form=' + button + '&type=callback',
//                 beforeSend: function() {
//                     input.attr('disabled', 'disabled');
//                     button.attr('disabled', 'disabled');
//                 },
//                 success: function(data) {
//                     input.removeAttr('disabled');
//                     button.removeAttr('disabled');

//                     if(data.status) {
//                         if (data.status == 'success' ) {
//                             input.val('').removeClass('success');
//                             form.find('.form-txt-success').show();
//                         } else {
//                             form.find('.form-txt-error').text('Не удалось отправить. Попробуйте повторно').show();
//                         }
//                     }
//                 }
//             })
//         }
//     });
}
  