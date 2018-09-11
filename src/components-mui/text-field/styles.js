import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  textFieldControl: {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr',
    rowGap: '0.5rem',
    columnGap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: stylesVariables.margin.medium,
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
