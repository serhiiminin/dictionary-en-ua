import React, { Component } from 'react';
import { Fade, LinearProgress } from '@material-ui/core';
import uuid from 'uuid';
import { TextField } from '../../components-mui';
import { MultipleInputs, InputsBlock, ChipSet } from '..';
import loadingNames from '../../constants/loading-names';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';


class WordForm extends Component {
  static propTypes = {
    currentLoadingNames: loadingNamesShape,
  };

  static defaultProps = {
    currentLoadingNames: loadingNamesInitialState,
  };

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

  handleAddItemToArray = fieldKey => value =>
    this.setState(prevState => ({
      word: {
        ...prevState.word,
        [fieldKey]: [...prevState.word[fieldKey], { id: uuid(), value }]
      }
    }));

  render() {
    const { currentLoadingNames } = this.props;
    const { word } = this.state;
    const { en, ua, transcription, examples, partOfSpeech, synonyms } = word;
    const loading = currentLoadingNames.includes(loadingNames.editWord);

    return (
      <form>
        <Fade in={loading}>
          <LinearProgress color='secondary' />
        </Fade>
        <InputsBlock title="Main information">
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
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('partOfSpeech')}
          title="Parts of speech"
          controlled
        >
          <ChipSet
            items={partOfSpeech}
            onRemoveItem={this.handleRemoveItemFromArray('partOfSpeech')}
          />
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('synonyms')}
          title="Synonyms"
          controlled
        >
          <ChipSet
            items={synonyms}
            onRemoveItem={this.handleRemoveItemFromArray('synonyms')}
          />
        </InputsBlock>
        <InputsBlock
          onAddItem={this.handleAddItemToArray('examples')}
          title="Examples"
          controlled
        >
          <MultipleInputs
            items={examples}
            placeholder='Example'
            onRemoveItem={this.handleRemoveItemFromArray('examples')}
          />
        </InputsBlock>
      </form>
    );
  }
}

export default WordForm;
