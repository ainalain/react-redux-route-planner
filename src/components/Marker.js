import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Marker.scss';

class Marker extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMarker() {
    let { map, google, position, index } = this.props;
    let icon = 'http://localhost:8080/icons/road.svg',
      title = 'Route point';
    if (index === 0) {
      icon = 'http://localhost:8080/icons/rocket.svg';

    }
    this.marker = new google.maps.Marker({ position, map, icon });
  }

  render() {
    return (
      <div className={styles.marker}>
        {this.renderMarker()}
      </div>
    );
  }
}

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
};

export default Marker;
