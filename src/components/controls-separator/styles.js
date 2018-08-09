import { variables } from '../../styles/variables';

const styles = {
  alignControls: {
    display: 'grid',
    alignContent: 'center',
    gridAutoFlow: 'column',
    padding: `${variables.padding.medium} 0`,
    justifyContent: 'start',
    columnGap: '.5rem',
    rowGap: '.5rem',
  },
  left: {
    justifyContent: 'start',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'end',
  }
};

export default styles;
