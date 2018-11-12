import React from "react";
import { mount, shallow } from "enzyme";
import InputsBlock, {
  InputsBlockWrapper,
  TopLine,
  BlockTitle,
  BlockItems
} from ".";
import { mountWithTheme } from "../../helpers/enzyme";
import muiTheme from "../../root/mui-theme";

describe("Inputs block (sub-components)", () => {
  test("InputsBlockWrapper", () => {
    const wrapper = mount(
      <InputsBlockWrapper theme={muiTheme}>anything</InputsBlockWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("TopLine", () => {
    const wrapper = shallow(<TopLine theme={muiTheme}>anything</TopLine>);
    expect(wrapper).toMatchSnapshot();
  });

  test("BlockTitle", () => {
    const wrapper = shallow(<BlockTitle theme={muiTheme}>anything</BlockTitle>);
    expect(wrapper).toMatchSnapshot();
  });

  test("BlockItems", () => {
    const wrapper = mount(<BlockItems theme={muiTheme}>anything</BlockItems>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Inputs block", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithTheme(<InputsBlock>anything</InputsBlock>, muiTheme);
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
