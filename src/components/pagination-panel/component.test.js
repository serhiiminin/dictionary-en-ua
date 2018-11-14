import React from "react";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme, shallowWithTheme } from "../../helpers/enzyme";
import PaginationPanel, { PaginationPanelWrapper } from ".";

describe("Pagination panel components", () => {
  test("PaginationPanelWrapper", () => {
    const wrapper = shallowWithTheme(
      <PaginationPanelWrapper>Anything</PaginationPanelWrapper>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Pagination panel", () => {
  test("render", () => {
    const wrapper = mountWithTheme(
      <PaginationPanel onChangeCount={() => {}} onChangePage={() => {}}>
        children
      </PaginationPanel>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});
