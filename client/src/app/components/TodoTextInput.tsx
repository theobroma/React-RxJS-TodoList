import * as React from 'react';
import * as classNames from 'classnames';

interface TodoTextInputProps {
  addTodo: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
}
interface TodoTextInputState {
  text: string;
}
//class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState>
class TodoTextInput extends React.Component<any, any> {
  static defaultProps = {
    text: '',
    placeholder: 'What needs to be done?',
    editing: false,
    newTodo: false
  };

  state = {
    text: ''
  };
  //FIXME: no state update after receiving props
  //https://github.com/reactjs/rfcs/issues/26
  // componentWillReceiveProps(nextProps: any) {
  //   this.setState({ text: nextProps.text });
  // }

  // componentDidUpdate(prevProps: any) {
  //   console.log(prevProps);
  // }

  // static getDerivedStateFromProps(nextProps: any, prevState: any) {
  //   if (prevState.text !== nextProps.text) {
  //     return {
  //       text: nextProps.text
  //     };
  //   } else {
  //     return null;
  //   }
  // }

  // handleSubmit(e: any) {
  //   const text = e.target.value.trim();
  //   if (e.which === 13) {
  //     this.props.addTodo(text);
  //     if (this.props.newTodo) {
  //       this.setState({ text: '' });
  //     }
  //   }
  // }

  handleSubmit = (e: any) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  };

  handleChange(e: any) {
    //console.log('handleChange');
    this.setState({ text: e.target.value });
  }

  handleBlur(e: any) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <React.Fragment>
        <input
          className={classNames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })}
          type="text"
          placeholder={this.props.placeholder}
          autoFocus={true}
          value={this.state.text}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
        />
        {/* <pre>{JSON.stringify(this.state, null, 4)}</pre> */}
      </React.Fragment>
    );
  }
}

export default TodoTextInput;
