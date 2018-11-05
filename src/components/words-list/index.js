import React from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@material-ui/core";
import uuid from "uuid";
import styled from "styled-components";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";
import { WordItemInList } from "..";

const CustomizedList = styled(({ loading, ...props}) => <List {...props} />)`
  && {
    background: ${props => props.loading ? props.theme.palette.background.paper : props.theme.palette.primary.light}    
  }
`;

const WordsList = ({ wordsList, loading, countPerPage, checked, onWordCheck }) => (
  <CustomizedList loading>
    {loading
      ? Array(countPerPage)
          .fill(null)
          .map(() => (
            <ListItem key={uuid()} divider>
              <WordItemInList loading={loading} />
            </ListItem>
          ))
      : wordsList.map(word => {
          const { _id } = word;
          const linkToWord = joinRoute({
            pathname: routes.words.list.root,
            paths: [_id]
          });
          const isChecked = checked.includes(_id);

          return (
            <ListItem key={_id} divider>
              <WordItemInList
                word={word}
                linkToWord={linkToWord}
                onWordCheck={onWordCheck}
                isChecked={isChecked}
                loading={loading}
              />
            </ListItem>
          );
        })}
  </CustomizedList>
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
