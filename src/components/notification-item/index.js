import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import styles from './styles';

const NotificationItem = ({ classes, onClick, text, type }) => (
  <li className={`${classes.notification} ${classes[type]}`}>
    <div>
      <div className={classes.topLine}>
        <div className={classes.wrapperCloseButton}>
          <button
            type='button'
            className={classes.closeButton}
            onClick={onClick}
          >+
          </button>
        </div>
      </div>
      <div>{text}</div>
    </div>
  </li>
);

NotificationItem.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: '',
  type: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(NotificationItem);
