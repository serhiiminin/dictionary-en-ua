import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow, mount } from "enzyme";
import muiTheme from "../../root/mui-theme";
import Header, { HeaderBlock, StyledRouterLink } from ".";

describe("HeaderBlock", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<HeaderBlock theme={muiTheme}>anything</HeaderBlock>);
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("StyledRouterLink", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <StyledRouterLink theme={muiTheme} to='/'>anything</StyledRouterLink>
      </Router>
    );
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Header", () => {
  test("render", () => {
    const wrapper = shallow(<Header theme={muiTheme}>anything</Header>);
    expect(wrapper).toMatchSnapshot();
  });
});
