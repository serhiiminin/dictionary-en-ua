import React, { useState, useEffect } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface OwnProps {
  component?: React.ElementType;
  urlValue: string;
  onEnterPress(value: string): void;
}

type Props = TextFieldProps & OwnProps;

const InputWithSearch = ({ component, urlValue, onEnterPress, ...props }: Props): JSX.Element => {
  const [value, setValue] = useState<string>(urlValue);
  const Cmp = component || TextField;
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleOnEnterPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
      onEnterPress(value);
    }
  };

  useEffect((): void => {
    setValue(urlValue);
  }, [urlValue]);

  return <Cmp value={value} onChange={handleOnChange} onKeyUp={handleOnEnterPress} {...props} />;
};

export default InputWithSearch;
