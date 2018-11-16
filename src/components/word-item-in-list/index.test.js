import React from "react";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme, shallowWithTheme } from "../../__test-helpers__/enzyme";
import WordItemInList from ".";
import {
  GridWordItemWrapper,
  Description,
  LinkToWords,
  WordTime
} from "./component";

describe("WordItemInList components", () => {
  test("GridWordItemWrapper", () => {
    const wrapper = shallowWithTheme(
      <GridWordItemWrapper>Anything</GridWordItemWrapper>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("GridWordItemWrapper checked", () => {
    const wrapper = shallowWithTheme(
      <GridWordItemWrapper isChecked>Anything</GridWordItemWrapper>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("Description", () => {
    const wrapper = shallowWithTheme(
      <Description>Anything</Description>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("LinkToWords", () => {
    const wrapper = mountWithTheme(
      <Router>
        <LinkToWords to="/">Anything</LinkToWords>
      </Router>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("WordTime", () => {
    const wrapper = shallow(<WordTime>Anything</WordTime>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("WordItemInList", () => {
  const word = {
    _id: '_id',
    en: 'en',
    uk: 'uk',
    transcription: 'transcription',
    dateCreated: '2000-02-02',
    dateLastLearnt: '2000-02-02',
  }
  test("render", () => {
    const wrapper = mountWithTheme(
      <Router>
        <WordItemInList word={word}>Anything</WordItemInList>
      </Router>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("loading", () => {
    const wrapper = mountWithTheme(
      <Router>
        <WordItemInList 
        loading
        word={word}
        >Anything</WordItemInList>
      </Router>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});
