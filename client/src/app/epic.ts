//example epic to fetch data from github user profile
import { combineEpics } from 'redux-observable';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
const { ajax } = Observable;

import {
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

const createErrorAction = (message: any) => (error: any) =>
  Observable.of({
    type: TODOS_AJAX_FAILURE,
    error,
    message
  });

//store.dispatch(fetchTodos()) in app.tsx

// const fetchUserEpic = (action$: any) => {
//   return action$
//     .ofType(FETCH_USER)
//     .mergeMap((action: any) =>
//       ajax
//         .getJSON(`https://api.github.com/users/${action.payload}`)
//         .map(response => fetchUserFulfilled(response))
//     );
// };

const fetchTodosEpic = (action$: any) => {
  return action$.ofType(FETCH_TODOS_REQUEST).mergeMap((action: any) =>
    ajax
      .getJSON(` http://localhost:3001/todos`)
      .map(response => ({ type: FETCH_TODOS_FULFILLED, response }))
      .catch(createErrorAction('Failed to fetch tasks'))
  );
};

const addTodoEpic = (action$: any) =>
  action$.ofType(ADD_TODO_REQUEST).mergeMap((action: any) => {
    //console.log(action);
    return ajax
      .post(
        'http://localhost:3001/todos',
        {
          text: action.payload
        },
        { 'Content-Type': 'application/json' }
      )
      .map(({ response }) => ({ type: ADD_TODO_FULFILLED, response }))
      .catch(createErrorAction('Failed to add a new task'));
  });

const removeTodoEpic = (action$: any) =>
  action$.ofType(REMOVE_TODO_REQUEST).mergeMap((action: any) => {
    //console.log(action);
    return ajax
      .delete(`http://localhost:3001/todos/${action.payload}`)
      .map(() => ({ type: REMOVE_TODO_FULFILLED, _id: action.payload }))
      .catch(createErrorAction(`Failed to remove task #${action.payload}`));
  });

const toggleTodoEpic = (action$: any) =>
  action$.ofType(TOGGLE_TODO_REQUEST).mergeMap((action: any) => {
    //console.log(action);
    return ajax
      .patch(
        `http://localhost:3001/todos/${action.payload.id}`,
        {
          _id: action.payload.id,
          completed: !action.payload.completed,
          text: action.payload.text
        },
        { 'Content-Type': 'application/json' }
      )
      .map(() => ({ type: TOGGLE_TODO_FULFILLED, _id: action.payload.id }))
      .catch(createErrorAction(`Failed to toggle task #${action.payload.id}`));
  });

// remove all completed todos ONE BY ONE using ALREADY existing server endpoint
const removeCompletedEpic = (action$: any, { getState }: any) => {
  return action$.ofType(TODOS_REMOVE_COMPLETED_REQUEST).mergeMap(() =>
    Observable.forkJoin(
      ...getState()
        .todos.data.filter((todo: any) => {
          //console.log(todo);
          return todo.completed;
        })
        .map((todo: any) => ajax.delete(`http://localhost:3001/todos/${todo._id}`))
    )
      .map(() => ({ type: TODOS_REMOVE_COMPLETED_FULFILLED }))
      .catch(createErrorAction('Failed to remove all completed tasks'))
  );
};

const editTodoEpic = (action$: any) =>
  action$.ofType(EDIT_TODO_REQUEST).mergeMap((action: any) =>
    ajax
      .patch(
        `http://localhost:3001/todos/${action.payload.id}`,
        {
          _id: action.payload.id,
          completed: action.payload.completed,
          text: action.payload.text
        },
        { 'Content-Type': 'application/json' }
      )
      .map(() => ({ type: EDIT_TODO_FULFILLED, id: action.payload.id, text: action.payload.text }))
      .catch(createErrorAction(`Failed to edit task #${action.id}`))
  );

export default combineEpics(
  fetchTodosEpic,
  addTodoEpic,
  removeTodoEpic,
  toggleTodoEpic,
  removeCompletedEpic,
  editTodoEpic
);
