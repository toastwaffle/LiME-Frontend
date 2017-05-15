import React from 'react';

import TaskList from '../components/TaskList';
import TaskHeader from '../components/TaskHeader';

export default class App extends React.Component {
  parentID() {
    return parseInt(this.props.params.parentID, 10) || null;
  }

  render () {
    return (
      <div className="App">
        {this.parentID() !== null ? <TaskHeader taskID={this.parentID()} /> : null}
        <TaskList parentID={this.parentID()} alternateDepth={true} />
      </div>
    );
  }
}
