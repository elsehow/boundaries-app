import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks')

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      owner: this.userId
    });
  });
}

Meteor.methods({

  'tasks.insert'() {
    // Make sure the user is logged in before inserting a task
    if (! this.userId)
      throw new Meteor.Error('not-authorized')
    // insert a task
    Tasks.insert({
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    // make sure only the owner can delete it
    // if (task.owner !== this.userId)
    //   throw new Meteor.Error('not-authorized');
    // remove a task
    Tasks.remove(taskId)
  },

})
