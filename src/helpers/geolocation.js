const getUserPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      return userPosition;
    }, () => {
      return null;
    });
  } else {
    // Browser doesn't support Geolocation
    return null;
  }
};

export default getUserPosition;
