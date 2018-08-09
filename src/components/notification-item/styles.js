import { variables } from '../../styles/variables';

const styles = {
  notification: {
    width: '100%',
    borderRadius: variables.borderRadius.small,
    padding: variables.padding.medium,
    marginBottom: variables.margin.medium,
    listStyle: 'none',
    transition: `all ${variables.timeout.notification}ms ease-in-out`,
  },
  error: {
    background: variables.colors.important,
  },
  success: {
    background: variables.colors.block,
  },
  warning: {
    background: variables.colors.line,
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
  closeButton: {
    background: 'transparent',
    color: variables.colors.text,
    padding: 0,
    border: 0,
    borderRadius: '50%',
    fontSize: '.81em',
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
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
    marginTop: '50px',
    opacity: '0',
  },
  exited: {
    marginTop: '50px',
    opacity: '0',
  },
};

export default styles;
