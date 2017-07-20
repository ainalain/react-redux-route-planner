import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';
import { apiAddress } from '../../config/apiAddress';
import { getCurrentRoute, updateCurrentRoute, updateHistory } from '../actions/routeActions';
import { clearMap } from '../actions/mapActions';
import { formatRequest, formatHistoryItems } from '../helpers/formatData';
import getUserPosition from '../helpers/geolocation';
import History from './map/History';
import Marker from './Marker';
import MapHeader from './map/MapHeader';
import Modal from './common/Modal';
import Loading from './map/Loading';
import styles from './Map.scss';
import * as errorTypes from '../errors/errorTypes';


export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.state = {
      markers: [],
      limitExceed: false,
      currentRoute: this.props.currentRoute,
      savedRoutes: this.props.savedRoutes,
      ajaxCallInProgress: true,
      error: this.props.error
    };

    this.calculateRoute = this.calculateRoute.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed,
      currentRoute, savedRoutes, error }) {
    if (isScriptLoaded && !this.props.isScriptLoaded && google) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({ ajaxCallInProgress: false });
        this.map = new google.maps.Map(this.mapNode, {
          center: this.props.center,
          zoom: this.props.zoom
        });
        this.map.addListener('click', this.populateMarkers.bind(this));
        this.setCenter();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(this.panel);
      }
      else  {
        this.setState({ error: errorTypes.GOOGLE_SCRIPT_NOT_LOADED });
      }
    }
    if (currentRoute !== this.props.currentRoute) {
      this.setState({ currentRoute: currentRoute }, this.drawRoute);
    }
    if (savedRoutes.length > this.state.savedRoutes.length) {
      this.setState({ savedRoutes: savedRoutes });
    }
    if (error !== this.props.error) {
      this.setState({ error: error });
      this.setState({ ajaxCallInProgress: false }, this.clearMap);
    }
  }

  setCenter() {
    const userPosition = getUserPosition();
    if (userPosition) {
      this.map.setCenter(userPosition);
    }
  }

  populateMarkers(event) {
    let lat = event.latLng.lat(),
      lng = event.latLng.lng();
    if (this.state.markers.length < 24) {
      let arr = [...this.state.markers, { lat, lng }];
      this.setState({ markers: arr });
    } else {
      this.warnAboutMarkersLimit();
    }
  }

  renderMarkers() {
    if (this.map && this.state.markers.length) {
      return this.state.markers.map((marker, index) => (
        <Marker position={marker} key={index} index={index}
          map={this.map} google={google} />)
      );
    }
  }

  warnAboutMarkersLimit() {
    this.setState({ error: errorTypes.MAX_WAYPOINTS_EXCEEDED });
  }

  renderModal() {
    let hidden = true;
    if (this.state.error.length) {
      hidden = false;
    }
    return (
      <Modal error={this.state.error} onClick={this.clearError} hidden={hidden} />
    );
  }

  clearError() {
    this.setState({ error: '' });
  }

  calculateRoute() {
    if (this.state.markers.length) {
      let request = formatRequest(this.state.markers);
      let params = {
        google, request, map: this.map
      };
      this.setState({ ajaxCallInProgress: true });
      this.props.getCurrentRoute(params);
    } else {
      let noMarkers = errorTypes.NO_MARKERS;
      this.setState({ error: noMarkers });
    }

  }

  drawRoute() {
    let condition = this.map && google &&
      Object.keys(this.state.currentRoute).length;
    if (condition) {
      this.setState({ ajaxCallInProgress: false });
      this.directionsDisplay.setDirections(this.state.currentRoute);
    }
  }

  updateRoute(event) {
    let currentIndex = event.currentTarget.dataset.index;
    let newRoute = this.state.savedRoutes[currentIndex];
    let cond = this.state.currentRoute.id !== newRoute.id;
    if (cond) {
      this.props.updateCurrentRoute(newRoute);
    }
  }

  updateHistory() {
    if (Object.keys(this.state.currentRoute).length) {
      this.props.updateHistory(this.state.currentRoute);
      this.setState({ markers: [] }, this.props.clearMap);
      this.directionsDisplay.set('directions', null);
      this.props.updateCurrentRoute({});
    } else {
      let arr = [];
      this.setState({ markers: arr }, this.props.clearMap);
    }
  }

  renderHistory() {
    if (this.state.savedRoutes.length) {
      let items = formatHistoryItems(this.state.savedRoutes);
      return (<History items={items} onItemClick={this.updateRoute} />);
    }
  }

  renderLoading() {
    return (<Loading ajaxCallInProgress={this.state.ajaxCallInProgress} />);
  }

  render() {
    return (
      <section className={styles.main}>
        <MapHeader
        calculateRoute={this.calculateRoute} updateHistory={this.updateHistory} />
      <div className={styles.mapSection}>
        <div className={styles.map}
          ref={node => { this.mapNode = node; }}>
          {this.renderMarkers()}
        </div>
        {this.renderLoading()}
        <details className={styles.details}>
          <summary className={styles.summary}>Route details</summary>
          <div className={styles.panel}
            ref={node => { this.panel = node; }}></div>
        </details>
        <div className={styles.history}
          ref={node => { this.history = node; }}>
        <div className={styles.title}>Routes history</div>
        {this.renderHistory()}
        </div>
      </div>
      {this.renderModal()}
     </section>
   );
 }
}

Map.defaultProps = {
  center: {
    lat: 50.0614238,
    lng: 19.9515069
  },
  zoom: 8
 };

Map.propTypes = {
  zoom: PropTypes.number,
  center:PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state.currentRoute,
    savedRoutes: state.savedRoutes,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentRoute: (params) => dispatch(getCurrentRoute(params)),
    updateCurrentRoute: (route) => dispatch(updateCurrentRoute(route)),
    updateHistory: (route) => dispatch(updateHistory(route)),
    clearMap: () => dispatch(clearMap())
  };
};

const AsyncMap = scriptLoader(apiAddress)(Map);

export default connect(mapStateToProps, mapDispatchToProps)(AsyncMap);
