import { variables } from '../../styles/variables';

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr',
      columnGap: '.5rem',
      rowGap: '.5rem',
      margin: `0 0 ${variables.margin.small}`,
    },
    '@media (min-width: 992px)': {
      gridTemplateColumns: '1fr 2fr',
    },
    '@media (min-width: 1200px)': {
      gridTemplateColumns: '1fr 3fr',
      gridAutoRows: 'minmax(300px, auto)',
    },


  }
};

export default styles;
