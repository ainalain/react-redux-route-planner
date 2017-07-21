import React from 'react';
import PropTypes from 'prop-types';
import LoadingGif from '../../assets/images/loading.gif';
import styles from './Loading.scss';

const Loading = ({ ajaxCallInProgress }) => {
  let loadingClass = ajaxCallInProgress ? styles.loading :
    `${styles.loading} ${styles.hidden}`;
  return (<div className={`${loadingClass}`}>
        <img className={styles.image}
          src={LoadingGif}
          alt={'loading spinner'} />
        </div>);
};

Loading.propTypes = {
  ajaxCallInProgress: PropTypes.bool
};

export default Loading;
