import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Message from './Message';

import '../styles/Messages.css';

class Messages extends React.Component {
  render() {
    if (this.props.messages.length > 0) {
      return (
        <div className='Messages'>
          {this.props.messages.map(message => <Message key={message.id} {...message} />)}
        </div>
      );
    } else {
      return null;
    }
  }
}
Messages.propTypes = {messages: PropTypes.array.isRequired};

function mapStateToProps(state) {
  return {
    messages: state.app.messages
  };
}

export default connect(mapStateToProps)(Messages);
