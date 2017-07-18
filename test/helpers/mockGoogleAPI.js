const mockAddListener = () => { console.log('fake add listener'); };

export const mockGoogleAPI = () => {
  return {
    maps: {
      Map: function() {
        return {
          addListener: mockAddListener
        };
      },
      Marker: function() {
        return {};
      },
      DirectionsService: function() {
        return {
          route: function() {
            return {};
          }
        };
      }
    }
  };
};
