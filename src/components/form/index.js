import React, { Component } from 'react';
import { TextField, Button } from '../../mui-components';

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
          <TextField
            placeholder="Russian"
            value={ru}
            onChange={e => this.handleOnChange(e, 'ru')}
          />
        </div>
        <div>
          <TextField
            placeholder="English"
            value={en}
            onChange={e => this.handleOnChange(e, 'en')}
          />
        </div>

        <div>
          <TextField
            placeholder="Transcription"
            value={transcription}
            onChange={e => this.handleOnChange(e, 'transcription')}
          />
        </div>
        <div>
          <TextField
            placeholder="Example"
            value={example}
            onChange={e => this.handleOnChange(e, 'example')}
          />
        </div>
        <Button type="submit">Add word</Button>
      </form>
    );
  }
}

export default Form;
