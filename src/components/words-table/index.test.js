import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme, shallowWithTheme } from "../../__test-helpers__/enzyme";
import mockRouterProps from "../../__test-helpers__/react-router";
import WordTable, { WordsListWrapper } from "./component";

describe("WordTable components", () => {
  test("WordsListWrapper", () => {
    const wrapper = shallowWithTheme(
      <WordsListWrapper>Anything</WordsListWrapper>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("WordForm", () => {
  let wrapper;
  const wordsList = [
    { _id: '1' },
    { _id: '2' },
  ];
  beforeEach(() => {
    wrapper = mountWithTheme(
      <Router
        initialEntries={["/one", "/two", { pathname: "/three" }]}
        initialIndex={1}
      >
        <WordTable
          wordsList={wordsList}
          wordsCount={2}
          history={mockRouterProps.history}
          location={mockRouterProps.location}
          getWordsSearchParams={() => ({ countPerPage: 5, sortBy: 'dateCreated', sortDirection: 'ascend', page: 1})}
          deleteWord={() => {}}
          checkIsLoading={() => {}}
        >
          Anything
        </WordTable>
      </Router>,
      muiTheme
    );
  });
  test("render", () => {
    expect(wrapper).toEqual({});
  });
});
