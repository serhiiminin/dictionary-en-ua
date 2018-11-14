import React from "react";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../helpers/enzyme";
import WordForm from ".";

describe("WordForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
      <WordForm
        checkIsLoading={() => {}}
        onSubmit={() => {}}
        word={{
          _id: "1",
          synonyms: [{ id: "34", value: "day" }],
          partOfSpeech: [{ id: "55", value: "noun" }]
        }}
      >
        Anything
      </WordForm>,
      muiTheme
    );
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("class methods", () => {
    wrapper.instance().handleFieldChange("en", 'value');
    wrapper.instance().handleRemoveItemFromArray("synonyms", "1");
    wrapper.instance().handleAddItemToArray("synonyms", "value");
    wrapper
      .instance()
      .handleOnChangeMultipleInputs("synonyms", "34", "evening");
  });

  test("select part of speech", () => {
    const mockedEvent = { target: { value: "day" } };
    const spy = jest.spyOn(wrapper.instance(), "handleAddItemToArray");
    wrapper
      .find('SelectWithOptions[label="Parts of speech"]')
      .simulate("change", mockedEvent);
    expect(spy).toHaveBeenCalled();
  });
});
