import button from './button';
import chip from './chip';
import helper from './helper';
import icon from './icon';
import input from './input';
import menu from './menu';
import progress from './progress';
import select from './select';
import snackbar from './snackbar';
import tooltip from './tooltip';
import theme from '../../themes';
import { Theme } from '../../../../types';

export default {
  ...button(theme as Theme),
  ...chip(theme as Theme),
  ...helper(theme as Theme),
  ...icon(theme as Theme),
  ...input(theme as Theme),
  ...menu(theme as Theme),
  ...progress(theme as Theme),
  ...select(),
  ...snackbar(theme as Theme),
  ...tooltip(theme as Theme),
};
