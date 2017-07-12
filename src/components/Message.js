import '../styles/Message.css';
import {MessageActionCreators} from '../actions/messages';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Config from '../Config';
import MdDone from 'react-icons/lib/md/done';
import MdError from 'react-icons/lib/md/error';
import MdInfo from 'react-icons/lib/md/info';
import MdWarning from 'react-icons/lib/md/warning';
import PropTypes from 'prop-types';
import React from 'react';

const icons = {
  'error': <MdError className='messageIcon' />,
  'warning': <MdWarning className='messageIcon' />,
  'info': <MdInfo className='messageIcon' />,
  'success': <MdDone className='messageIcon' />,
};

class Message extends React.Component {
  componentWillMount() {
    setTimeout(
      () => this.props.actions.clearMessage(this.props.id),
      Config.messageTimeout);
  }

  disappear(e) {
    e.preventDefault();
    this.props.actions.clearMessage(this.props.id);
  }

  render() {
    return (
      <div className={'Message ' + this.props.level} onClick={this.disappear.bind(this)} title='Click to dismiss...'>
        {icons[this.props.level]}
        {this.props.message}
      </div>
    );
  }
}
Message.propTypes = {
  actions: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MessageActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Message);
