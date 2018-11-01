import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import styled from "styled-components";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";
import { WordItemInList } from "..";

const WordListWrapper = styled.div`
  display: grid;
  gap: 1px;
  background: ${props => props.theme.main.colors.text};
`;

const WordsList = ({
  wordsList,
  loading,
  countPerPage,
  checked,
  onWordCheck
}) => (
  <WordListWrapper>
    {loading
      ? Array(countPerPage)
          .fill(null)
          .map(() => <WordItemInList key={uuid()} loading={loading} />)
      : wordsList.map(word => {
          const { _id } = word;
          const linkToWord = joinRoute({
            pathname: routes.words.list.root,
            paths: [_id]
          });
          const isChecked = checked.includes(_id);

          return (
            <WordItemInList
              word={word}
              linkToWord={linkToWord}
              onWordCheck={onWordCheck}
              isChecked={isChecked}
              loading={loading}
              key={_id}
            />
          );
        })}
  </WordListWrapper>
);

WordsList.propTypes = {
  wordsList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  ),
  loading: PropTypes.bool,
  countPerPage: PropTypes.number,
  checked: PropTypes.arrayOf(PropTypes.string),
  onWordCheck: PropTypes.func.isRequired
};

WordsList.defaultProps = {
  wordsList: null,
  loading: null,
  countPerPage: null,
  checked: null
};

export default WordsList;
