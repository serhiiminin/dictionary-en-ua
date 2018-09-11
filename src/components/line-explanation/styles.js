import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  lineExplanation: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    background: stylesVariables.colors.line,
    padding: stylesVariables.padding.medium,
    marginBottom: stylesVariables.margin.medium,
    borderRadius: stylesVariables.borderRadius.small,
  },
};

export default styles;
