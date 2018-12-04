import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Snackbar, Slide } from "@material-ui/core";
import { SnackbarContent } from "..";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const Notifications = ({ classes, children, notifications, hideNotification }) => (
  <Fragment>
    {children}
    <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={notifications.length > 0}>
      <div>
        {notifications
          .reduceRight((acc, cur) => acc.concat(cur), [])
          .map(({ id, text, type }) => (
            <Slide in={!!text} direction="up" key={id}>
              <SnackbarContent
                className={classes.margin}
                onClose={() => hideNotification(id)}
                variant={type}
                message={text}
              />
            </Slide>
          ))}
      </div>
    </Snackbar>
  </Fragment>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    })
  ),
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: composeClassesPropTypes(styles)
};

Notifications.defaultProps = {
  notifications: [],
  classes: {}
};

export default Notifications;
