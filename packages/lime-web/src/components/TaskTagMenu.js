import '../css/TaskTagMenu.css';
import {handleChange} from '../utils';
import I18n from './I18n';
import React from 'react';

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
        </div>
      </div>
    );
  }
}
