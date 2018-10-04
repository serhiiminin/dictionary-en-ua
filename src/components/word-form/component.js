import React, { Component } from 'react';
import uuid from 'uuid';
import { TextField } from '../../components-mui';
import { MultipleInputs, ChipSet } from '..';


class WordForm extends Component {
  state = {
    word: {
      en: '',
      ua: '',
      transcription: '',
      examples: [],
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

  handleAddItemToArray = fieldKey => () =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [fieldKey]: [...prevState.word[fieldKey], { id: uuid(), value: '' }]
      }
    }));

  render() {
    const { word } = this.state;
    const { en, ua, transcription, examples, partOfSpeech, synonyms } = word;

    return (
      <form>
        <TextField
          label="English"
          value={en}
          onChange={({ target }) => this.handleFieldChange({ 'en': target.value })}
        />
        <TextField
          label="Ukrainian"
          value={ua}
          onChange={({ target }) => this.handleFieldChange({ 'ua': target.value })}
        />
        <TextField
          label="Transcription"
          value={transcription}
          onChange={({ target }) => this.handleFieldChange({ 'transcription': target.value })}
        />
        <ChipSet
          items={partOfSpeech}
          blockTitle='Parts of speech'
          onRemoveItem={this.handleRemoveItemFromArray('partOfSpeech')}
          onAddItem={this.handleAddItemToArray('partOfSpeech')}
        />
        <ChipSet
          items={synonyms}
          blockTitle='Synonyms'
          onRemoveItem={this.handleRemoveItemFromArray('synonyms')}
          onAddItem={this.handleAddItemToArray('synonyms')}
        />
        <MultipleInputs
          items={examples}
          label='Example'
          blockTitle='Examples'
          onRemoveItem={this.handleRemoveItemFromArray('examples')}
          onAddItem={this.handleAddItemToArray('examples')}
        />
      </form>
    );
  }
}

export default WordForm;
