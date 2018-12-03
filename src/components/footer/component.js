import React from "react";
import { FooterNavigation } from "..";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const Footer = ({ classes }) => (
  <div className={classes.footer}>
    <FooterNavigation />
  </div>
);

Footer.propTypes = {
  classes: composeClassesPropTypes(styles)
};

Footer.defaultProps = {
  classes: {}
};

export default Footer;
