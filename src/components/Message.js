import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdError from 'react-icons/lib/md/error';
import MdWarning from 'react-icons/lib/md/warning';
import MdInfo from 'react-icons/lib/md/info';
import MdDone from 'react-icons/lib/md/done';

import {AppActionCreators} from '../actions/app';
import Config from '../Config';

import '../styles/Message.css';

const icons = {
  'error': <MdError className='messageIcon' />,
  'warning': <MdWarning className='messageIcon' />,
  'info': <MdInfo className='messageIcon' />,
  'success': <MdDone className='messageIcon' />,
};

class Message extends React.Component {
  componentWillMount () {
    setTimeout(
      () => this.props.actions.clearMessage(this.props.id),
      Config.messageTimeout);
  }

  disappear(e) {
    e.preventDefault();
    this.props.actions.clearMessage(this.props.id);
  }

  render () {
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
    actions: bindActionCreators(AppActionCreators, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Message);
