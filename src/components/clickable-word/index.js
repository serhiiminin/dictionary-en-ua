import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const ClickableWord = ({ word, onClick, classes }) => (
  <a href="/"
     className={classes.clickableWord}
     onClick={event => {
       event.preventDefault();
       onClick(word);
     }}>
    {word}
  </a>
);

ClickableWord.propTypes = {
  word: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: classesShape.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ClickableWord);
