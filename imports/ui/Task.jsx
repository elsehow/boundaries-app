import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';


// Task component - represents a single todo item
export default class Task extends Component {

 deleteThisTask() {
   Meteor.call('tasks.remove', this.props.task._id);

  }

  render() {
    return (
    <li>
     <button className="delete" onClick={this.deleteThisTask.bind(this)}>
        &times;
      </button>
      {this.props.task.createdAt.toString()}
    </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
