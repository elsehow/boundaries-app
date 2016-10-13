import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';


class App extends Component {

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('tasks.insert');
  }

  renderTasks() {
    return this.props.tasks
      .filter(task =>  {
        return task.owner === Meteor.userId()
      })
      .map((task) => (
          <Task key={task._id} task={task} />
      ));
  }

  renderUI () {
    return (
        <div>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <button>Add</button>
          </form>
          <ul>
            {this.renderTasks()}
          </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
        </header>
      { this.props.currentUser ? this.renderUI() : ''}
      </div>
    );
  }

}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: { createdAt: -1 }}).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
