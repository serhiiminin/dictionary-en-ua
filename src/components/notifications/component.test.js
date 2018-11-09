import React from "react";
import muiTheme from "../../root/mui-theme";
import { mountWithTheme } from "../../helpers/enzyme";
import Notifications, { NotificationsItem } from "./component";

describe("Notifications components", () => {
  test("NotificationsItem", () => {
    const wrapper = mountWithTheme(
      <NotificationsItem>Anything</NotificationsItem>,
      muiTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Notifications components", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
      <Notifications notifications={[]} hideNotification={() => {}}>
        children
      </Notifications>,
      muiTheme
    );
  });
  test("render empty", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("render with one item simulate and to hide", () => {
    const hideNotification = jest.fn();
    wrapper.setProps({
      notifications: [
        {
          id: "id",
          text: "text",
          type: "success"
        }
      ],
      hideNotification
    });
    wrapper.find("button").simulate("click");
    expect(hideNotification).toHaveBeenCalled();
  });
});
