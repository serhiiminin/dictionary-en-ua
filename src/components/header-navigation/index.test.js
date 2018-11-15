import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderNavigation, { NavigationWrapper } from ".";
import muiTheme from "../../root/mui-theme";

describe("NavigationWrapper", () => {
  test("render", () => {
    const wrapper = shallow(
      <NavigationWrapper theme={muiTheme}>anything</NavigationWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("HeaderNavigation", () => {
  test("render", () => {
    const wrapper = mount(
      <Router>
        <HeaderNavigation theme={muiTheme}>anything</HeaderNavigation>
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
