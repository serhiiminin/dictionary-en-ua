import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { TextField, Button } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

class InputsBlock extends Component {
  static propTypes = {
    classes: composeClassesPropTypes(styles),
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    onAddItem: PropTypes.func,
  };

  static defaultProps = {
    classes: {},
    title: null,
    onAddItem: () => {},
    control: false,
  };

  state = {
    input: '',
  };

  handleOnChange = event => this.setState({ input: event.target.value });

  handleOnAddItem = () => {
    this.props.onAddItem(this.state.input);
    this.setState({ input: '' });
  };

  handleEnterPress = event => {
    if (event.which === 13) {
      this.handleOnAddItem();
    }
  };

  render() {
    const { input } = this.state;
    const { children, title, control, classes } = this.props;

    return (
      <div className={classes.inputsBlock}>
        <div className={classes.topLine}>
          <h3 className={classes.blockTitle}>{title}</h3>
          <div>
            {control && control === true ? (
              <TextField
                placeholder="Add new option"
                value={input}
                onChange={event => this.handleOnChange(event)}
                onKeyPress={this.handleEnterPress}
                control={
                  <Button
                    onClick={this.handleOnAddItem}
                    title="Add new option"
                    disabled={!input}
                    mini
                  >
                    <AddIcon />
                  </Button>
                }
              />
            ) : (
              control
            )}
          </div>
        </div>
        <div className={classes.blockItems}>{children}</div>
      </div>
    );
  }
}

export default InputsBlock;
