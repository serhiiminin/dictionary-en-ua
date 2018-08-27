import { variables } from '../../styles/variables';
import { notificationType } from './component';

const styles = {
  notification: {
    width: '100%',
    borderRadius: variables.borderRadius.small,
    padding: variables.padding.medium,
    marginBottom: variables.margin.medium,
    listStyle: 'none',
    transition: `all ${variables.timeout.notification}ms ease-in-out`,
  },
  [notificationType.error]: {
    background: variables.colors.notification.error,
  },
  [notificationType.success]: {
    background: variables.colors.notification.success,
  },
  [notificationType.warning]: {
    background: variables.colors.notification.warning,
  },
  [notificationType.info]: {
    background: variables.colors.notification.info,
  },
  topLine: {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column',
    marginBottom: variables.margin.medium,
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
