import React, { Component } from 'react';
import { TextFieldMui } from '../../mui-components/text-field';
import { ButtonMui } from '../../mui-components/button';

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

    this.props.addWord({...this.state})
      .then(() => this.props.fetchWords())
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
        <div>
          <TextFieldMui
            placeholder="English"
            value={en}
            onChange={e => this.handleOnChange(e, 'en')}
          />
        </div>
        <div>
          <TextFieldMui
            placeholder="Russian"
            value={ru}
            onChange={e => this.handleOnChange(e, 'ru')}
          />
        </div>
        <div>
          <TextFieldMui
            placeholder="Transcription"
            value={transcription}
            onChange={e => this.handleOnChange(e, 'transcription')}
          />
        </div>
        <div>
          <TextFieldMui
            placeholder="Example"
            value={example}
            onChange={e => this.handleOnChange(e, 'example')}
          />
        </div>
        <ButtonMui type="submit">Add word</ButtonMui>
      </form>
    );
  }
}

export { Form };
