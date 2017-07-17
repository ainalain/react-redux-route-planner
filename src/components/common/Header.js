import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';


const Header = () => {
    return (
      <header className={styles.header}>
        <h1 className={styles.title}>
        Optimize your time: react route-planner base on Google Map API
        </h1>
      </header>
    );
};

Header.propTypes = {

};

export default Header;
