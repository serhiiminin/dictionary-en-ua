import PropTypes from "prop-types";

const composeClassesWithProTypes = propTypes => styles =>
  propTypes.shape(
    Object.assign(
      {},
      ...Object.keys(styles).map(className => ({
        [className]: propTypes.string.isRequired
      }))
    )
  );

const composeClassesPropTypes = composeClassesWithProTypes(PropTypes);

export default composeClassesPropTypes;
