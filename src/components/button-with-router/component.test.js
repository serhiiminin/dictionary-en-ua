import React from "react";
import { shallow } from "enzyme";
import ButtonWithRouter from "./component";

describe("Button with Router", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ButtonWithRouter to="/anywhere" title="anything" />);
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
