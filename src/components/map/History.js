import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../common/ListItem';
import styles from './History.scss';

const History = ({ items, onItemClick }) => {
  return (
    <ul className={styles.list}>
      {items.map((item, index) =>
        <ListItem key={index} index={index}
        item={item} onClick={onItemClick} />
      )}
    </ul>
  );
};

History.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default History;
