import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderNavigation from "./component";

describe("HeaderNavigation", () => {
  test("render", () => {
    const wrapper = mount(
      <Router>
        <HeaderNavigation>anything</HeaderNavigation>
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
