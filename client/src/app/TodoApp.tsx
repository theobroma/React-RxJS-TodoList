import * as React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
//testing HTML structure
import TodoMVC from './helpers/TodoMVC';
import MainApp from './containers/MainApp';

class TodoApp extends React.Component {
  render() {
    return (
      <div className="App">
        <section className="todoapp">
          <MainApp />
        </section>
      </div>
    );
  }
}

// Don't delete
// TodoAppcomponent for testing https://github.com/tastejs/todomvc-app-css
// class TodoApp extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <section className="todoapp">
//           <TodoMVC />
//         </section>
//       </div>
//     );
//   }
// }

export default TodoApp;
