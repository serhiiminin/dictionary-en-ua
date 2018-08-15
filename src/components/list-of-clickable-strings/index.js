import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const ListOfClickableStrings = ({ items, onClick, classes, delimiter = '' }) => (
  <div>
    {items && items.map(item =>
      <a
        href="/"
        key={item}
        className={classes.clickableWord}
        onClick={event => { event.preventDefault(); onClick(item)}}
      >
        {`${item}${delimiter}`}
      </a>
    )}
  </div>
);

ListOfClickableStrings.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  classes: classesShape.isRequired,
  delimiter: PropTypes.string,
};

ListOfClickableStrings.defaultProps = {
  items: [],
  delimiter: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ListOfClickableStrings);
