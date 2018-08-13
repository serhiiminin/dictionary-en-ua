import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const ExamplesListItem = ({ example, classes, pushWordToInput }) => (
  <li className={classes.exampleItem}>
    {example.split(' ')
      .map(word => (
        <a
          className={classes.exampleItemWord}
          href={word}
          key={uuid()}
          onClick={e => { e.preventDefault(); pushWordToInput(word)}}
        >{word}
        </a>
      ))}
  </li>
);

ExamplesListItem.propTypes = {
  classes: classesShape.isRequired,
  pushWordToInput: PropTypes.func.isRequired,
  example: PropTypes.string,
};

ExamplesListItem.defaultProps = {
  example: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ExamplesListItem);
