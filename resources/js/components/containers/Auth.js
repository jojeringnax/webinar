import {connect} from 'react-redux';
import Admin from "../Admin/Admin";


const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    cookies: ownProps.cookies
});
export const Auth = connect(
    mapStateToProps,
    null
)(Admin);

export default Auth