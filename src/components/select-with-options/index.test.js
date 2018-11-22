import React from "react";
import { mount } from "enzyme";
import SelectWithOptions from "./component";

describe("SelectWithOptions", () => {
  test("render with no options", () => {
    const wrapper = mount(
      <SelectWithOptions
        onChange={() => {}}
        options={[]}
        value=""
      >
        children
      </SelectWithOptions>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
