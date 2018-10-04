import stylesVariables from '../../constants/styles-variables';

const styles = {
  notifications: {
    width: '300px',
    height: '0',
    position: 'fixed',
    right: stylesVariables.padding.medium,
    top: stylesVariables.padding.medium,
    zIndex: stylesVariables.zIndex.notification,
    padding: 0,
    margin: 0,
  },
};

export default styles;
