import React, {Component} from 'react'
import {connect} from 'react-redux'
import Profile from '@Profile/components/Profile'
import { browserHistory } from 'react-router';

type Props = {
    user: Object,
    isFetching: bool
};
class ProfileContainer extends Component {
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false,
            message: ''
        };
    }
    handleClose = () => {
        this.setState({isShowingModal: false, message: ''});
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                message: nextProps.error,
                isShowingModal: true
            });
        } else if (!nextProps.isFetching && !nextProps.error) {
            browserHistory.push('/');
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>Error</h1>
                            <p>{this.state.message}</p>
                        </ModalDialog>
                    </ModalContainer>
                }
                <Profile {...this.props}/>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        isFetching: state.auth.isFetching,
    }
};

export default connect(mapStateToProps, null)(ProfileContainer)
