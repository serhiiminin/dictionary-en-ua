import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, LinearProgress } from '@material-ui/core';
import uuid from 'uuid';
import { TextField, Button } from '../../components-mui';
import { MultipleInputs, InputsBlock, ChipSet, SelectWithOptions } from '..';
import loadingNames from '../../constants/loading-names';

class WordForm extends Component {
  static propTypes = {
    checkIsLoading: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    word: PropTypes.shape({
      _id: PropTypes.string,
      en: PropTypes.string,
      ua: PropTypes.string,
      transcription: PropTypes.string,
      partOfSpeech: PropTypes.arrayOf(PropTypes.object),
      synonyms: PropTypes.arrayOf(PropTypes.object),
      examples: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  static defaultProps = {
    word: {},
  };

  state = {
    word: {
      en: '',
      ua: '',
      transcription: '',
      partOfSpeech: [],
      examples: [],
      synonyms: [],
    }
  };

  static getDerivedStateFromProps = (nextProps, prevState) =>
    prevState.word && prevState.word._id !== nextProps.word._id
      ? { word: nextProps.word }
      : null;

  handleFieldChange = newData => this.setState(prevState => ({
    word: { ...prevState.word, ...newData }
  }));

  handleRemoveItemFromArray = fieldKey => id =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [fieldKey]: prevState.word[fieldKey].filter(item => item.id !== id)
      }
    }));

  handleAddItemToArray = fieldKey => value =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [fieldKey]: [{ id: uuid(), value }, ...prevState.word[fieldKey]],
      }
    }));

  handleOnChangeMultipleInputs = field => (id, value) =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [field]: prevState.word[field]
          .map(item => item.id === id
            ? { ...item, value, }
            : item),
      }
    }));

  render() {
    const { onSubmit, checkIsLoading } = this.props;
    const { word } = this.state;
    const { en, ua, transcription, examples, partOfSpeech, synonyms } = word;
    const loading = checkIsLoading(loadingNames.fetchWord, loadingNames.saveWord);
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
    ].filter(option =>
      !this.state.word.partOfSpeech
        .map(part => part.value)
        .includes(option.key));

    return (
      <form onSubmit={onSubmit}>
        <Fade in={loading}>
          <LinearProgress color='secondary'/>
        </Fade>
        <InputsBlock title="Main information">
          <TextField
            label="English"
            value={en}
            onChange={({ target }) => this.handleFieldChange({ en: target.value })}
          />
          <TextField
            label="Ukrainian"
            value={ua}
            onChange={({ target }) => this.handleFieldChange({ ua: target.value })}
          />
          <TextField
            label="Transcription"
            value={transcription}
            onChange={({ target }) => this.handleFieldChange({ transcription: target.value })}
          />
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('partOfSpeech')}
          title="Parts of speech"
          control={(
            <SelectWithOptions
              value={freePartsOfSpeech[0] ? freePartsOfSpeech[0].key : ''}
              label='Parts of speech'
              onChange={event => this.handleAddItemToArray('partOfSpeech')(event.target.value)}
              options={freePartsOfSpeech}
            />
          )}
        >
          <ChipSet
            items={partOfSpeech}
            onRemoveItem={this.handleRemoveItemFromArray('partOfSpeech')}
          />
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('synonyms')}
          title="Synonyms"
          control
        >
          <ChipSet
            items={synonyms}
            onRemoveItem={this.handleRemoveItemFromArray('synonyms')}
          />
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('examples')}
          title="Examples"
          control
        >
          <MultipleInputs
            items={examples}
            placeholder='Example'
            onChange={this.handleOnChangeMultipleInputs('examples')}
            onRemoveItem={this.handleRemoveItemFromArray('examples')}
          />
        </InputsBlock>
        <Button
          onClick={() => onSubmit(word)}
          variant='outlined'
          color='primary'
          title='Save'
        >
          Save
        </Button>
      </form>
    );
  }
}

export default WordForm;
