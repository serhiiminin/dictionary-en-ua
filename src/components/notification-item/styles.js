import { stylesVariables } from '../../constants/styles-variables';
import { notificationType } from './component';

const styles = {
  notification: {
    width: '100%',
    borderRadius: stylesVariables.borderRadius.small,
    padding: stylesVariables.padding.medium,
    marginBottom: stylesVariables.margin.medium,
    listStyle: 'none',
    transition: `all ${stylesVariables.timeout.notification}ms ease-in-out`,
    opacity: '1 !important'
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
};

export default styles;
