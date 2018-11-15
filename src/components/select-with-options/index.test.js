import React from "react";
import { shallow } from "enzyme";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../__test-helpers__/enzyme";
import SelectWithOptions, { CustomizedSelect } from ".";

describe("SelectWithOptions components", () => {
  test("CustomizedSelect", () => {
    const wrapper = shallow(<CustomizedSelect>Anything</CustomizedSelect>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("SelectWithOptions", () => {
  test("render with no options", () => {
    const wrapper = mountWithTheme(
      <SelectWithOptions
        onChange={() => {}}
        options={[]}
        value=""
      >
        children
      </SelectWithOptions>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});
