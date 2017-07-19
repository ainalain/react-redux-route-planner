import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListItem.scss';

const ListItem = ({ item, onClick, index }) => {
  return (
    <li className={styles.item} onClick={onClick} data-index={index}>
    <div className={styles.start}>
      <span className={styles.note}>From:</span> {item.startPoint}
    </div>
    <div className={styles.end}>
    <span className={styles.note}>To:</span> {item.endPoint}
    </div>
    <div className={styles.waypoints}>
    <span className={styles.note}>Waypoints number:</span> {item.waypoints}
    </div>
  </li>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired
};

export default ListItem;
