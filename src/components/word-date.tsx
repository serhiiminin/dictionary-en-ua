import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';
import { formatDistance, format } from 'date-fns';
import { ThemeProps } from '../types';

const WordDateWrapper = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
  color: ${(props: ThemeProps): string => props.theme.main.color.main};
`;

interface Props {
  date: string;
}

const WordDate = ({ date }: Props): JSX.Element => (
  <Tooltip title={format(new Date(date), 'dd MMM yyyy, HH:mm:ss')} placement="right">
    <WordDateWrapper>{formatDistance(new Date(date), new Date(), { includeSeconds: true })}</WordDateWrapper>
  </Tooltip>
);

export default WordDate;
