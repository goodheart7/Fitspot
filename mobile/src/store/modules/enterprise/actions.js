export const FETCH_CHALLENGES_START = 'FETCH_CHALLENGES_START';
export const FETCH_CHALLENGES_SUCCESS = 'FETCH_CHALLENGES_SUCCESS';
export const FETCH_CHALLENGES_FAIL = 'FETCH_CHALLENGES_FAIL';

export const FETCH_EMPLOYEES_START = 'FETCH_EMPLOYEES_START';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAIL = 'FETCH_EMPLOYEES_FAIL';


export const FETCH_COMPANY_PRIZES_START = 'FETCH_COMPANY_PRIZES_START';
export const FETCH_COMPANY_PRIZES_SUCCESS = 'FETCH_COMPANY_PRIZES_SUCCESS';
export const FETCH_COMPANY_PRIZES_FAIL = 'FETCH_COMPANY_PRIZES_FAIL';


export const ADD_PRIZE_START = 'ADD_PRIZE_START';
export const ADD_PRIZE_SUCCESS = 'ADD_PRIZE_SUCCESS';
export const ADD_PRIZE_FAIL = 'ADD_PRIZE_FAIL';


export const UPDATE_CHALLENGE_START = 'UPDATE_CHALLENGE_START';
export const UPDATE_CHALLENGE_SUCCESS = 'UPDATE_CHALLENGE_SUCCESS';
export const UPDATE_CHALLENGE_FAIL = 'UPDATE_CHALLENGE_FAIL';


export const CREATE_CHALLENGE_START = 'CREATE_CHALLENGE_START';
export const CREATE_CHALLENGE_SUCCESS = 'CREATE_CHALLENGE_SUCCESS';
export const CREATE_CHALLENGE_FAIL = 'CREATE_CHALLENGE_FAIL';

export const START_EDITING_ACTIVITIES = 'START_EDITING_ACTIVITIES';
export const END_EDITING_ACTIVITIES = 'END_EDITING_ACTIVITIES';

export const CHALLENGE_REPORT_START = 'CHALLENGE_REPORT_START';
export const CHALLENGE_REPORT_SUCCESS = 'CHALLENGE_REPORT_SUCCESS';
export const CHALLENGE_REPORT_FAIL = 'CHALLENGE_REPORT_FAIL';


export const ACCEPT_CHALLENGE_START = 'ACCEPT_CHALLENGE_START';
export const ACCEPT_CHALLENGE_SUCCESS = 'ACCEPT_CHALLENGE_SUCCESS';
export const ACCEPT_CHALLENGE_FAIL = 'ACCEPT_CHALLENGE_FAIL';


export const PROGRESS_CHALLENGE_START = 'PROGRESS_CHALLENGE_START';
export const PROGRESS_CHALLENGE_SUCCESS = 'PROGRESS_CHALLENGE_SUCCESS';
export const PROGRESS_CHALLENGE_FAIL = 'PROGRESS_CHALLENGE_FAIL';


export const CHALLENGE_LEADERBOARD_START = 'CHALLENGE_LEADERBOARD_START';
export const CHALLENGE_LEADERBOARD_SUCCESS = 'CHALLENGE_LEADERBOARD_SUCCESS';
export const CHALLENGE_LEADERBOARD_FAIL = 'CHALLENGE_LEADERBOARD_FAIL';


export const ADD_EMPLOYEE_START = 'ADD_EMPLOYEE_START';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_EMPLOYEE_FAIL = 'ADD_EMPLOYEE_FAIL';


export const EMPLOYEES_ONBOARD = 'EMPLOYEES_ONBOARD';

export const ADD_DEPARTMENT_START = 'ADD_EMPLOYEE_START';
export const ADD_DEPARTMENT_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_DEPARTMENT_FAIL = 'ADD_EMPLOYEE_FAIL';


export const ADD_OFFICE_START = 'ADD_EMPLOYEE_START';
export const ADD_OFFICE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_OFFICE_FAIL = 'ADD_EMPLOYEE_FAIL';


export const REMOVE_DEPARTMENT_START = 'REMOVE_DEPARTMENT_START';
export const REMOVE_DEPARTMENT_SUCCESS = 'REMOVE_DEPARTMENT_SUCCESS';
export const REMOVE_DEPARTMENT_FAIL = 'REMOVE_DEPARTMENT_FAIL';


export const REMOVE_OFFICE_START = 'REMOVE_OFFICE_START';
export const REMOVE_OFFICE_SUCCESS = 'REMOVE_OFFICE_SUCCESS';
export const REMOVE_OFFICE_FAIL = 'REMOVE_OFFICE_FAIL';

export const CHANGE_INTERFACE = 'CHANGE_INTERFACE';

import ApiUtils from '@utils/ApiUtils';
import {browserHistory} from 'react-router';

export function employeesOnboard() {
  return {
    type: EMPLOYEES_ONBOARD
  }
}

export function switchInterface(code) {
  return {
    type: CHANGE_INTERFACE,
    code
  }
}

export function requestAddDepartment() {
  return {
    type: ADD_DEPARTMENT_START
  }
}

export function requestAddDepartmentSuccess() {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    receivedAt: Date.now()
  }
}

export function requestAddDepartmentFail(error) {
  return {
    type: ADD_DEPARTMENT_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function requestAddOffice() {
  return {
    type: ADD_OFFICE_START,
  }
}

export function requestAddOfficeSuccess() {
  return {
    type: ADD_OFFICE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function requestAddOfficeFail(error) {
  return {
    type: ADD_OFFICE_FAIL,
    error,
    receivedAt: Date.now()
  }
}


export function requestAddEmployee() {
  return {
    type: ADD_EMPLOYEE_START
  }
}

export function requestAddEmployeeSuccess() {
  return {
    type: ADD_EMPLOYEE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function requestAddEmployeeFail(error) {
  return {
    type: ADD_EMPLOYEE_FAIL,
    receivedAt: Date.now(),
    error
  }
}

export function requestCompanyPrizes() {
  return {
    type: FETCH_COMPANY_PRIZES_START
  }
}

export function requestCompanyPrizesSuccess(prizes) {
  return {
    type: FETCH_COMPANY_PRIZES_SUCCESS,
    prizes,
    receivedAt: Date.now()
  }
}

export function requestCompanyPrizesFail(error) {
  return {
    type: FETCH_COMPANY_PRIZES_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function requestChallenges() {
  return { type: FETCH_CHALLENGES_START }
}

export function requestChallengesSuccess(challenges) {
  return { type: FETCH_CHALLENGES_SUCCESS, challenges, receivedAt: Date.now() }
}

export function requestChallengesFail(error) {
  return { type: FETCH_CHALLENGES_FAIL, error, receivedAt: Date.now() }
}

export function requestEmployees() {
  return { type: FETCH_EMPLOYEES_START }
}

export function requestEmployeesSuccess(employees) {
  return { type: FETCH_EMPLOYEES_SUCCESS, employees, receivedAt: Date.now() }
}

export function requestEmployeesFail(error) {
  return { type: FETCH_EMPLOYEES_FAIL, error, receivedAt: Date.now() }
}

export function requestUpdateChallenge() {
  return {
    type: UPDATE_CHALLENGE_START
  }
}

export function requestUpdateChallengeSuccess() {
  return {
    type: UPDATE_CHALLENGE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function requestUpdateChallengeFail(error) {
  return {
    type: UPDATE_CHALLENGE_FAIL,
    error,
    receivedAt: Date.now()
  }
}


export function createChallengeStart() {
  return {
    type: CREATE_CHALLENGE_START
  }
}

export function createChallengeSuccess() {
  return {
    type: CREATE_CHALLENGE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function createChallengeFail(error) {
  return {
    type: CREATE_CHALLENGE_FAIL, error, receivedAt: Date.now()
  }
}

export function startEditActivities() {
  return {
    type: START_EDITING_ACTIVITIES
  }
}

export function endEditActivities() {
  return {
    type: END_EDITING_ACTIVITIES,
    receivedAt: Date.now()
  }
}

export function addPrizeStart() {
  return {
    type: ADD_PRIZE_START
  }
}

export function addPrizeSuccess() {
  return {
    type: ADD_PRIZE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function addPrizeFail(error) {
  return {
    type: ADD_PRIZE_FAIL,
    receivedAt: Date.now(),
    error
  }
}

export function challengeReportStart() {
  return {
    type: CHALLENGE_REPORT_START,
    receivedAt: Date.now()
  }
}
export function challengeReportSuccess() {
  return {
    type: CHALLENGE_REPORT_SUCCESS,
    receivedAt: Date.now()
  }
}
export function challengeReportFail(error) {
  return {
    type: CHALLENGE_REPORT_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function acceptChallengeStart() {
  return {
    type: ACCEPT_CHALLENGE_START,
    receivedAt: Date.now()
  }
}

export function acceptChallengeSuccess() {
  return {
    type: ACCEPT_CHALLENGE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function acceptChallengeFail(error) {
  return {
    type: ACCEPT_CHALLENGE_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function progressChallengeStart() {
  return {
    type: PROGRESS_CHALLENGE_START,
    receivedAt: Date.now()
  }
}

export function progressChallengeSuccess(payload) {
  return {
    type: PROGRESS_CHALLENGE_SUCCESS,
    payload,
    receivedAt: Date.now()
  }
}

export function progressChallengeFail(error) {
  return {
    type: PROGRESS_CHALLENGE_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function leaderboardChallengeStart() {
  return {
    type: CHALLENGE_LEADERBOARD_START,
    receivedAt: Date.now()
  }
}

export function leaderboardChallengeSuccess(payload) {
  return {
    type: CHALLENGE_LEADERBOARD_SUCCESS,
    payload,
    receivedAt: Date.now()
  }
}

export function leaderboardChallengeFail(error) {
  return {
    type: CHALLENGE_LEADERBOARD_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function removeOfficeStart() {
  return {
    type: REMOVE_OFFICE_START
  }
}

export function removeOfficeSuccess() {
  return {
    type: REMOVE_OFFICE_SUCCESS,
    receivedAt: Date.now()
  }
}

export function removeOfficeFail(error) {
  return {
    type: REMOVE_OFFICE_FAIL,
    error,
    receivedAt: Date.now()
  }
}


export function removeDepartmentStart() {
  return {
    type: REMOVE_DEPARTMENT_START
  }
}

export function removeDepartmentSuccess() {
  return {
    type: REMOVE_DEPARTMENT_SUCCESS,
    receivedAt: Date.now()
  }
}

export function removeDepartmentFail(error) {
  return {
    type: REMOVE_DEPARTMENT_FAIL,
    error,
    receivedAt: Date.now()
  }
}

export function addCompanyPrize(companyID, data) {
  return function(dispatch) {
    dispatch(addPrizeStart());
    let string = 'enterprise/new-company-prize/' + companyID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(addPrizeSuccess())
        } else {
          dispatch(addPrizeFail(jsonBody.message))
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function fetchEmployees(companyID) {
  return function(dispatch) {
    dispatch(requestEmployees());
    let string = 'enterprise/employees/'+ companyID;
    return ApiUtils.get(string)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestEmployeesSuccess(jsonBody))
        } else {
          dispatch(requestEmployeesFail(jsonBody.message))
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}
export function fetchChallenges(companyID) {
  return function(dispatch) {
    dispatch(requestChallenges());
    let string = 'enterprise/challenges/'+ companyID;
    return ApiUtils.get(string)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestChallengesSuccess(jsonBody))
        } else {
          dispatch(requestChallengesFail(jsonBody.message))
        }

      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function createChallenge(companyID, data) {
  return function(dispatch) {
    dispatch(createChallengeStart());
    let string = 'enterprise/new-challenge/' + companyID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(createChallengeSuccess());
          browserHistory.push('/challenges/');
        } else {
          dispatch(createChallengeFail(jsonBody.message))
        }

      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function updateChallenge(companyID, challengeID, data) {
  return function(dispatch) {
    dispatch(requestUpdateChallenge());
    let string = `enterprise/edit-challenge/${companyID}/${challengeID}`;
    return ApiUtils.patch(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestUpdateChallengeSuccess());
          dispatch(fetchChallenges(companyID));
        } else {
          dispatch(requestUpdateChallengeFail(jsonBody.message))
        }

      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function editActivities(data) {
  return function(dispatch) {
    let string = 'challenge_activity_update/';
    return ApiUtils.patch(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(endEditActivities())
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function fetchPrizes(companyID) {
  return function(dispatch) {
    dispatch(requestCompanyPrizes());
    let string = 'enterprise/company-prizes/' + companyID;
    return ApiUtils.get(string)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestCompanyPrizesSuccess(jsonBody));
        }else {
          dispatch(requestCompanyPrizesFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function challengeReport(challengeID, data) {
  return function(dispatch) {
    dispatch(challengeReportStart());
    let string = 'enterprise/challenge-report/' + challengeID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(challengeReportSuccess());
        }else {
          dispatch(challengeReportFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function acceptChallenge(challengeID, data) {
  return function(dispatch) {
    dispatch(acceptChallengeStart());
    let string = 'enterprise/accept-challenge/' + challengeID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(acceptChallengeSuccess());
        }else {
          dispatch(acceptChallengeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function challengeProgress(challengeID, data) {
  return function(dispatch) {
    dispatch(progressChallengeStart());
    let string = 'enterprise/challenge-progress/' + challengeID;
    return ApiUtils.get(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(progressChallengeSuccess(jsonBody));
        }else {
          dispatch(progressChallengeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function challengeLeaderboard(challengeID, data) {
  return function(dispatch) {
    dispatch(leaderboardChallengeStart());
    let string = 'enterprise/challenge-leaderboard/' + challengeID;
    return ApiUtils.get(string)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(leaderboardChallengeSuccess(jsonBody));
        }else {
          dispatch(leaderboardChallengeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function addEmployee(companyID, data) {
  return function(dispatch) {
    dispatch(requestAddEmployee());
    let string = 'enterprise/invite-employee/' + companyID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestAddEmployeeSuccess());
        }else {
          dispatch(requestAddEmployeeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function addDepartments(companyID, data) {
  return function(dispatch) {
    dispatch(requestAddDepartment());
    let string = 'enterprise/add-department/' + companyID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestAddDepartmentSuccess());
        }else {
          dispatch(requestAddDepartmentFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}


export function addOffices(companyID, data) {
  return function(dispatch) {
    dispatch(requestAddOffice());
    let string = 'enterprise/add-office/' + companyID;
    return ApiUtils.post(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(requestAddOfficeSuccess());
        }else {
          dispatch(requestAddOfficeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function removeDepartment(companyID, data) {
  return function(dispatch) {
    console.log(data);
    dispatch(removeDepartmentStart());
    let string = 'enterprise/delete-department/' + companyID;
    return ApiUtils.delete(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(removeDepartmentSuccess());
        }else {
          dispatch(removeDepartmentFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function removeOffice(companyID, data) {
  return function(dispatch) {
    dispatch(removeOfficeStart());
    console.log(data);
    let string = 'enterprise/delete-office/' + companyID;
    return ApiUtils.delete(string, data)
      .then(([response, jsonBody]) => {
        if (response.status == 200) {
          dispatch(removeOfficeSuccess());
        }else {
          dispatch(removeOfficeFail(jsonBody.message));
        }
      }).catch(err => {
        console.log('Error: ', err);
      })
  }
}
