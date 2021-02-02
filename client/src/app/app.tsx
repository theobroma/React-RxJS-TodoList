import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchUser, fetchTodos, addTodo, editTodo } from './actions';
import rootReducer from './reducer';
import rootEpic from './epic';

import './styles/index.scss';
import TodoApp from './TodoApp';

const epicMiddleware = createEpicMiddleware(rootEpic);

const logger = createLogger({
  // Collapse actions that don't have errors
  //need to fix in ts
  //collapsed: (getState, action, logEntry) => !logEntry.error
  collapsed: true
});

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, epicMiddleware)));

//for epic todos
store.dispatch(fetchTodos());
//for epic test
const obj = {
  id: '5b19897c55813b16b4c44080',
  text: 'from app.tsx',
  completed: false
};
//store.dispatch(fetchUser('redux-observable'));
//store.dispatch(addTodo({ text: 'my new todo from epic' }));

//store.dispatch(editTodo(obj.id, obj.completed, obj.text));

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
