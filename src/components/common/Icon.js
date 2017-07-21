import React from 'react';
import PropTypes from 'prop-types';
import styles from './Icon.scss';

const Icon = ({ width = 32 , height = 32, glyph, onClick, mode, activeMode }) => {
  let iconClass = activeMode == mode ? `${styles.icon} ${styles.active}` :
    styles.icon;
  return (
    <div className={styles.wrapper} onClick={onClick} data-mode={mode}>
      <svg className={iconClass} width={width} height={height} viewBox={glyph.viewbox}>
        <use xlinkHref={glyph.symbol} />
      </svg>
    </div>
  );
};

Icon.propTypes = {
  glyph: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Icon;
