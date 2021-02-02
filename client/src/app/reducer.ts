import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Action, AnyAction } from 'redux';
import { Todo, IState } from './model';
//mock todos reducer with data
import mockData from './helpers/mockdata';
import {
  SET_FILTER,
  TODOS_AJAX_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_FULFILLED,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_FULFILLED,
  ADD_TODO_REQUEST,
  ADD_TODO_FULFILLED,
  REMOVE_TODO_REQUEST,
  REMOVE_TODO_FULFILLED,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_FULFILLED,
  TODOS_REMOVE_COMPLETED_REQUEST,
  TODOS_REMOVE_COMPLETED_FULFILLED,
  EDIT_TODO_REQUEST,
  EDIT_TODO_FULFILLED,
  EDIT_TODO_REJECTED
} from './actions';

//filter reducer
function filter(state = 'SHOW_ALL', action: any) {
  if (action.type === SET_FILTER) {
    return action.filter;
  }
  return state;
}

//data from file
const DefaultState: any = mockData;

const initialState = {
  data: [],
  pending: false,
  error: null
};

function todos(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
    case ADD_TODO_REQUEST:
    case TOGGLE_TODO_REQUEST:
    case REMOVE_TODO_REQUEST:
    case TODOS_REMOVE_COMPLETED_REQUEST:
    case EDIT_TODO_REQUEST:
      return {
        ...state,
        error: null,
        pending: true
      };
    case FETCH_TODOS_FULFILLED:
      return {
        ...state,
        pending: false,
        data: action.response
      };
    case ADD_TODO_FULFILLED:
      return {
        ...state,
        pending: false,
        data: [
          {
            _id: action.response.todo._id,
            completed: false,
            text: action.response.todo.text
          },
          ...state.data
        ]
      };
    case REMOVE_TODO_FULFILLED:
      return {
        ...state,
        pending: false,
        data: state.data.filter((todo: any) => todo._id !== action._id)
      };
    case TOGGLE_TODO_FULFILLED:
      return {
        ...state,
        data: state.data.map((todo: any) => {
          if (todo._id === action._id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
      };
    case TODOS_REMOVE_COMPLETED_FULFILLED:
      return {
        ...state,
        data: state.data.filter((todo: any) => !todo.completed)
      };
    case EDIT_TODO_FULFILLED:
      return {
        ...state,
        data: state.data.map((todo: any) => {
          if (todo._id === action.id) {
            return { ...todo, text: action.text };
          }
          return todo;
        })
      };
    default:
      return state;
  }
}

//epic for testing
// const users = (state = {}, action: any) => {
//   switch (action.type) {
//     case FETCH_USER_FULFILLED:
//       return {
//         ...state,
//         // `login` is the username
//         [action.payload.login]: action.payload
//       };

//     default:
//       return state;
//   }
// };

export default combineReducers({
  filter,
  todos
});
