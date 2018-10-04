import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  textFieldControl: {
    display: 'grid',
    rowGap: '0.5rem',
    columnGap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: '100fr 1fr',
  },
  textField: {
    marginBottom: stylesVariables.margin.medium,
  },
  root: {
    width: '100%',
  },
  label: {
    color: `${stylesVariables.colors.text} !important`,
    opacity: 0.7,
  },
  underline: {
    '&:after': {
      borderBottom: `${stylesVariables.colors.text} !important`,
    },
  },
};

export default styles;
