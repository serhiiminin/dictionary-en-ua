import React from "react";
import { shallow } from "enzyme";
import { mountWithTheme } from '../../helpers/enzyme';
import muiTheme from "../../root/mui-theme";
import MultipleInputs, { MultipleInputsWrapper } from ".";

describe("Multiple Inputs Wrapper", () => {
  test("render", () => {
    const wrapper = shallow(
      <MultipleInputsWrapper theme={muiTheme}>text</MultipleInputsWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Multiple Inputs", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(
      <MultipleInputs onRemoveItem={() => {}} onChange={() => {}}>
        text
      </MultipleInputs>,
      muiTheme
    );
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("disabled", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  test("render with one item and check methods", () => {
    wrapper.setProps({
      items: [
        {
          id: "1",
          value: "1"
        }
      ]
    });
    expect(wrapper.children().length).toBe(1);

    const input = wrapper.find("input");
    const onChange = jest.fn();
    wrapper.setProps({ onChange });
    input.simulate("change");
    expect(onChange).toHaveBeenCalled();

    const button = wrapper.find("button");
    const onRemoveItem = jest.fn();
    wrapper.setProps({ onRemoveItem });
    button.simulate("click");
    expect(onRemoveItem).toHaveBeenCalled();
  });
});
