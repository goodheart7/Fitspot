import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import EditableForm from './EditableForm';
import { updateChallenge, startEditActivities, challengeReport } from '@store/modules/enterprise/actions'
import moment from 'moment';

class Activities extends Component {
    challenges = [];
    constructor(props){
        super(props);
        this.challenges = props.params ? props.challenges.find(a => (a.id === +props.params.id)) : [];
        this.state = {
            sorted: {
                id: true,
                name: true
            },
            newRow: false,
            editing: null,
            activities: props.params ? this.challenges.activities : []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.status) {
            this.setState({
                editing: null
            })
        }
    }

    addRow = () => {
        const data = {
            id: this.props.params ? this.state.activities[this.state.activities.length - 1].id + 1 : this.state.activities.length + 1,
            name: '',
            rule: '',
            points: 0,
            maxPoints: 0,
            active: false
        };
        this.setState({
            activities: this.state.activities.concat([data]),
            editing: data.id,
            newRow: true
        });
    };
    _activeChange = (e) => {
        console.log(e.target.name, e.target.checked)
    };
    toggleEditing = ( itemId ) => {
        this.setState( { editing: itemId } );
        this.props.startEditActivities();
    };
    removeItem = (itemId) => {
        let _arr = this.state.activities;
        let index = _arr.indexOf(itemId);
        _arr.splice(index, 1);
        this.setState({activities: _arr });
        const {updateChallenge, companyID, params,} = this.props;
        let data = this.challenges;
        data.challengePrizes = [];
        data.prizes.map(pr => {data.challengePrizes.push({prizeId: pr.prize.id, rank: pr.rank})});
        data.deleteActivitiesIds = [];
        data.deleteActivitiesIds.push(itemId);
        updateChallenge(companyID, +params.id, data);
    };
    sort(type) {
        if(!this.state.editing){
            const { activities } = this.state;
            const isSorted = this.state.sorted[type];
            let direction = isSorted ? 1 : -1;
            const sorted = [].slice.call(activities).sort((a, b) => {
                if (a[type] === b[type]) { return 0; }
                return a[type] > b[type] ? direction : direction * -1;
            });
            this.state.sorted[type] = !isSorted;
            this.setState({
                activities: sorted
            });
        }
    }
    handleSubmit(form){
        const {activities, newRow} = this.state;
        const {updateChallenge, companyID, params} = this.props;
        form.rule = form.rule.value;
        this.setState({
            editing: null
        });
        if(this.props.params) {
            let data = this.challenges;
            data.challengePrizes = [];
            data.prizes.map(pr => ({prizeId: pr.prize.id, rank: pr.rank}));
            if(newRow) {
                let _arr = activities;
                _arr[activities.length - 1] = form;
                data.activities.push(form);
                this.setState({activities: _arr, newRow: false});
            }else {
                let index = activities.findIndex((item) => item.id === form.id);
                data.activities[index] = form;
            }

            if(this.props.onSubmit) {
                this.props.onSubmit(data.activities);
            }
            else {
                updateChallenge(companyID, +params.id, data);
            }
        } else {
            if(this.props.onSubmit) {
                let _arr = activities;
                if(newRow) {
                    _arr[activities.length - 1] = form;
                    this.setState({activities: _arr, newRow: false});
                }else {
                    let index = activities.findIndex((item) => item.id === form.id);
                    _arr[index] = form;
                }
                this.props.onSubmit(_arr);
            }
        }
    }
    closeEdit = (id) => {
        if(this.state.newRow) this.removeItem(id);
        this.setState({
            editing: null
        })
    };
    reportActivities = (data) => {
        const {params, challengeReport} = this.props;
        challengeReport(params.id, data)
    };
    renderItemOrEditField( item ) {
        if ( this.state.editing === item.id ) {
            return(
                <EditableForm key={item.id} onSubmit={::this.handleSubmit} closeEdit={(id) => this.closeEdit(id)} initialValues={item} />
            )
        } else {
            return (
                <tr key={item.id}>
                    <td>
                        {item.id}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.rule}</td>
                    <td>{item.maxPoints} points</td>
                    <td>{item.points}</td>
                    <td>
                        <div className="checkbox">
                            <label>
                                <input name={item.name} defaultChecked={item.active} onChange={(e) => this._activeChange(e)} type="checkbox" />
                                <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            </label>
                        </div>
                    </td>
                    {moment(this.challenges.dtStart).isAfter(moment()) && <td>

                        <div>
                            <button onClick={(e) => this.toggleEditing(item.id)} className="btn-link">
                                <b>Edit</b>
                            </button>
                            <button onClick={() => this.removeItem(item.id)} className="btn-link">
                                <b>Delete</b>
                            </button>
                        </div>
                    </td>}
                    {!this.props.params ? <td>

                            <div>
                                <button onClick={(e) => this.toggleEditing(item.id)} className="btn-link">
                                    <b>Edit</b>
                                </button>
                                <button onClick={() => this.removeItem(item.id)} className="btn-link">
                                    <b>Delete</b>
                                </button>
                            </div>
                        </td> : ''}
                    <td>
                        <button onClick={() => this.reportActivities({activityRuleId: item.id, points: item.points})} className="btn-link">
                            <b>Report [ TEST ONLY ]</b>
                        </button>
                    </td>

                </tr>
            );
        }
    }
    render() {
        return (
            <div className="marginBottom50" style={{marginTop: 35}}>
                <h3 className="text-center marginBottom50">Activities</h3>
                {this.state.activities.length ? <table className="table table-striped table-custom">
                        <thead>
                        <tr>
                            <th onClick={() => this.sort('id')}>#</th>
                            <th onClick={() => this.sort('name')}>Name</th>
                            <th onClick={() => this.sort('rule')}>Rule</th>
                            <th onClick={() => this.sort('max')}>Max</th>
                            <th onClick={() => this.sort('points')}>Points</th>
                            <th>Active</th>
                            {moment(this.challenges.dtStart).isAfter(moment()) && <th> Actions </th>}
                            {!this.props.params ? <th> Actions </th> : ''}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.activities.map(item => {
                                return this.renderItemOrEditField(item);
                            })
                        }
                        </tbody>
                    </table> : ''}
                <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                    {moment(this.challenges.dtStart).isAfter(moment()) && <button onClick={() => {this.addRow()}} className="btn btn-info btn-block btn-sm" disabled={this.state.editing}>+ Add activity</button>}
                    {!this.props.params && <button onClick={() => {this.addRow()}} className="btn btn-info btn-block btn-sm" disabled={this.state.editing}>+ Add activity</button>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        companyID: state.auth.user.companyList[0].id,
        challenges: state.enterprise.data,
        status: state.enterprise.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateChallenge: (companyID, challengeID , data) => {
            dispatch(updateChallenge(companyID, challengeID, data))
        },
        challengeReport: (challengeID , data) => {
            dispatch(challengeReport(challengeID, data))
        },
        startEditActivities: () => {
            dispatch(startEditActivities())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
