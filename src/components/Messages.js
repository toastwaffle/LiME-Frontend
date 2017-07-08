import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Message from './Message';

import '../styles/Messages.css';

class Messages extends React.Component {
  render() {
    return (
      <div className='Messages'>
        <TransitionGroup>
          {this.props.messages.map(message => (
            <CSSTransition key={message.id} classNames='message' timeout={250}>
              <Message {...message} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
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
