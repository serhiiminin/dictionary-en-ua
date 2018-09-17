import { stylesVariables } from '../../constants/styles-variables';


const styles = {
  foundImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '250px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  foundImageInner: {
    position: 'relative',
    widht: '100%',
    height: '100%',
    backgroundColor: stylesVariables.colors.line,
    opacity: stylesVariables.opacity.disabled,
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
  }
};

export default styles;
