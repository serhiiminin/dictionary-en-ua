import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import mockRouterProps from "../../__test-helpers__/react-router";
import WordTable from "./component";

describe("WordForm", () => {
  let wrapper;
  const wordsList = [{ _id: "1" }, { _id: "2" }];
  beforeEach(() => {
    wrapper = mount(
      <Router
        initialEntries={["/one", "/two", { pathname: "/three" }]}
        initialIndex={1}
      >
        <WordTable
          wordsList={wordsList}
          wordsCount={2}
          history={mockRouterProps.history}
          location={mockRouterProps.location}
          getWordsSearchParams={() => ({
            countPerPage: 5,
            sortBy: "dateCreated",
            sortDirection: "ascend",
            page: 1
          })}
          deleteWord={() => {}}
          checkIsLoading={() => {}}
        >
          Anything
        </WordTable>
      </Router>
    );
  });
  test("render", () => {
    expect(wrapper).toEqual({});
  });
});
