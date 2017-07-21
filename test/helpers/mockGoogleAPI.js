const mockAddListener = () => { console.log('fake add listener'); };

export const mockGoogleAPI = () => {
  return {
    maps: {
      Map: () => ({ addListener: mockAddListener }),
      Marker: () => ({}),
      DirectionsService: () => ({
        route: () => ({})
      }),
      DirectionsRenderer: function() {
        return {
          setMap: () => ({}),
          setPanel: () => ({})
        };
      }
    }
  };
};
