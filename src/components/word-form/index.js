import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Fade, LinearProgress, TextField, Button } from '@material-ui/core';
import { MultipleInputs, InputsBlock, ChipSet, ControlsSeparator, SelectWithOptions } from '..';
import loadingNames from '../../constants/loading-names';
import WORD_INITIAL_VALUES from '../../constants/word-initial-values';

class WordForm extends Component {
  static propTypes = {
    checkIsLoading: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    wordItem: PropTypes.shape({
      _id: PropTypes.string,
      word: PropTypes.string,
      transcription: PropTypes.string,
      partOfSpeech: PropTypes.arrayOf(PropTypes.object),
      synonyms: PropTypes.arrayOf(PropTypes.object),
      examples: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  static defaultProps = {
    wordItem: null,
  };

  state = {
    wordItem: WORD_INITIAL_VALUES,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { _id: nextId } = nextProps.wordItem || {};
    const { _id: prevId } = prevState.wordItem || {};

    return nextId !== prevId ? { wordItem: nextProps.wordItem } : prevState;
  };

  handleFieldChange = (fieldKey, value) =>
    this.setState(prevState => ({
      wordItem: {
        ...prevState.wordItem,
        [fieldKey]: value,
      },
    }));

  handleRemoveItemFromArray = (fieldKey, id) =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [fieldKey]: prevState.word[fieldKey].filter(item => item.id !== id),
      },
    }));

  handleAddItemToArray = (fieldKey, value) =>
    this.setState(prevState => ({
      wordItem: {
        ...prevState.wordItem,
        [fieldKey]: [{ id: uuid(), value }, ...prevState.wordItem[fieldKey]],
      },
    }));

  handleOnChangeMultipleInputs = (fieldKey, id, value) =>
    this.setState(prevState => ({
      wordItem: {
        ...prevState.wordItem,
        [fieldKey]: prevState.wordItem[fieldKey].map(item => (item.id === id ? { ...item, value } : item)),
      },
    }));

  onResetForm = () => {
    const { wordItem } = this.props;

    return this.setState({ wordItem });
  };

  render() {
    const { onSubmit, checkIsLoading } = this.props;
    const { wordItem } = this.state;
    const { word, transcription, examples, partOfSpeech, synonyms } = wordItem;
    const loading = checkIsLoading(loadingNames.words.fetch, loadingNames.words.save);
    const freePartsOfSpeech = [
      { key: 'noun', title: 'Noun' },
      { key: 'pronoun', title: 'Pronoun' },
      { key: 'verb', title: 'Verb' },
      { key: 'adjective', title: 'Adjective' },
      { key: 'adverb', title: 'Adverb' },
      { key: 'preposition', title: 'Preposition' },
      { key: 'conjunction', title: 'Conjunction' },
      { key: 'interjection', title: 'Interjection' },
      { key: 'article', title: 'Article' },
      { key: 'determiner', title: 'Determiner' },
    ].filter(option => !(partOfSpeech && partOfSpeech.map(part => part.value).includes(option.key)));
    return (
      <form onSubmit={onSubmit}>
        <Fade in={loading}>
          <LinearProgress color="secondary" />
        </Fade>
        <InputsBlock title="Main information">
          <TextField
            label="Word"
            value={word}
            onChange={event => this.handleFieldChange('word', event.target.value)}
            disabled={loading}
          />
          <TextField
            label="Transcription"
            value={transcription}
            onChange={event => this.handleFieldChange('transcription', event.target.value)}
            disabled={loading}
          />
        </InputsBlock>
        <InputsBlock
          title="Parts of speech"
          control={
            <SelectWithOptions
              value={freePartsOfSpeech[0] ? freePartsOfSpeech[0].key : ''}
              label="Parts of speech"
              onChange={event => this.handleAddItemToArray('partOfSpeech', event.target.value)}
              options={freePartsOfSpeech}
              disabled={loading}
            />
          }
        >
          <ChipSet
            items={partOfSpeech}
            onRemoveItem={id => this.handleRemoveItemFromArray('partOfSpeech', id)}
            disabled={loading}
          />
        </InputsBlock>
        <InputsBlock onAddItem={value => this.handleAddItemToArray('synonyms', value)} title="Synonyms" control>
          <ChipSet
            items={synonyms}
            onRemoveItem={id => this.handleRemoveItemFromArray('synonyms', id)}
            disabled={loading}
          />
        </InputsBlock>
        <InputsBlock onAddItem={value => this.handleAddItemToArray('examples', value)} title="Examples" control>
          <MultipleInputs
            items={examples}
            placeholder="Example"
            onChange={(id, value) => this.handleOnChangeMultipleInputs('examples', id, value)}
            onRemoveItem={id => this.handleRemoveItemFromArray('examples', id)}
            disabled={loading}
          />
        </InputsBlock>
        <ControlsSeparator align="right">
          <Button onClick={this.onResetForm} disabled={loading} variant="contained" color="primary" title="Reset">
            Reset changes
          </Button>
          <Button
            onClick={() => onSubmit(wordItem)}
            disabled={loading}
            variant="contained"
            color="primary"
            title="Save"
          >
            Save
          </Button>
        </ControlsSeparator>
      </form>
    );
  }
}

export default WordForm;
