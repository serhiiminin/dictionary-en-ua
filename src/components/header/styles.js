import { stylesVariables } from '../../defaults/styles-variables';

const styles = {
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: `${stylesVariables.padding.large} 0`,
  },
  headerLink: {
    color: stylesVariables.colors.text,
    textDecoration: 'none',
    fontFamily: 'Impact, sans-serif'
  }
};

export default styles;
