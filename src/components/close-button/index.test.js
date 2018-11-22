import React from "react";
import { shallow} from "enzyme";
import CloseButton from ".";

describe("Close Button", () => {
  test("render", () => {
    const wrapper = shallow(
      <CloseButton>
        <i>Icon</i>
      </CloseButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
