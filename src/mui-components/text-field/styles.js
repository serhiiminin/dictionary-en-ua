import { variables } from '../../styles/variables';

const styles = {
  root: {
    width: '100%',
    marginBottom: variables.margin.medium,
  },
  label: {
    color: `${variables.colors.text} !important`,
    opacity: 0.7,
  },
  underline: {
    '&:after': {
      borderBottom: `${variables.colors.text} !important`,
    },
  },
};

export default styles;