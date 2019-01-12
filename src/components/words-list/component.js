import React from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@material-ui/core";
import uuid from "uuid";
import { joinRoute } from "url-joiner";
import routes from "../../routes";
import { WordItemInList } from "..";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const WordsList = ({ wordsList, loading, countPerPage, checked, onWordCheck, classes }) => (
  <List className={classes.wordsList} classes={{ root: classes.wordsList }}>
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
  </List>
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
  onWordCheck: PropTypes.func.isRequired,
  classes: composeClassesPropTypes(styles)
};

WordsList.defaultProps = {
  wordsList: null,
  loading: null,
  countPerPage: null,
  checked: null,
  classes: {}
};

export default WordsList;
