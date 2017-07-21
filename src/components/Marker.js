import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Start from '../assets/images/start.svg';
import Road from '../assets/images/road.svg';
import styles from './Marker.scss';

export class Marker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ clear }) {
    if (clear) {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    }
  }

  renderMarker() {
    let { map, google, position, index } = this.props;
    let icon = './assets/images/road.svg',
      title = 'Route point';
    if (index === 0) {
      icon = './assets/images/start.svg';

    }
    this.marker = new google.maps.Marker({ position, map, icon });
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
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

const mapStateToProps = (state, ownProps) => {
  return {
    clear: state.clear
  };
};

export default connect(mapStateToProps)(Marker);
