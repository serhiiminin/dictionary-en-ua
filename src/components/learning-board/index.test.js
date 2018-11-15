import React from "react";
import { shallow } from "enzyme";
import LearningBoard from ".";
import muiTheme from "../../root/mui-theme";

describe("LearningBoard", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <LearningBoard
        theme={muiTheme}
        onCheckAnswer={() => {}}
        onGiveAHint={() => {}}
        onKnownWord={() => {}}
        onForgottenWord={() => {}}
        onOptionChange={() => {}}
      >
        anything
      </LearningBoard>
    );
  });
  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("loading", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });
  test("times learnt is more then 1", () => {
    wrapper.setProps({ timesLearnt: 2 });
    expect(wrapper).toMatchSnapshot();
  });
});
