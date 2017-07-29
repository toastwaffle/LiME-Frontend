import {DragDropContext} from 'react-dnd';
import {SettingActionCreators} from '../actions/settings';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import React from 'react';
import TaskHeader from './TaskHeader';
import TaskList from './TaskList';

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

export default (
  connect(null, mapDispatchToProps)(
    DragDropContext(HTML5Backend)(
      App)));
