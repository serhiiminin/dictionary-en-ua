import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../__test-helpers__/enzyme";
import WordPreview, { mapValues } from ".";

describe("mapValues", () => {
  test("correct data", () => {
    const arr = [{ id: "1", value: "text" }];
    expect(mapValues(arr)).toEqual(["text"]);
  });
});

describe("WordForm", () => {
  let wrapper;
  const word = {
    _id: "1",
    transcription: 'transcription',
    synonyms: [{ id: "34", value: "day" }],
    partOfSpeech: [{ id: "55", value: "noun" }],
    examples: [{ id: "8", value: "example" }]
  };

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Router>
        <WordPreview word={word}>Anything</WordPreview>
      </Router>,
      muiTheme
    );
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
