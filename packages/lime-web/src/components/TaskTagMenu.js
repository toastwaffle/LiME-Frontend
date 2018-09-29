import '../css/TaskTagMenu.css';
import {handleChange} from '../utils';
import I18n from './I18n';
import PropTypes from 'prop-types';
import React from 'react';
import TagMenuTagList from './TagMenuTagList';

export default class TaskTagMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  clearForm() {
    this.setState({searchText: ''});
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    return (
      <div className='TaskTagMenu'>
        <div className='rightShift'>
          <I18n
            component='input'
            type='text'
            placeholder='SEARCH_TAGS'
            value={this.state.searchText}
            childRef={(input) => { this.searchInput = input; }}
            onChange={handleChange('searchText').bind(this)} />
          <TagMenuTagList task={this.props.task} searchText={this.state.searchText} hideMenu={this.props.hideMenu} />
        </div>
      </div>
    );
  }
}
TaskTagMenu.propTypes = {
  task: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};
