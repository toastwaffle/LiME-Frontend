import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Message from './Message';

import '../styles/Messages.css';

class Messages extends React.Component {
  render() {
    return (
      <CSSTransitionGroup component='div' className='Messages' transitionName="messages" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {this.props.messages.map(message => <Message key={message.id} {...message} />)}
      </CSSTransitionGroup>
    );
  }
}
Messages.propTypes = {messages: PropTypes.array.isRequired};

function mapStateToProps(state) {
  return {
    messages: state.app.messages
  };
}

export default connect(mapStateToProps)(Messages);
