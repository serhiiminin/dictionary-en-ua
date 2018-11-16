import React from "react";
import { shallow, mount } from "enzyme";
import muiTheme from "../../root/mui-theme";
import CloseButton, { StyledButton } from ".";

describe("Styled Button", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<StyledButton theme={muiTheme} type="button" />);
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("onClick", () => {
    const onClick = jest.fn();
    wrapper.setProps({ onClick });
    wrapper.simulate("click");
    expect(onClick).toBeCalled();
  });
});

describe("Close Button", () => {
  test("render", () => {
    const wrapper = shallow(
      <CloseButton theme={muiTheme}>
        <i>Icon</i>
      </CloseButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
