import React from "react";
import { shallow, mount } from "enzyme";
import muiTheme from "../../root/mui-theme";
import LineExplanation, { LineExplanationWrapper } from ".";

describe("Line explanation wrapper", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineExplanationWrapper theme={muiTheme}>text</LineExplanationWrapper>
    );
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("render with label", () => {
    wrapper.setProps({ label: "label" });
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Line explanation", () => {
  test("render", () => {
    const wrapper = shallow(
      <LineExplanation label="label" theme={muiTheme}>
        text
      </LineExplanation>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
