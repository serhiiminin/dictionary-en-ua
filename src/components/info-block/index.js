import React from 'react';
import PropTypes from 'prop-types';
import SC from './styles';

const InfoBlock = ({ title, description, children }) => (
  <SC.Outer>
    {title && <SC.Title>{title}</SC.Title>}
    {description && <SC.Description>{description}</SC.Description>}
    {children && <SC.Info>{children}</SC.Info>}
  </SC.Outer>
);

InfoBlock.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  children: PropTypes.node,
};

InfoBlock.defaultProps = {
  title: null,
  description: null,
  children: null,
};

export default InfoBlock;
