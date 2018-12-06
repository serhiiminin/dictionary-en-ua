import { compose } from "recompose";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom";
import { withUser } from "../../context/user";
import { withNotifications } from "../../context/notifications";
import LogoutCmp from "./container";
import styles from "./styles";

const Logout = compose(
  injectSheet(styles),
  withRouter,
  withUser,
  withNotifications
)(LogoutCmp);

export default Logout;
