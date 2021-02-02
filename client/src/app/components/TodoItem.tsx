import * as React from 'react';
import * as cx from 'classnames';
//mock data if needed
import { Todo, IState } from '../model';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  key?: any;
}

interface TodoItemState {
  completed: boolean;
}

export class TodoItem extends React.Component<any, any> {
  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id: string, text: string, completed: boolean) => {
    if (text.length === 0) {
      this.props.removeTodo(id);
    } else {
      this.props.editTodo(id, completed, text);
    }
    this.setState({ editing: false });
  };
  //onSave same name method as in Header component
  //caused by reuse in different components: this and Header
  render() {
    const { removeTodo, toggleTodo } = this.props;
    const { _id, text, completed } = this.props.todo;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={text}
          editing={this.state.editing}
          addTodo={this.props.addTodo}
          onSave={(text: any) => this.handleSave(_id, text, completed)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(_id, completed, text)}
          />
          <label htmlFor="itself" onDoubleClick={this.handleDoubleClick}>
            {text}
          </label>
          <button className="destroy" onClick={() => removeTodo(_id)} />
        </div>
      );
    }

    return (
      <li className={cx({ completed: completed, editing: this.state.editing })}>
        {/* <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={e => {
              this.props.toggleTodo(_id, completed, text);
            }}
          />
          <label htmlFor="itself" onDoubleClick={this.handleDoubleClick}>
            {text}
          </label>
          <button className="destroy" onClick={() => removeTodo(_id)} />
        </div>
        <input className="edit" /> */}
        {element}
      </li>
    );
  }
}

export default TodoItem;
