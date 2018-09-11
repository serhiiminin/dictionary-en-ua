import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: `${stylesVariables.padding.large} 0`,
  },
  headerLink: {
    color: stylesVariables.colors.text,
    textDecoration: 'none',
    fontFamily: '"Lucida Console", Monaco, monospace',
    fontSize: '1.5rem',
  }
};

export default styles;
