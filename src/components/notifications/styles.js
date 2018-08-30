import { stylesVariables } from '../../defaults/styles-variables';

const styles = {
  notifications: {
    width: '300px',
    height: '0',
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: stylesVariables.padding.medium,
    zIndex: stylesVariables.zIndex.notification,
    padding: 0,
    margin: 0,
  },
};

export default styles;
