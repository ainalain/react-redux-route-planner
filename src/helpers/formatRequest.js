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
