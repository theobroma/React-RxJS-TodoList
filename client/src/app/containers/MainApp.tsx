//Very useful template for understanding structure of  https://github.com/tastejs/todomvc-app-css
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import * as cx from 'classnames';

import { Todo, IState } from '../model';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

import { setFilter, addTodo, removeTodo, toggleTodo, removeCompleted, editTodo } from '../actions';
//import getTodos from '../api';
//import { fetchTodos } from '../actions';
interface AppProps {}

class MainApp extends React.Component<any, any> {
  componentDidMount() {
    //this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;
    let footer;

    const activeTodoCount = todos.reduce(function(accum: any, todo: any) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <Footer
          count={activeTodoCount}
          completedCount={completedCount}
          filter={this.props.currentFilter}
          setFilter={this.props.setFilter}
          removeCompleted={this.props.removeCompleted}
        />
      );
    }

    return (
      <div>
        {/*Header*/}
        <Header addTodo={this.props.addTodo} />
        {/*Main*/}
        <MainSection
          todos={todos}
          completedCount={completedCount}
          filter={this.props.currentFilter}
          addTodo={this.props.addTodo}
          removeTodo={this.props.removeTodo}
          toggleTodo={this.props.toggleTodo}
          editTodo={this.props.editTodo}
        />
        {/*Footer*/}
        {footer}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    todos: state.todos.data,
    currentFilter: state.filter
  };
}

const mapDispatchToProps = (dispatch: any) => ({
  setFilter: (filter: string) => dispatch(setFilter(filter)),
  removeCompleted: () => dispatch(removeCompleted()),
  addTodo: (text: string) => dispatch(addTodo(text)),
  removeTodo: (id: string) => dispatch(removeTodo(id)),
  toggleTodo: (id: string, completed: boolean, text: string) => {
    //console.log('TOGGLE');
    return dispatch(toggleTodo(id, completed, text));
  },
  editTodo: (id: string, completed: boolean, text: string) => {
    return dispatch(editTodo(id, completed, text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
