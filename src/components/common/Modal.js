import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styles from './Modal.scss';

const Modal = ({ error, onClick, hidden }) => {
  let modalClass = hidden ? `${styles.modal} ${styles.hidden}` : `${styles.modal}`;
  let backdropClass = hidden ? `${styles.backdrop} ${styles.hidden}` : `${styles.backdrop}`;
  return (
    <div className={`${backdropClass}`}>
      <div className={`${modalClass}`}>
        <h2 className={styles.title}>Oops, this is an error!</h2>
        <div className={styles.error}>
          {error}
        </div>
        <div className={styles.controls}>
          <Button text='Got it!' cssClass='close' onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  hidden: PropTypes.bool
};

export default Modal;
