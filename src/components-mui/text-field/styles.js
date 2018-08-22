import { variables } from '../../styles/variables';

const styles = {
  textFieldControl: {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr',
    rowGap: '0.5rem',
    columnGap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: variables.margin.medium,
  },
  textField: {
    marginBottom: variables.margin.medium,
  },
  root: {
    width: '100%',
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
