import * as React from 'react';
import * as classnames from 'classnames';

export default class FilterLink extends React.Component<any, any> {
  render() {
    return (
      <li>
        <a
          href="#"
          onClick={() => this.props.setFilter(this.props.type)}
          className={classnames({ selected: this.props.filter === this.props.type })}
        >
          {this.props.children}
        </a>
      </li>
    );
  }
}
