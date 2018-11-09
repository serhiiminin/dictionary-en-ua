import React from "react";
import { shallow, mount } from "enzyme";
import muiTheme from "../../root/mui-theme";
import LineExplanation, { LineExplanationWrapper } from ".";

describe("Line explanation wrapper", () => {
  test("render", () => {
    const wrapper = mount(
      <LineExplanationWrapper label="label" theme={muiTheme}>text</LineExplanationWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Line explanation", () => {
  test("render", () => {
    const wrapper = shallow(
      <LineExplanation label="label" theme={muiTheme}>text</LineExplanation>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
