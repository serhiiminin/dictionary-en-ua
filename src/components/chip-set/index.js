import React from "react";
import PropTypes from "prop-types";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import styled from "styled-components";
import { Chip } from "../../components-mui";

const ChipSetList = styled.div`
  display: flex;
  flex-flow: row wrap;
  transition: ${props => props.theme.main.transition};
`;

const StyledChip = styled(Chip)`
  margin-bottom: ${props => props.theme.main.margin.small};
  margin-right: ${props => props.theme.main.margin.small};
`;

const ChipSet = ({ items, onRemoveItem, disabled }) => (
  <ChipSetList>
    {items.map(({ id, value }) => (
      <StyledChip
        key={id}
        label={value}
        icon={<TagFacesIcon />}
        onDelete={() => onRemoveItem(id)}
        disabled={disabled}
      />
    ))}
  </ChipSetList>
);

ChipSet.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  onRemoveItem: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ChipSet.defaultProps = {
  items: [],
  disabled: false
};

export default ChipSet;
