import React from "react";
import { mount } from 'enzyme';
import muiTheme from "../../root/mui-theme";
import Notifications from "./component";

describe("Notifications components", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
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
