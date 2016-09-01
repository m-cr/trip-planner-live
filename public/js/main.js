$(

  function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  var gMarkers = [];

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    console.log(marker);
    gMarkers.push(marker);
    marker.setMap(currentMap);
  }

  // function removeMarker (type, coords) {
  //   console.log('called');
  //   var latLng = google.maps.LatLng(coords[0], coords[1]);
  //   var iconURL = iconURLs[type];
  //   var marker = new google.maps.Marker({
  //     icon: iconURL,
  //     position: latLng
  //   });
  //   for(var i = 0; i < gMarkers.length; i ++){
  //     console.log(gMarkers[i]==marker);
  //     if(marker == gMarkers[i]){
  //       console.log('in if in for');
  //       gMarkers[i].setMap(null);
  //     }
  //   }
  // }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);
  $( document ).ready(function() {
      hotels.forEach(function(hotel){
          $('#hotel-choices').append('<option>'+hotel.name+'</option>');
      });

      activities.forEach(function(activity){
          $('#activity-choices').append('<option>'+activity.name+'</option>');
      });

      restaurants.forEach(function(restaurant){
          $('#restaurant-choices').append('<option>'+restaurant.name+'</option>');
      });

       $(document).delegate("#itinerary .itinerary-item button",'click',function(){
        $(this).parent().empty();
        // removeMarker(type, location);
      });

      $("button[data-action='add']").on('click',function(){
        var type=$(this).prev().data('type');
        var value=$(this).prev().val();
        var location;
        var itenaryItem='<div class="itinerary-item">'+
                  '<span class="title">'+value+'</span>'+
                  '<button class="btn btn-xs btn-danger remove btn-circle">x</button>'+
                '</div>';
        switch(type){
          case 'hotel':
            location=hotels.filter(function(hotel){
                return hotel.name==value;
            })[0].place.location;
            //if($($('#itinerary .list-group')[0]).children().length != 0)
             // break;
            $($('#itinerary .list-group')[0]).append(itenaryItem);
            // $("#itinerary .itinerary-item button").on('click',function(){
            //   $(this).parent().empty();
            // });
          break;
          case 'restaurant':
           location=restaurants.filter(function(restaurant){
                return restaurant.name==value;
            })[0].place.location;
            $($('#itinerary .list-group')[1]).append(itenaryItem);
          break;
          case 'activity':
           location=activities.filter(function(activity){
                return activity.name==value;
            })[0].place.location;
            $($('#itinerary .list-group')[2]).append(itenaryItem);
          break;
          default:
        }
        drawMarker(type, location);
     
    });
  });
});
