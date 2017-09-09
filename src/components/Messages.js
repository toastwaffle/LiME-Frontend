import '../css/Messages.css';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import Message from './Message';
import PropTypes from 'prop-types';
import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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
    messages: state.messages
  };
}

export default connect(mapStateToProps)(Messages);
