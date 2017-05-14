import React from 'react';

import TaskList from '../components/TaskList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.parentID = parseInt(props.params.parentID, 10) || null;
  }

  render () {
    return (
      <TaskList parentID={this.parentID} alternateDepth={true} />
    );
  }
}
