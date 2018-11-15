import React, { Component } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import { TextField, Button } from "..";

export const InputsBlockWrapper = styled.div`
  display: grid;
  row-gap: 1em;
  margin-bottom: 10px;
  padding: 10px;
  border: ${props => `1px solid ${props.theme.palette.primary.light}`};
  border-radius: ${props => props.theme.main.borderRadius.small};
`;

export const TopLine = styled.div`
  display: grid;
  padding: 5px 0;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
`;

export const BlockTitle = styled.h3`
  margin: 0;
`;

export const BlockItems = styled.div`
  min-height: 2em;
`;
class InputsBlock extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    onAddItem: PropTypes.func
  };

  static defaultProps = {
    title: null,
    onAddItem: () => {},
    control: false
  };

  state = {
    input: ""
  };

  handleOnChange = event => this.setState({ input: event.target.value });

  handleOnAddItem = () => {
    this.props.onAddItem(this.state.input);
    this.setState({ input: "" });
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
      <InputsBlockWrapper>
        <TopLine>
          <BlockTitle>{title}</BlockTitle>
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
        </TopLine>
        <BlockItems>{children}</BlockItems>
      </InputsBlockWrapper>
    );
  }
}

export default InputsBlock;
