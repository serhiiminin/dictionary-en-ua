import { stylesVariables } from '../../defaults/styles-variables';

const styles = {
  examplesTitle: {
    margin: `0 0 ${stylesVariables.margin.medium}`,
    padding: 0,
  },
  exampleItem: {
    background: stylesVariables.colors.line,
    padding: stylesVariables.padding.medium,
    marginBottom: stylesVariables.margin.small,
    borderRadius: stylesVariables.borderRadius.small,
  },
  noResults: {
    fontStyle: 'italic',
    opacity: stylesVariables.opacity.disabled,
  }
};

export default styles;
