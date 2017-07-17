import React from 'react';
import Header from './common/Header';
import AsynMap from './Map';
import styles from './layout.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <AsynMap />
    </div>
  );
};

export default App;
