import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';
import { apiAddress } from '../../config/apiAddress';
import styles from './Map.scss';


export class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded && google) { // load finished
      if (isScriptLoadSucceed) {
        this.map = new google.maps.Map(this.mapNode, {
          center: this.props.center,
          zoom: this.props.zoom
        });
        this.initMarker();
      }
      else this.props.onError()
    }
  }

  initMarker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);

        const marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'Hello World!'
        });
      }, () => {
        console.log('navigator disabled');
      });
    } else {
      // Browser doesn't support Geolocation
      console.log('navigator disabled');
    }
  }

  renderLoading() {
    if (!this.map) {
      return (<div className={styles.loading}>Loading...</div>);
    }
  }

  render() {
    return (
      <section className={styles.main}>
        <header className={styles.sectionHeader}>
        <p className={styles.instruction}>
        Click places you want to visit and then click the button to calculate the shortes route.
        </p>
        <button className={styles.button}>Calculate</button>
      </header>
      <div className={styles.mapSection}>
        <div className={styles.map}
          ref={ node => { this.mapNode = node; }}>
        </div>
        {this.renderLoading()}
        <div className={styles.history}
        ref={ node => { this.history = node; }}>
        History
        </div>
      </div>
     </section>
   )
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
    state: state
  };
};

const AsyncMap = scriptLoader(apiAddress)(Map);

export default connect(mapStateToProps)(AsyncMap);
