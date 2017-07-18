export const formatRequest = (markers) => {
  let length = markers.length;
  let request = {
    travelMode: 'DRIVING'
  };
  request.origin = markers[0];
  request.destination = markers[length - 1];
  let waypts = [];
  markers.map(marker => {
    let point = {
      location: marker,
      stopover: true
    };
    waypts.push(point);
  });
  request.waypoints = waypts;
  return request;
};

export const formatHistoryItems = (routes) => {
  let items = [];
  routes.map(route => {
    let legs = route.routes[0].legs,
      length = legs.length,
      startPoint = legs[0].start_address,
      endPoint = legs[length - 1].end_address,
      waypoints = length - 3;
      items.push({ startPoint, endPoint, waypoints });
  });
  return items;
};
