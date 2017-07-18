const getUserPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      return userPosition;
    }, () => {
      console.log('navigator disabled');
      return null;
    });
  } else {
    // Browser doesn't support Geolocation
    console.log('navigator disabled');
    return null;
  }
};

export default getUserPosition;
