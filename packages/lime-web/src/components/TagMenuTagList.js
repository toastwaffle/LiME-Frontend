import '../css/TagMenuTagList.css';
import {TagActionCreators} from '../actions/tags';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {extractOrdered,propertyComparator} from '../utils';
import I18n from './I18n';
import PropTypes from 'prop-types';
import React from 'react';

class TagMenuTagList extends React.Component {
  applyTag(tagID) {
    return function() {
      this.props.actions.applyTagToTasks(tagID, [this.props.task.object_id], this.props.hideMenu);
    };
  }

  render() {
    var tagToLi = function(tag) {
      var classes = ['tag'];
      if (tag.group_id !== null) classes.push('inGroup');
      return (
        <li className={classes.join(' ')} key={'tag-'+tag.object_id} onClick={this.applyTag(tag.object_id).bind(this)}>{tag.title}</li>
      );
    }.bind(this);
    var entries = this.props.tags.map(tagToLi).concat(
      this.props.groups.map(({group, tags}) => {
        return [
          <li className='group' key={'group-'+group.object_id}>{group.title}</li>
        ].concat(tags.map(tagToLi));
      })
    );
    return (
      <ul className='TagMenuTagList'>
        {
          entries.length > 0
            ? entries
            : <I18n component='li' className='notFound' key='notFound'>NO_TAGS_FOUND</I18n>
        }
      </ul>
    );
  }
}
TagMenuTagList.propTypes = {
  searchText: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const matchesSearch = function(text) {
    return text.toLowerCase().includes(props.searchText.toLowerCase());
  };

  return {
    groups: Object.values(state.tag_groups).filter(
      (group) => matchesSearch(group.title)
    ).map((group) => {
      return {
        group,
        tags: extractOrdered(state.tags, 'group_id', group.object_id).filter(
          tag => !props.task.tag_ids.includes(tag.object_id))
      };
    }),
    tags: Object.values(state.tags).filter(
      (tag) => (
        matchesSearch(tag.title) &&
        !props.task.tag_ids.includes(tag.object_id) &&
        (props.searchText !== '' || tag.group_id === null)
      )
    ).sort(propertyComparator('title')),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TagActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagMenuTagList);
