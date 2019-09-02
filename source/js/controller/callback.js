export default function () {
  controller('callback', self => {

    let item = self.find('.callback__img');

    let callback = new Waypoint({
      element: document.getElementById('callback'),
      handler: function(direction) {
        item.toggleClass('callback-animate');
      },
      offset: '45%'
    })

  })
}
