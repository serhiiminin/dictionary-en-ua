import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WordItemWrapper = styled.div`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 16fr 6fr 1fr;
  align-items: center;
  background: ${props =>
    props.isChecked || props.wordLoading
      ? props.theme.main.colors.line
      : props.theme.main.colors.background};
  opacity: ${props => (props.loading ? props.theme.main.opacity.disabled : 1)}
  padding: 5px 10px;
  gap: 1rem;
`;

const Description = styled.div`
  padding: ${props => props.theme.main.padding.small} 0;
`;

const LinkToWords = styled(props => <Link {...props} />)`
  color: ${props => props.theme.main.colors.button};
`;

const WordTitleWrapper = styled.div`
  font-size: 1em;
`;

const WordTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.9em;
`;

const LastLearntWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  justify-content: start;
  font-size: 0.85em;
  opacity: ${props => props.theme.main.opacity.disabled};
  gap: 0.25em;
`;

export {
  WordItemWrapper,
  Description,
  LinkToWords,
  WordTitleWrapper,
  WordTime,
  LastLearntWrapper
};
