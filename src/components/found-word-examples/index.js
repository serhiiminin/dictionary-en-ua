import React, { Fragment } from 'react';
import PropsTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { foundWordInitialState } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';
import { ListOfClickableStrings } from '..';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const FoundWordExamples = ({ foundWord, pushTextToInput, classes }) => {
  const { examples } = foundWord;

  return (
    <Fragment>
      <h3 className={classes.examplesTitle}>Examples:</h3>
      <div>
        {examples && examples.length > 0
          ? examples.map(({ example, id }) => (
            <div className={classes.exampleItem} key={id}>
              <ListOfClickableStrings
                items={example && example.split(' ')}
                onClick={pushTextToInput}
              />
            </div>
          ))
          : <div className={classes.noResults}>No results</div>
        }
      </div>
    </Fragment>
  );
};

FoundWordExamples.propTypes = {
  foundWord: foundWordShape,
  pushTextToInput: PropsTypes.func.isRequired,
  classes: classesShape,
};

FoundWordExamples.defaultProps = {
  foundWord: foundWordInitialState,
  classes: classesDefaultProps,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(FoundWordExamples);
