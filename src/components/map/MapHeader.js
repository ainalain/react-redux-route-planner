import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Bike from '../../assets/icons/bike.svg';
import Car from '../../assets/icons/car.svg';
import Walk from '../../assets/icons/walk.svg';
import styles from './MapHeader.scss';

const MapHeader = ({ calculateRoute, updateHistory,
    calcDisabled, onTravelModeClick, activeMode }) => {
  return (
    <header className={styles.header}>
    <p className={styles.instruction}>
    Click places you want to&nbsp;visit and use buttons to&nbsp;show the&nbsp;shortest route or&nbsp;to&nbsp;clear the&nbsp;map.
    </p>
    <div className={styles.controls}>
      <Button onClick={calculateRoute} text='Route'
        cssClass='calculate' icon='calculate' disabled={calcDisabled} />
      <Button onClick={updateHistory} text='Clear map'
        cssClass='clear' icon='clear' />
      <div className={styles.group}>
        <Icon glyph={Bike} onClick={onTravelModeClick} mode='bicycling' activeMode={activeMode} />
        <Icon glyph={Walk} onClick={onTravelModeClick} mode='walking' activeMode={activeMode} />
        <Icon glyph={Car} onClick={onTravelModeClick} mode='driving' activeMode={activeMode} />
      </div>
    </div>
  </header>
  );
};

MapHeader.propTypes = {
  calculateRoute: PropTypes.func.isRequired,
  updateHistory: PropTypes.func.isRequired,
  onTravelModeClick: PropTypes.func.isRequired,
  calcDisabled: PropTypes.bool
};

export default MapHeader;
