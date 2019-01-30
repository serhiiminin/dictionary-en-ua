import React from 'react';
import PropTypes from 'prop-types';
import { Error, OfflinePin, Warning, InfoOutlined } from '@material-ui/icons';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import NT from '../../constants/notifications-type';
import styles from './styles';

const getIcon = (type) => ({
  [NT.success]: OfflinePin,
  [NT.info]: InfoOutlined,
  [NT.warning]: Warning,
  [NT.error.default]: Error,
})[type] || InfoOutlined;

const NotificationMessage = ({ text, type, classes }) => {
  const Icon = getIcon(type);

  return (
    <div className={classes.message}>
      <Icon type={type}/>
      {text}
    </div>
  );
};

NotificationMessage.propTypes = {
  classes: composeClassesPropTypes(styles),
  text: PropTypes.string,
  type: PropTypes.oneOf([NT.success, NT.info, NT.warning, NT.error.default]),
};

NotificationMessage.defaultProps = {
  text: null,
  type: NT.info,
  classes: {},
};

export default NotificationMessage;
