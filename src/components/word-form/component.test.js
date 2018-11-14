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
    wrapper.instance().handleFieldChange({ en: "en" });
    wrapper.instance().handleRemoveItemFromArray("synonyms")("1");
    wrapper.instance().handleAddItemToArray("synonyms")("evening");
    wrapper.instance().handleOnChangeMultipleInputs("synonyms")(
      "34",
      "evening"
    );
  });

  test("change English input", () => {
    const mockedEvent = { target: { value: "day" } };
    const spy = jest.spyOn(wrapper.instance(), "handleFieldChange");
    wrapper.find('[label="English"]').simulate("change", mockedEvent);
    expect(spy).toHaveBeenCalled();
  });
});
