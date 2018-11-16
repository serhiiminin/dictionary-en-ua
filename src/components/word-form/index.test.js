import React from "react";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../__test-helpers__/enzyme";
import WordForm from ".";

describe("WordForm", () => {
  let wrapper;
  const word = {
    _id: "1",
    synonyms: [{ id: "34", value: "day" }],
    partOfSpeech: [{ id: "55", value: "noun" }]
  }; 

  beforeEach(() => {
    wrapper = mountWithTheme(
      <WordForm
        checkIsLoading={() => {}}
        onSubmit={() => {}}
        word={word}
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
    wrapper.instance().handleFieldChange("en", "value");
    wrapper.instance().handleRemoveItemFromArray("synonyms", "1");
    wrapper.instance().handleAddItemToArray("synonyms", "value");
    wrapper.instance().onResetForm();
    wrapper
      .instance()
      .handleOnChangeMultipleInputs("synonyms", "34", "evening");
  });

  test("simulate handleFieldChange", () => {
    const mockedEvent = { target: { value: "day" } };
    const spy = jest.spyOn(wrapper.instance(), "handleFieldChange");

    wrapper.find('input').at(0).simulate("change", mockedEvent);
    wrapper.find('input').at(1).simulate("change", mockedEvent);
    wrapper.find('input').at(2).simulate("change", mockedEvent);
    expect(spy).toBeCalledTimes(3);
  });

  test("simulate onSubmit", () => {
    const onSubmit = jest.fn();
    wrapper.setProps({ onSubmit })

    wrapper.find('button[title="Save"]').simulate("click");
    expect(onSubmit).toBeCalledWith(word);
  });
});

