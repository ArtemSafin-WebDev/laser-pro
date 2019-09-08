export default function () {
  controller('callback', self => {

      self.each(function(){
          var callbackItem = $(this);
          let item = callbackItem.find('.callback__img');

          let callback = new Waypoint({
              element: this,
              handler: function(direction) {
                  item.toggleClass('callback-animate');
              },
              offset: '45%'
          });
      });

  })
}
