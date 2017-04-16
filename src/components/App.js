import React from 'react';

import TaskList from '../components/TaskList';

export default class App extends React.Component {
  render () {
    return (
      <TaskList parentID={null} alternateDepth={true} />
    );
  }
}
