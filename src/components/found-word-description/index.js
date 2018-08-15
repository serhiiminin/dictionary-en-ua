import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { LineExplanation, ListOfClickableStrings } from '..';
import { foundWordInitialState } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const FoundWordDescription = ({ foundWord, pushTextToInput, classes }) => {
  const { en, ru, transcription, partOfSpeech, antonyms, synonyms, similarTo } = foundWord;

  return (
    <div className={classes.foundWordDescription}>
      {!Object.keys(foundWord).length
        ? <div className={classes.emptyDescription}>Here will be detailed description</div>
        : (
          <div>
            <LineExplanation label='Part of speech'>
              {partOfSpeech && partOfSpeech.join(', ')}
            </LineExplanation>
            <LineExplanation label='English'>{en}</LineExplanation>
            <LineExplanation label='Russian'>{ru}</LineExplanation>
            <LineExplanation label='Transcription'>{transcription}</LineExplanation>
            <LineExplanation label='Synonyms'>
              <ListOfClickableStrings
                items={synonyms}
                onClick={pushTextToInput}
                delimiter=','
              />
            </LineExplanation>
            <LineExplanation label='Antonyms'>
              <ListOfClickableStrings
                items={antonyms}
                onClick={pushTextToInput}
                delimiter=','
              />
            </LineExplanation>
            <LineExplanation label='Similar to'>
              <ListOfClickableStrings
                items={similarTo}
                onClick={pushTextToInput}
                delimiter=','
              />
            </LineExplanation>
          </div>
        )}
    </div>
  )
};

FoundWordDescription.propTypes = {
  foundWord: foundWordShape,
  pushTextToInput: PropTypes.func.isRequired,
  classes: classesShape.isRequired
};

FoundWordDescription.defaultProps = {
  foundWord: foundWordInitialState,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(FoundWordDescription);
