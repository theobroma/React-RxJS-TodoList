//Don't delete this!
//Very useful template for understanding structure of  https://github.com/tastejs/todomvc-app-css
import * as React from 'react';
import * as cx from 'classnames';
//mock data if needed
import todoarr from './mockdata';
import { Todo, IState } from '../model';

interface TodoItemProps {
  todo: Todo;
  key?: any;
}

interface TodoItemState {
  completed: boolean;
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      completed: this.props.todo.completed
    };
  }

  //   <li className={cx({ completed: this.props.todo.completed, editing: this.props.editing })}>
  //   <div className="view">
  //     <input className="toggle" type="checkbox" />
  //     <label onDoubleClick={this.handleEdit}>{this.props.todo.title}</label>
  //     <button className="destroy" onClick={this.props.onDestroy} />
  //   </div>
  //   <input className="edit" />
  // </li>

  render() {
    return (
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>{this.props.todo.text}</label>
          <button className="destroy" />
        </div>
        <input className="edit" />
      </li>
    );
  }
}

export default class TodoMVC extends React.Component<{}, {}> {
  renderTodos() {
    return todoarr.reverse().map(todo => <TodoItem key={todo._id} todo={todo} />);
  }

  render() {
    return (
      <div>
        {/*Header*/}
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" />
        </header>
        {/*Main*/}
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">toggle-all</label>
          <ul className="todo-list">{this.renderTodos()}</ul>
        </section>
        {/*Footer*/}
        <footer className="footer">
          <span className="todo-count">
            <strong>12</strong> items left
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                {' '}
                All{' '}
              </a>
            </li>{' '}
            <li>
              <a href="#/active">Active</a>
            </li>{' '}
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </div>
    );
  }
}
