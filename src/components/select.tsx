import React from 'react';
import styled from 'styled-components';
import { Select, MenuItem } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { ThemeProps } from '../types';

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
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
    letter-spacing: 2px;
  }
`;

const SelectItem = styled((props): JSX.Element => <MenuItem classes={{ selected: 'selected' }} {...props} />)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
    background: ${(props: ThemeProps): string => props.theme.main.color.background};
    color: ${(props: ThemeProps): string => props.theme.main.color.text};
    transition: all 0.3s ease-in-out;
    letter-spacing: 2px;
    border-bottom: 1px solid #fff;

    &:hover {
      background: ${(props: ThemeProps): string => props.theme.main.color.text};
      color: ${(props: ThemeProps): string => props.theme.main.color.background};
    }

    &.selected {
      background: ${(props: ThemeProps): string => props.theme.main.color.text};
      color: ${(props: ThemeProps): string => props.theme.main.color.background};

      &:hover {
        background: ${(props: ThemeProps): string => props.theme.main.color.text};
        color: ${(props: ThemeProps): string => props.theme.main.color.background};
      }
    }
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
