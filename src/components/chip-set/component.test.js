import React from "react";
import { mount, shallow } from "enzyme";
import muiTheme from "../../root/mui-theme";
import ChipSet, { ChipSetList, StyledChip } from ".";

describe("Chip set list", () => {
  test("render", () => {
    const wrapper = mount(<ChipSetList theme={muiTheme}>Text</ChipSetList>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("StyledChip", () => {
  let wrapper;
  const id = "id";
  const value = "value";

  beforeEach(() => {
    wrapper = mount(<StyledChip theme={muiTheme} label={value} />);
  });

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("disabled", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  test("onDelete", () => {
    const onDelete = jest.fn();
    const onDeleteHandler = jest.fn(() => onDelete(id));
    wrapper.setProps({ onDelete: onDeleteHandler });
    wrapper.find("svg").simulate("click");
    expect(onDelete).toBeCalledWith(id);
  });
});

describe("Chip set", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ChipSet
        theme={muiTheme}
        items={[
          {
            value: "one",
            id: "1"
          }
        ]}
        onRemoveItem={() => {}}
      >
        Text
      </ChipSet>
    );
  });

  test("render button", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("disabled", () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });
});
