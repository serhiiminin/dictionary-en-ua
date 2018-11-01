import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ImageWrapper = styled.div`
  padding: ${props => props.theme.main.padding.medium} 0;
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const Image = ({ src, alt }) => (
  <ImageWrapper>
    {src ? <StyledImage src={src} alt={alt} /> : "There is no image"}
  </ImageWrapper>
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

Image.defaultProps = {
  src: "",
  alt: ""
};

export default Image;
