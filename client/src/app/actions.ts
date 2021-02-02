import axios from 'axios';
export const TODOS_AJAX_FAILURE = 'TODOS_AJAX_FAILURE';

export const FETCH_USER_REQUEST = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = ' FETCH_USER_REJECTED';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS';
export const FETCH_TODOS_FULFILLED = 'FETCH_TODOS_FULFILLED';
export const FETCH_TODOS_REJECTED = ' FETCH_TODOS_REJECTED';

export const ADD_TODO_REQUEST = ' ADD_TODO';
export const ADD_TODO_FULFILLED = ' ADD_TODO_FULFILLED';
export const ADD_TODO_REJECTED = ' ADD_TODO_REJECTED';

export const REMOVE_TODO_REQUEST = 'REMOVE_TODO';
export const REMOVE_TODO_FULFILLED = 'REMOVE_TODO_FULFILLED';
export const REMOVE_TODO_REJECTED = ' REMOVE_TODO_REJECTED';

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO';
export const TOGGLE_TODO_FULFILLED = 'TOGGLE_TODO_FULFILLED';
export const TOGGLE_TODO_REJECTED = ' TOGGLE_TODO_REJECTED';

export const TODOS_REMOVE_COMPLETED_REQUEST = 'TODOS_REMOVE_COMPLETED_REQUEST';
export const TODOS_REMOVE_COMPLETED_FULFILLED = 'TODOS_REMOVE_COMPLETED_FULFILLED';
export const TODOS_REMOVE_COMPLETED_REJECTED = 'TODOS_REMOVE_COMPLETED_REJECTED';

export const EDIT_TODO_REQUEST = 'EDIT_TODO_REQUEST';
export const EDIT_TODO_FULFILLED = 'EDIT_TODO_FULFILLED';
export const EDIT_TODO_REJECTED = 'EDIT_TODO_REJECTED';

export const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter: any) => {
  return {
    type: 'SET_FILTER',
    filter
  };
};

//fethchUser just for test epic
export const fetchUser = (username: any) => ({ type: FETCH_USER_REQUEST, payload: username });
export const fetchUserFulfilled = (payload: any) => {
  //console.log(payload);
  return { type: FETCH_USER_FULFILLED, payload };
};

export const fetchTodos = () => ({ type: FETCH_TODOS_REQUEST });
export const fetchTodosFulfilled = (payload: any) => {
  //console.log(payload);
  return { type: FETCH_TODOS_FULFILLED, payload };
};

//export const addTodo = (todo: any) => ({ type: ADD_TODO, payload: todo });
export const addTodo = (todo: any) => {
  // console.log(todo);
  return { type: ADD_TODO_REQUEST, payload: todo };
};
export const addTodoFulfilled = (payload: any) => {
  //console.log(payload);
  return { type: ADD_TODO_FULFILLED, payload };
};
export const addTodoRejected = (payload: any) => {
  //console.log(payload);
  return { type: ADD_TODO_REJECTED, payload };
};

export const removeTodo = (id: string) => {
  // console.log(id);
  return { type: REMOVE_TODO_REQUEST, payload: id };
};

export const toggleTodo = (id: string, completed: boolean, text: string) => {
  //console.log(completed);
  return { type: TOGGLE_TODO_REQUEST, payload: { id, completed, text } };
};
export const editTodo = (id: string, completed: boolean, text: string) => {
  //console.log(completed);
  return { type: EDIT_TODO_REQUEST, payload: { id, completed, text } };
};
//removeCompleted
export const removeCompleted = () => ({ type: TODOS_REMOVE_COMPLETED_REQUEST });
