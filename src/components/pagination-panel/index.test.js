import React from "react";
import { mount } from 'enzyme';
import muiTheme from "../../root/mui-theme";
import PaginationPanel from "./component";

describe("Pagination panel", () => {
  test("render", () => {
    const wrapper = mount(
      <PaginationPanel onChangeCount={() => {}} onChangePage={() => {}}>
        children
      </PaginationPanel>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});
