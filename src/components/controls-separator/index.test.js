import React from "react";
import { shallow, mount } from "enzyme";
import muiTheme from "../../root/mui-theme";
import ControlsSeparator, { SeparatorWrapper } from ".";

describe("Separator Wrapper", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <SeparatorWrapper theme={muiTheme}>
        <button type="button">anything</button>
        <button type="button">everything</button>
      </SeparatorWrapper>
    );
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("align right", () => {
    wrapper.setProps({ align: "right" });
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Controls separator", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(
      <ControlsSeparator>
        <button type="button">anything</button>
        <button type="button">everything</button>
      </ControlsSeparator>
    );
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("align right", () => {
    wrapper.setProps({ align: "right" });
    expect(wrapper).toMatchSnapshot();
  });
});
