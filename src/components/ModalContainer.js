import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import {ModalActionCreators} from '../actions/modals';

import '../styles/ModalContainer.css';

class ModalContainer extends React.Component {
  render () {
    return (
      <div className='ModalContainer'>
        <TransitionGroup>
          {
            this.props.modal !== null ?
              <CSSTransition classNames='modal' timeout={250} in={this.props.modal !== null}>
                <div className='modalOverlay' onClick={this.props.actions.closeTopModal}>
                  {this.props.modal.component}
                </div>
              </CSSTransition> :
              null
          }
        </TransitionGroup>
      </div>
    );
  }
}
ModalContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object,
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
