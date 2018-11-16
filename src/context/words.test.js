import React from "react";
import { shallow } from "enzyme";
import { withWords } from "./words";

describe("WordsProvider HOC", () => {
  test("withWords", () => {
    const Cmp = withWords(() => <div>Anything</div>);
    
    const wrapper = shallow(<Cmp />);
    expect(wrapper).not.toBe(null);
  });
});
