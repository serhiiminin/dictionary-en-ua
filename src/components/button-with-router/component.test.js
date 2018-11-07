import React from "react";
import { mount } from "enzyme";
import ButtonWithRouter from "./component";

describe("Button with Router", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ButtonWithRouter to="/anywhere" title="anything" />);
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
