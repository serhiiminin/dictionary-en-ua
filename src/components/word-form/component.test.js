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
    wrapper.instance().handleFieldChange("en", "value");
    wrapper.instance().handleRemoveItemFromArray("synonyms", "1");
    wrapper.instance().handleAddItemToArray("synonyms", "value");
    wrapper.instance().onResetForm();
    wrapper
      .instance()
      .handleOnChangeMultipleInputs("synonyms", "34", "evening");
  });

  test("select part of speech", () => {
    const mockedEvent = { target: { value: "day" } };
    const spy = jest.spyOn(wrapper.instance(), "handleFieldChange");

    wrapper.find('input').at(0).simulate("change", mockedEvent);
    wrapper.find('input').at(1).simulate("change", mockedEvent);
    wrapper.find('input').at(2).simulate("change", mockedEvent);
    expect(spy).toBeCalledTimes(3);
  });

  // test("select part of speech", () => {
  //   const mockedEvent = { target: { value: "day" } };
  //   const spy = jest.spyOn(wrapper.instance(), "handleAddItemToArray");
  //   console.log(wrapper.find('SelectWithOptions[label="Parts of speech"]').find('Select').debug());

  //   wrapper
  //     .find('SelectWithOptions[label="Parts of speech"]')
  //     .simulate("click", mockedEvent);
  //   expect(spy).toHaveBeenCalled();
  // });
});
