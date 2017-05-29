import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import {ModalActionCreators} from '../actions/modals';

import '../styles/ModalContainer.css';

class ModalContainer extends React.Component {
  render () {
    return (
      <CSSTransitionGroup component='div' className='ModalContainer' transitionName='modal' transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {
          this.props.modal !== null ?
          <CSSTransitionGroup component='div' className='modalOverlay' transitionName='modal' transitionEnterTimeout={250} transitionLeaveTimeout={250} onClick={this.props.actions.closeTopModal}>
            {this.props.modal.component}
          </CSSTransitionGroup> :
          null
        }
      </CSSTransitionGroup>
    );
  }
}
ModalContainer.propTypes = {
  modal: PropTypes.object
};

function mapStateToProps(state) {
  return {
    modal: state.modals.length > 0 ? state.modals.slice(-1)[0] : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
