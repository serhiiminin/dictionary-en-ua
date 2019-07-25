import React from 'react';
import styled from 'styled-components';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { distanceInWords, format } from 'date-fns';
import { ThemeProps } from '../types';

const WordTooltip = styled(
  (props: TooltipProps): JSX.Element => <Tooltip {...props} classes={{ popper: 'tooltip', tooltip: 'tooltip' }} />
)`
  && {
  
  
  &.tooltip {
        font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.md};
        background: ${(props: ThemeProps): string => props.theme.main.color.text};
        color: red;
        // color: ${(props: ThemeProps): string => props.theme.main.color.background};
      }
  }
`;

const WordDateWrapper = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
  color: ${(props: ThemeProps): string => props.theme.main.color.main};
`;

interface Props {
  date: string;
}

const WordDate = ({ date }: Props): JSX.Element => (
  <WordTooltip title={format(new Date(date), 'DD MMM YYYY, HH:mm:ss')} placement="right">
    <WordDateWrapper>{distanceInWords(new Date(date), new Date(), { includeSeconds: true })}</WordDateWrapper>
  </WordTooltip>
);

export default WordDate;
