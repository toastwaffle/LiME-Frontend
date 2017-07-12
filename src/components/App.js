import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {SettingActionCreators} from '../actions/settings';
import TaskList from '../components/TaskList';
import TaskHeader from '../components/TaskHeader';

class App extends React.Component {
  parentID() {
    return parseInt(this.props.match.params.parentID, 10) || null;
  }

  componentDidMount() {
    this.props.actions.getSettings();
  }

  render() {
    return (
      <div className="App">
        {this.parentID() !== null ? <TaskHeader taskID={this.parentID()} /> : null}
        <TaskList parentID={this.parentID()} alternateDepth={true} />
      </div>
    );
  }
}
App.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SettingActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(App);
