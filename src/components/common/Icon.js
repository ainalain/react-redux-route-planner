import React from 'react';
import styles from './Icon.scss';

const Icon = ({ width = 32 , height = 32, glyph }) => {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} width={width} height={height} viewBox={glyph.viewbox}>
        <use xlinkHref={glyph.symbol} />
      </svg>
    </div>
  );
};

export default Icon;
