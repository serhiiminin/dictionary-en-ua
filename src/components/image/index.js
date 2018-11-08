import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const ImageWrapper = styled.div`
  padding: ${props => props.theme.main.padding.medium} 0;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${props => props.theme.main.borderRadius.small};
`;

const Image = ({ src, width, height }) => (
  <ImageWrapper backgroundImage={src} width={width} height={height} />
);

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

Image.defaultProps = {
  src: "",
  width: 300,
  height: 200
};

export default Image;
