import { variables } from '../../styles/variables';

const styles = {
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: `${variables.padding.large} 0`,
  },
  headerLink: {
    color: variables.colors.text,
    textDecoration: 'none',
    fontFamily: 'Impact, sans-serif'
  }
};

export default styles;
