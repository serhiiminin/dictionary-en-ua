import { withAuth } from '../../../context/hocs';
import LoginCmp from './component';

const Login = withAuth(LoginCmp);

export default Login;
