import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const InfoBlock = ({ title, description, info }) => (
  <SC.Outer>
    {title && <SC.Title>{title}</SC.Title>}
    {description && <SC.Description>{description}</SC.Description>}
    {info && <SC.Info>{info()}</SC.Info>}
  </SC.Outer>
);

InfoBlock.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  info: PropTypes.func,
};

InfoBlock.defaultProps = {
  title: null,
  description: null,
  info: null,
};

export default InfoBlock;
