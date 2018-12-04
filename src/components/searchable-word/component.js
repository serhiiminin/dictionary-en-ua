import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const SearchableWord = ({ word, classes, delimiter }) => (
  <React.Fragment>
    <Link
      className={classes.clickableWord}
      to={joinRoute({
        pathname: routes.words.search,
        searchParams: { query: word }
      })}
    >
      {word}
    </Link>
    {delimiter}
  </React.Fragment>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  delimiter: PropTypes.node,
  classes: composeClassesPropTypes(styles)
};

SearchableWord.defaultProps = {
  delimiter: null,
  classes: {}
};

export default SearchableWord;
