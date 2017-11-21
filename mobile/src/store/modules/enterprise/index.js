import * as Actions from './actions';

const initialState = {
  data: [],
  isFetching: false,
  status: null,
  employees: [],
  prizes: [],
  progress: [],
  leaders: [],
  // code: localStorage.getItem('interface') || 0,
  // isOnboard : localStorage.getItem('isOnboard') || false
};

export default function enterprise(state = initialState,action){
  switch (action.type) {
    case Actions.FETCH_CHALLENGES_START:
      return {
        ...state,
        isFetching: true,
      };
    case Actions.FETCH_CHALLENGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.challenges
      };
    case Actions.FETCH_CHALLENGES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.FETCH_EMPLOYEES_START:
      return {
        ...state,
        isFetching: true,
      };
    case Actions.FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employees: action.employees
      };
    case Actions.FETCH_EMPLOYEES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.UPDATE_CHALLENGE_START:
      return {
        ...state,
        isFetching: true,
        status: null
      };
    case Actions.UPDATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: 1
      };
    case Actions.UPDATE_CHALLENGE_FAIL:
      return {
        ...state,
        error: action.error,
        status: null
      };
    case Actions.START_EDITING_ACTIVITIES:
      return {
        ...state,
        isEditing: true
      };
    case Actions.END_EDITING_ACTIVITIES:
      return {
        ...state,
        isEditing: false
      };

    case Actions.CREATE_CHALLENGE_START:
      return {
        ...state,
        isFetching: true,
        status: null
      };
    case Actions.CREATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: 1
      };
    case Actions.CREATE_CHALLENGE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        status: null
      };
    case Actions.FETCH_COMPANY_PRIZES_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.FETCH_COMPANY_PRIZES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        prizes: action.prizes
      };
    case Actions.FETCH_COMPANY_PRIZES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.ADD_PRIZE_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.ADD_PRIZE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.ADD_PRIZE_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.CHALLENGE_REPORT_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.CHALLENGE_REPORT_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.CHALLENGE_REPORT_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case Actions.ACCEPT_CHALLENGE_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.ACCEPT_CHALLENGE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.ACCEPT_CHALLENGE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case Actions.PROGRESS_CHALLENGE_START:
      return {
        ...state,
        error: action.error,
        isFetching: true
      };
    case Actions.PROGRESS_CHALLENGE_SUCCESS:
      return {
        ...state,
        progress: action.payload,
        isFetching: false
      };
    case Actions.PROGRESS_CHALLENGE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };

    case Actions.CHALLENGE_LEADERBOARD_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.CHALLENGE_LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaders: action.payload,
        isFetching: false
      };
    case Actions.CHALLENGE_LEADERBOARD_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case Actions.ADD_EMPLOYEE_START:
      return {
        ...state,
        isFetching: true,
        addEmployee: false
      };
    case Actions.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        addEmployee: true,
        isFetching: false
      };
    case Actions.ADD_EMPLOYEE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        addEmployee: false
      };
    case Actions.ADD_OFFICE_START:
      return {
        ...state,
        isFetching: true,
        addOffice: false
      };
    case Actions.ADD_OFFICE_SUCCESS:
      return {
        ...state,
        addOffice: true,
        isFetching: false
      };
    case Actions.ADD_OFFICE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        addOffice: false
      };
    case Actions.ADD_DEPARTMENT_START:
      return {
        ...state,
        isFetching: true,
        addDepartment: false
      };
    case Actions.ADD_DEPARTMENT_SUCCESS:
      return {
        ...state,
        addDepartment: true,
        isFetching: false
      };
    case Actions.ADD_DEPARTMENT_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        addDepartment: false
      };
    case Actions.CHANGE_INTERFACE:
      // localStorage.setItem('interface', action.code);
      return {
        ...state,
        code: action.code
      };
    case Actions.EMPLOYEES_ONBOARD:
      // localStorage.setItem('isOnboard', true);
      return {
        ...state,
        isOnboard: true
      };
    case Actions.REMOVE_DEPARTMENT_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.REMOVE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.REMOVE_DEPARTMENT_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case Actions.REMOVE_OFFICE_START:
      return {
        ...state,
        isFetching: true
      };
    case Actions.REMOVE_OFFICE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.REMOVE_OFFICE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    default:
      return state
  }
}
