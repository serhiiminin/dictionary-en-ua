import { compose } from "recompose";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom";
import { withSnackbar } from 'notistack';
import { withUser } from "../../context/user";
import LogoutCmp from "./container";
import styles from "./styles";

const Logout = compose(
  injectSheet(styles),
  withRouter,
  withUser,
  withSnackbar,
)(LogoutCmp);

export default Logout;
