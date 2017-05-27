import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {AppActionCreators} from '../actions/app';

import '../styles/Message.css';

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
  id: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Message);
