export default function () {
  try {
    jQuery.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCvHcKiu2OsmAL4BELxFvuDxmjG5ntLBac', function () {
      const locations = [
        ['Title A', 55.806109, 49.482632, 1],
        ['Title B', 56.874011, 52.741233, 2],
        ['Title C', 55.566889, 52.657276, 3]
      ];
      const uluru = {lat: 56.841354, lng: 48.903880};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        gestureHandling: 'greedy',
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#444444"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#cccccc"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "hue": "#cccccc"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eff1fa"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "labels",
            "stylers": [
              {
                "color": "#eff1fa"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#eff1fa"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": "100"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "off"
              },
              {
                "lightness": "23"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffd900"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#ffd900"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "color": "#bdc8ff"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ],
        center: {lat: 55.979513, lng: 46.904520},
        zoomControl: false,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      });
      const infowindow = new google.maps.InfoWindow();
      let marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          icon: 'assets/img/pin.svg',
          animation: google.maps.Animation.BOUNCE
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    })
  } catch (e) {
    console.warn('Cannot load map')
  }
}
