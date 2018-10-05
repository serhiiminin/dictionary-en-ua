import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListOfClickableStrings } from '..';

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
  foundWord: PropTypes.shape({
    examples: PropTypes.arrayOf(PropTypes.shape({
      example: PropTypes.string,
      id: PropTypes.string.isRequired,
    })),
  }),
  pushTextToInput: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

FoundWordExamples.defaultProps = {
  foundWord: {},
  classes: {},
};

export default FoundWordExamples;
