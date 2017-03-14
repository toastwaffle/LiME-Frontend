import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {AppActionCreators} from '../actions/app';

class Message extends React.Component {
  disappear(e) {
    e.preventDefault();
    this.props.actions.clearMessage(this.props.id);
  }

  render () {
    return (
      <div className={'Message ' + this.props.level} onClick={this.disappear.bind(this)}>
        {this.props.message}
      </div>
    );
  }
}
Message.propTypes = {
  id: React.PropTypes.string.isRequired,
  level: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Message);
