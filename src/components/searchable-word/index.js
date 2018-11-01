import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { joinRoute } from "../../helpers/join-url";
import routes from "../../routes";

const SearchableWordLink = styled(({ word }) => (
  <Link
    to={joinRoute({
      pathname: routes.words.search,
      searchParams: { query: word }
    })}
  >
    {word}
  </Link>
))`
  display: inline-block;
  color: ${props => props.theme.main.colors.text};
  font-weight: bolder;
`;

const SearchableWord = ({ word, delimiter }) => (
  <React.Fragment>
    <SearchableWordLink word={word} />
    {delimiter}
  </React.Fragment>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  delimiter: PropTypes.node
};

SearchableWord.defaultProps = {
  delimiter: null
};

export default SearchableWord;
