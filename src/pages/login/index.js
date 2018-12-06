import { compose } from "recompose";
import injectSheet from 'react-jss';
import { withRouter } from "react-router-dom";
import { withUser } from "../../context/user";
import { withNotifications } from "../../context/notifications";
import LoginCmp from "./container";
import styles from './styles';

const Login = compose(
  injectSheet(styles),
  withRouter,
  withUser,
  withNotifications,
)(LoginCmp);

export default Login;
