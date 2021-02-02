import * as React from 'react';
import { connect } from 'react-redux';

//test comment
import TodoTextInput from './TodoTextInput';

interface HeaderProps {
  addTodo: (text: string) => any;
}

export default class Header extends React.Component<HeaderProps> {
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }
  //onSave same name method as in TodoItem component
  //caused by reuse in different components: this and TodoItem as edit input
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave.bind(this)}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
