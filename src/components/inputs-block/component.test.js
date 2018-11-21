import React from "react";
import { mount } from "enzyme";
import InputsBlock from "./component";
import muiTheme from "../../root/mui-theme";

describe("Inputs block", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<InputsBlock>anything</InputsBlock>, muiTheme);
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("render with control", () => {
    wrapper.setProps({ control: true });
    expect(wrapper).toMatchSnapshot();
  });
  test("class methods", () => {
    wrapper.instance().handleOnChange({ target: { value: "hello" } });
    wrapper.setProps({ onAddItem: () => {} });
    wrapper.instance().handleOnAddItem();
    wrapper.instance().handleEnterPress({ which: 13 });
    wrapper.setProps({ onAddItem: () => {} });
  });

  test("invoke handleOnChange when TextInput was changed", () => {
    wrapper.setProps({ control: true });
    const spy = jest.spyOn(wrapper.instance(), 'handleOnChange');
    wrapper.find('input').simulate('change');
    expect(spy).toHaveBeenCalled();
  });

});
