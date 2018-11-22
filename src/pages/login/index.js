import { compose } from "recompose";
import injectSheet from 'react-jss';
import { withRouter } from "react-router-dom";
import { withTokens } from "../../context/tokens";
import { withNotifications } from "../../context/notifications";
import LoginCmp from "./container";
import styles from './styles';

const Login = compose(
  injectSheet(styles),
  withRouter,
  withTokens,
  withNotifications,
)(LoginCmp);

export default Login;
