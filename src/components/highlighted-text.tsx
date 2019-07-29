import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../types';

const Highlight = styled.span`
  box-shadow: 0 -0.1em 0 ${(props: ThemeProps): string => props.theme.main.color.contrastText} inset;
`;

interface Props {
  text: string;
  pattern?: string;
}

const HighlightedText = ({ text, pattern }: Props): JSX.Element => (
  <span>
    {pattern
      ? text.split(pattern).map((item, index, arr): JSX.Element | string =>
          index < arr.length - 1 ? (
            <Fragment key={item}>
              {item}
              <Highlight>{pattern}</Highlight>
            </Fragment>
          ) : (
            item
          )
        )
      : text}
  </span>
);

export default HighlightedText;
