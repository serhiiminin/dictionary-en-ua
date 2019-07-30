import React from 'react';
import styled from 'styled-components';
import { Select, MenuItem } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';

interface Item {
  value: string;
  title: string;
}

interface Props {
  items: Item[];
  urlValue: string;
  onChange(value: string): void;
}

const StyledSelect = styled(Select)`
  && {
    font-size: 14px;
    letter-spacing: 2px;
  }
`;

const SelectItem = styled(MenuItem)`
  && {
    font-size: 14px;
    letter-spacing: 2px;
  }
`;

const SelectWithItems = ({ items, urlValue, onChange }: Props): JSX.Element => {
  // React.ChangeEvent<HTMLSelectElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (event: any): void => {
    onChange(event.target.value);
  };

  return (
    <StyledSelect IconComponent={KeyboardArrowDown} value={urlValue} onChange={handleOnChange}>
      {items.map(
        ({ value, title }): JSX.Element => (
          <SelectItem key={value} value={value}>
            {title}
          </SelectItem>
        )
      )}
    </StyledSelect>
  );
};

export default SelectWithItems;
