import { variables } from '../../styles/variables';

const styles = {
  examplesTitle: {
    margin: `0 0 ${variables.margin.medium}`,
    padding: 0,
  },
  exampleItem: {
    background: variables.colors.line,
    padding: variables.padding.small,
    marginBottom: variables.margin.small,
    borderRadius: variables.borderRadius.small,
  },
  noResults: {
    fontStyle: 'italic',
    opacity: variables.opacity.disabled,
  }
};

export default styles;
