import { variables } from '../../styles/variables';

const styles = {
  notifications: {
    width: '300px',
    height: '0',
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: variables.padding.medium,
    zIndex: variables.zIndex.notification,
    padding: 0,
    margin: 0,
  },
};

export default styles;
