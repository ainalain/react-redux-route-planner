import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';
import { apiAddress } from '../../config/apiAddress';
import { getCurrentRoute, updateCurrentRoute, updateHistory } from '../actions/routeActions';
import { clearMap } from '../actions/mapActions';
import { formatRequest, formatHistoryItems } from '../helpers/formatData';
import getUserPosition from '../helpers/geolocation';
import Marker from './Marker';
import styles from './Map.scss';
import ListItem from './common/ListItem';


export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.state = {
      markers: [],
      limitExceed: false,
      currentRoute: this.props.currentRoute,
      savedRoutes: this.props.savedRoutes,
      ajaxCallInProgress: true
    };

    this.calculateRoute = this.calculateRoute.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.updateRoute = this.updateRoute.bind(this);
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed, currentRoute, savedRoutes }) {
    if (isScriptLoaded && !this.props.isScriptLoaded && google) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({ ajaxCallInProgress: false });
        this.map = new google.maps.Map(this.mapNode, {
          center: this.props.center,
          zoom: this.props.zoom
        });
        this.map.addListener('click', this.populateMarkers.bind(this));
        this.setCenter();
      }
      else  {
        this.props.onError();
      }
    }
    if (currentRoute !== this.props.currentRoute) {
      this.setState({ currentRoute: currentRoute }, this.drawRoute);
    }
    if (savedRoutes.length > this.state.savedRoutes.length) {
      this.setState({ savedRoutes: savedRoutes });
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
    this.setState({ limitExceed: true });
  }

  calculateRoute() {
    let request = formatRequest(this.state.markers);
    let params = {
      google, request, map: this.map
    };
    this.setState({ ajaxCallInProgress: true });
    this.props.getCurrentRoute(params);
  }

  drawRoute() {
    if (this.map && google) {
      this.setState({ ajaxCallInProgress: false });
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setPanel(this.panel);
      this.directionsDisplay.setDirections(this.state.currentRoute);
    }
  }

  updateRoute(event) {
    let currentIndex = event.currentTarget.dataset.index;
    let newRoute = this.state.savedRoutes[currentIndex];
    this.props.updateCurrentRoute(newRoute);
  }

  updateHistory() {
    if (Object.keys(this.state.currentRoute).length) {
      this.props.updateHistory(this.state.currentRoute);
      this.setState({ markers: [] }, this.props.clearMap);
      this.directionsDisplay.set('directions', null);
    } else {
      let arr = [];
      this.setState({ markers: arr }, this.props.clearMap);
    }
  }

  renderHistory() {
    if (this.state.savedRoutes.length) {
      let items = formatHistoryItems(this.state.savedRoutes);
      return (
        <ul className={styles.list}>
          {items.map((item, index) =>
            <ListItem key={index} index={index}
            item={item} onClick={this.updateRoute} />
          )}
        </ul>
      );
    }
  }

  renderLoading() {
    let loadingClass = this.state.ajaxCallInProgress ? styles.loading :
      `${styles.loading} ${styles.hidden}`;
      return (<div className={`${loadingClass}`}>
        <img className={styles.image}
          src={'../icons/loading.gif'}
          alt={'loading spinner'} />
        </div>);
  }

  render() {
    return (
      <section className={styles.main}>
        <header className={styles.sectionHeader}>
        <p className={styles.instruction}>
        Click places you want to visit and then click the button to calculate the shortes route.
        </p>
        <button className={styles.button} onClick={this.calculateRoute}>
        Calculate
        </button>
        <button className={styles.button} onClick={this.updateHistory}>
        Clear map
        </button>
      </header>
      <div className={styles.mapSection}>
        <div className={styles.map}
          ref={node => { this.mapNode = node; }}>
          {this.renderMarkers()}
        </div>
        {this.renderLoading()}
        <details className={styles.details}>
          <summary>Route details</summary>
          <div className={styles.panel}
            ref={ node => { this.panel = node; }}></div>
        </details>
        <div className={styles.history}
          ref={node => { this.history = node; }}>
        <div className={styles.title}>History</div>
        {this.renderHistory()}
        </div>
      </div>
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
    savedRoutes: state.savedRoutes
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
