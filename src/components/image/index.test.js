import React from "react";
import { mount } from "enzyme";
import Image, { ImageWrapper } from ".";
import muiTheme from "../../root/mui-theme";

describe("ImageWrapper", () => {
  test("render", () => {
    const wrapper = mount(
      <ImageWrapper theme={muiTheme}>anything</ImageWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("HeaderNavigation", () => {
  test("render", () => {
    const wrapper = mount(
      <Image theme={muiTheme} src="src" width="300" height="200">
        anything
      </Image>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
