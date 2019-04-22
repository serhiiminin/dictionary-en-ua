import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { TextField } from '..';

class InputsBlock extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    onAddItem: PropTypes.func,
  };

  static defaultProps = {
    title: null,
    onAddItem: () => {},
    control: false,
  };

  state = {
    input: '',
  };

  handleOnChange = event => this.setState({ input: event.target.value });

  handleOnAddItem = () => {
    const { onAddItem } = this.props;
    const { input } = this.state;
    onAddItem(input);
    this.setState({ input: '' });
  };

  handleEnterPress = event => {
    if (event.which === 13) {
      this.handleOnAddItem();
    }
  };

  render() {
    const { input } = this.state;
    const { children, title, control } = this.props;

    return (
      <div>
        <div>
          <h3>{title}</h3>
          <div>
            {control && control === true ? (
              <TextField
                placeholder="Add new option"
                value={input}
                onChange={event => this.handleOnChange(event)}
                onKeyPress={this.handleEnterPress}
                control={
                  <Button onClick={this.handleOnAddItem} title="Add new option" disabled={!input} mini>
                    <Add />
                  </Button>
                }
              />
            ) : (
              control
            )}
          </div>
        </div>
        <div>{children}</div>
      </div>
    );
  }
}

export default InputsBlock;
