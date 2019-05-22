import button from './button';
import chip from './chip';
import helper from './helper';
import input from './input';
import menu from './menu';
import progress from './progress';
import select from './select';
import snackbar from './snackbar';
import theme from '../../themes';

export default {
  ...button(theme),
  ...chip(theme),
  ...helper(theme),
  ...input(theme),
  ...menu(theme),
  ...progress(theme),
  ...select(theme),
  ...snackbar(theme),
};
