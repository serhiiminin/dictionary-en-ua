import React from "react";
import { shallow } from "enzyme";
import { mountWithTheme } from "../../helpers/enzyme";
import muiTheme from "../../root/mui-theme";
import NotificationItem, {
  NotificationItemWrapper,
  TopLine,
  WrapperCloseButton
} from ".";

describe("Notification item styled components", () => {
  test("NotificationItemWrapper", () => {
    const wrapper = mountWithTheme(
      <NotificationItemWrapper>Anything</NotificationItemWrapper>,
      muiTheme
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("TopLine", () => {
    const wrapper = mountWithTheme(<TopLine>Anything</TopLine>, muiTheme);

    expect(wrapper).toMatchSnapshot();
  });

  test("WrapperCloseButton", () => {
    const wrapper = mountWithTheme(
      <WrapperCloseButton>Anything</WrapperCloseButton>,
      muiTheme
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe("Notification item", () => {
  test("render", () => {
    const wrapper = shallow(
      <NotificationItem onClick={() => {}} status="exited" />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
