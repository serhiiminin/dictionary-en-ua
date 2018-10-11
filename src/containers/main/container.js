import React from 'react';
import PropTypes from 'prop-types';
import trident from '../../images/trident.svg';

const MainContainer = ({ classes }) => (
  <div className={classes.mainPage}>
    <img src={trident} alt="trident"/>
    <div>
      <q className={classes.quoteText}>Учітесь, читайте, І чужому научайтесь, Й свого не цурайтесь</q>
      <p className={classes.quoteAuthor}>Т.Г. Шевченко</p>
    </div>
  </div>
);

MainContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

MainContainer.defaultProps = {
  classes: {},
};

export default MainContainer;
