import {connect} from 'react-redux';
import Commnets from '../Webinar/Comments/Comments'

const mapStateToProps = state => ({
    comments: state.comments
});


export default connect(
    mapStateToProps
)(Commnets)