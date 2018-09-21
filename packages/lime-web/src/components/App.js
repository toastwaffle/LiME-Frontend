import {DragDropContext} from 'react-dnd';
import {SettingActionCreators} from '../actions/settings';
import {TagActionCreators} from '../actions/tags';
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
    this.props.settingActions.getSettings();
    this.props.tagActions.getTagsAndGroups();
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
  match: PropTypes.object.isRequired,
  settingActions: PropTypes.object.isRequired,
  tagActions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    settingActions: bindActionCreators(SettingActionCreators, dispatch),
    tagActions: bindActionCreators(TagActionCreators, dispatch),
  };
}

export default (
  connect(null, mapDispatchToProps)(
    DragDropContext(HTML5Backend)(
      App)));
