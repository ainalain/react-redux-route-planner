import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import styles from './MapHeader.scss';

const MapHeader = ({ calculateRoute, updateHistory }) => {
  return (
    <header className={styles.header}>
    <p className={styles.instruction}>
    Click places you want to&nbsp;visit and use buttons to&nbsp;show the&nbsp;shortest route or&nbsp;to&nbsp;clear the&nbsp;map.
    </p>
    <div className={styles.controls}>
      <Button onClick={calculateRoute} text='Route'
        cssClass='calculate' icon='calculate' />
      <Button onClick={updateHistory} text='Clear map'
        cssClass='clear' icon='clear' />
    </div>
  </header>
  );
};

MapHeader.propTypes = {
  calculateRoute: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired
};

export default MapHeader;
