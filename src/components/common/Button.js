import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const Button = ({ onClick, text, cssClass, icon }) => {
  return (
    <button className={`${styles.button} ${styles[cssClass]}`}
      onClick={onClick}>
      <span className={styles.flexHack}>
      {text}
      {icon ?
        <span className={`${styles.icon} ${styles[icon]}`}></span> :
        null}
      </span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  cssClass: PropTypes.string
};

export default Button;
