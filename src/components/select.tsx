import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

interface Item {
  value: string;
  title: string;
}

interface Props {
  items: Item[];
  urlValue: string;
  onChange(value: string): void;
}

const SelectWithItems = ({ items, urlValue, onChange }: Props): JSX.Element => {
  // React.ChangeEvent<HTMLSelectElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (event: any): void => {
    onChange(event.target.value);
  };

  return (
    <Select value={urlValue} onChange={handleOnChange}>
      {items.map(
        ({ value, title }): JSX.Element => (
          <MenuItem key={value} value={value}>
            {title}
          </MenuItem>
        )
      )}
    </Select>
  );
};

export default SelectWithItems;
