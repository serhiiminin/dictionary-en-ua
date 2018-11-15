import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import SearchableWord, { SearchableWordLink } from ".";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../__test-helpers__/enzyme";

describe("Searchable Word components", () => {
  test("render", () => {
    const wrapper = mountWithTheme(
      <Router>
        <SearchableWordLink word="word" />
      </Router>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Searchable Word", () => {
  test("render", () => {
    const wrapper = shallow(<SearchableWord word="word" />);
    expect(wrapper).toMatchSnapshot();
  });
});
