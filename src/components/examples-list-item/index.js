import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import uuid from 'uuid';
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
