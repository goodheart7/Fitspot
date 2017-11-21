import React, { PropTypes } from 'react'
const Reactable = require('reactable');
const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Tbody = Reactable.Tbody;
const Tr = Reactable.Tr;
const Td = Reactable.Td;
const Th = Reactable.Th;
import {Link} from 'react-router';
import ProgressBar from '@Challenges/components/ProgressBar';


class Employees extends React.Component {
  constructor(props) {
    super(props);
  }
  renderItemOrEditField( item ) {
    return (
        <tr key={item.id}>
            <td>
                {item.id}
            </td>
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.department || 'Not Available'}</td>
            <td>{item.location || 'Not Available'}</td>
            <td>{item.workouts || 'Not Available'}</td>
            <td>{item.credits || 'Not Available'}</td>
            <td>
                <div>
                  <button onClick={console.log('Add Credits Pressed')} className="btn-link">
                      <b>Add Credits</b>
                  </button>
                    <button onClick={console.log('Edit Pressed')} className="btn-link">
                        <b>Edit</b>
                    </button>
                    <button onClick={() => this.removeItem(item.id)} className="btn-link">
                        <b>Delete</b>
                    </button>
                </div>
            </td>
        </tr>
    );
  }
  render() {

      const row = this.props.employees.map(row => {
        console.log(row);
          const avatarUrl = row.avatar ? row.avatar.url : require('@assets/img/default_profile.png');
          return(
              <Tr id={row.id} key={row.id}>
                  <Td column="id">
                      {row.user.id}
                  </Td>
                  <Td column="name">
                      <div>
                        <img style={{borderRadius : '50%'}} src={avatarUrl} alt="Avatar" width="32" />
                        <span style={{padding: '8px'}}>{row.user.firstName} {row.user.lastName}</span>
                      </div>
                  </Td>
                  <Td column="division">
                      {row.department.name}
                  </Td>
                  <Td column="office">
                      {row.officeLocation ? row.officeLocation.name : 'Unknown'}
                  </Td>
                  <Td column="workouts">
                      {row.workouts || '-'}
                  </Td>
                  <Td column="credits">
                      {row.credits || '-'}
                  </Td>
                  <Td column="actions">
                      <div>
                        <Link style={{padding: 5}} to="#">Add Credits </Link>
                        <Link style={{padding: 5}} to="#">  Edit  </Link>
                        <Link style={{padding: 5}} to="#">  Delete</Link>
                      </div>

                  </Td>
              </Tr>
          )
      });
      return(
        <div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-sm-offset-4 marginBottom50">
                  <div className="text-center">
                      <h2>Fitspot Credits</h2>
                      <p>$1000 in credit/month ($100/employee)</p>
                      <ProgressBar start={'0%'} end={'100%'} progress={50} /> :
                      <p className="challenge-enrolled">$350 left this month</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="challenge-details-container ">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                    <h3 className="text-center marginBottom20">{this.props.company.name} Employees</h3>
                    <Table className="table table-striped marginBottom50" sortable={[
                        'id',
                        'name',
                        'division',
                        'office',
                        'workouts',
                        'credits',
                    ]} defaultSort={{column: 'id', direction: 'asc'}}>
                        <Thead>
                            <Th column="id">
                                #
                            </Th>
                            <Th column="name">
                                Name
                            </Th>

                            <Th column="division">
                                Division
                            </Th>
                            <Th column="office">
                                Location
                            </Th>
                            <Th column="workouts">
                                Workouts
                            </Th>
                            <Th column="credits">
                                Credits
                            </Th>
                            <Th column="actions">
                                Actions
                            </Th>
                        </Thead>
                        {row}
                    </Table>
                    <div className="row border-bottom border-top paddingTopBottom25">
                      <h3 className="text-center marginBottom20">Not Yet Joined</h3>
                      <div className="text-center col-xs-12 col-sm-4" style={{fontSize: 'larger'}}>
                        <p>employee1@inizio.io</p>
                      </div>
                      <div className="text-center col-xs-12 col-sm-4" style={{fontSize: 'larger'}}>
                        <p>employee2@inizio.io</p>
                      </div>
                      <div className="text-center col-xs-12 col-sm-4" style={{fontSize: 'larger'}}>
                        <p>employee3@inizio.io</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-center col-xs-12 col-sm-4 col-sm-offset-4" style={{marginTop: 35}}>
                          <Link to="#" className="btn btn-info btn-block">Send Reminder</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row">
            <div className="text-center col-xs-12 col-sm-4 col-sm-offset-4" style={{marginTop: 35}}>
                <Link to="/employees/add-employee/" className="btn btn-info btn-block">Add Employees</Link>
            </div>
          </div>
        </div>
      )
  }
}

export default Employees;
