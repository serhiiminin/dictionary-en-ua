import React from "react";
import { shallow } from "enzyme";
import Header from "./component";

describe("Header", () => {
  test("render", () => {
    const wrapper = shallow(<Header >anything</Header>);
    expect(wrapper).toMatchSnapshot();
  });
});
