import React, { Component } from 'react';
import { api } from '../../api/fetcher';

class Form extends Component {
  state = {
    en: '',
    ru: '',
    transcription: '',
    example: '',
  };

  handleOnChange = (event, field) => {
    const { value } = event.target;
    this.setState({ [field]: value });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    api.addWord(this.state)
      .then(() => api.getWordsList())
      .then(() => {
        const prevState = { ...this.state };
        const newState = Object.assign({},
          ...Object.entries(prevState)
            .map(([key]) => ({ [key]: '' }))
        );
        this.setState({ ...newState });
      })

      .catch(error => console.log(error));
  };

  render() {
    const { en, ru, transcription, example } = this.state;
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input type="text" placeholder='English' value={en} onChange={e => this.handleOnChange(e, 'en')}/>
        <input type="text" placeholder='Russian' value={ru} onChange={e => this.handleOnChange(e, 'ru')}/>
        <input type="text" placeholder='Transcription' value={transcription}
               onChange={e => this.handleOnChange(e, 'transcription')}/>
        <input type="text" placeholder='Example' value={example} onChange={e => this.handleOnChange(e, 'example')}/>
        <input type="submit" value="Add Word"/>
      </form>
    );
  }
}

export { Form };
