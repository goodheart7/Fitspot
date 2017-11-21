import React, {Component, PropTypes} from 'react';
import AcceptChallengeForm from './AcceptChallengeForm';
import GetStartedForm from './GetStartedForm';
import {Link, browserHistory} from 'react-router';

export default class ChallengesInvites extends Component {
    static propTypes = {
        rules: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            challenges: [
                'exercise',
                'cigarette-less day',
                'taking the stars',
                'fitness events',
                'healthy snacking',
                'alcohol moderation',
                'good night\'s sleep',
                'water consumption',
                'doctor\'s visit'
            ],
            divisions: [
                {
                    value: 'Strategy'
                },
                {
                    value: 'Operations'
                }
            ]
        }
    }
    nextPage = () => {
        this.setState({ page: this.state.page + 1 })
    };

    previousPage = () => {
        this.setState({ page: this.state.page - 1 })
    };
    handleSubmit(form){
        console.log(form);
    }
    render() {
        const {page, challenges, divisions} = this.state;
        return (
            <div className="marginBottom50">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                            <div className="text-center marginBottom50">
                                <h2>Your Challenges</h2>
                            </div>
                            <div className="challenge-invite-container text-center">
                                {page === 1 && <AcceptChallengeForm challenges={challenges} onCancel={::this.props.onCancel} onSubmit={() => this.nextPage()}/>}
                                {page === 2 && <GetStartedForm divisions={divisions} previousPage={() => this.previousPage()} onSubmit={this.handleSubmit}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}