import React from "react";
import { shallow } from "enzyme";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../helpers/enzyme";
import Toolbar, { ToolbarButtonsWrapper } from ".";

describe("Toolbar components", () => {
  test("ToolbarButtonsWrapper", () => {
    const wrapper = shallow(
      <ToolbarButtonsWrapper>anything</ToolbarButtonsWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Toolbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Toolbar onChangeSortBy={() => {}} onChangeSortDirection={() => {}}>
        <div className='test-example'>anything</div>
      </Toolbar>,
      muiTheme
    );
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("isAnyChecked = true", () => {
    wrapper.setProps({ isAnyChecked: true });
    expect(wrapper.exists('.test-example')).toBeTruthy();
  });
  test("sortDirection = descend", () => {
    wrapper.setProps({ sortDirection: 'descend' })
    expect(wrapper.exists('KeyboardArrowDown')).toBeTruthy();
  });
});
