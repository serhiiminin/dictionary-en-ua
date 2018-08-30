import { stylesVariables } from '../../defaults/styles-variables';
import { notificationType } from './component';

const styles = {
  notification: {
    width: '100%',
    borderRadius: stylesVariables.borderRadius.small,
    padding: stylesVariables.padding.medium,
    marginBottom: stylesVariables.margin.medium,
    listStyle: 'none',
    transition: `all ${stylesVariables.timeout.notification}ms ease-in-out`,
  },
  [notificationType.error]: {
    background: stylesVariables.colors.notification.error,
  },
  [notificationType.success]: {
    background: stylesVariables.colors.notification.success,
  },
  [notificationType.warning]: {
    background: stylesVariables.colors.notification.warning,
  },
  [notificationType.info]: {
    background: stylesVariables.colors.notification.info,
  },
  topLine: {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column',
    marginBottom: stylesVariables.margin.medium,
  },
  typeText: {
    fontWeight: 'bold',
  },
  wrapperCloseButton: {
    textAlign: 'right',
  },
  entering: {
    marginTop: '100px',
    opacity: '0',
  },
  entered: {
    marginTop: '0',
    opacity: '1',
  },
  exiting: {
    opacity: '0',
  },
  exited: {
    opacity: '0',
  },
};

export default styles;
