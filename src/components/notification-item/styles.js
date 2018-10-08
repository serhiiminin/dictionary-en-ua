import { notificationType } from './component';

const styles = theme => ({
  notification: {
    width: '100%',
    borderRadius: theme.main.borderRadius.small,
    padding: theme.main.padding.medium,
    marginBottom: theme.main.margin.medium,
    listStyle: 'none',
    transition: `all ${theme.main.timeout.notification}ms ease-in-out`,
    opacity: '1 !important'
  },
  [notificationType.error]: {
    background: theme.main.colors.notification.error,
  },
  [notificationType.success]: {
    background: theme.main.colors.notification.success,
  },
  [notificationType.warning]: {
    background: theme.main.colors.notification.warning,
  },
  [notificationType.info]: {
    background: theme.main.colors.notification.info,
  },
  topLine: {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column',
    marginBottom: theme.main.margin.medium,
  },
  typeText: {
    fontWeight: 'bold',
  },
  wrapperCloseButton: {
    textAlign: 'right',
  },
});

export default styles;
