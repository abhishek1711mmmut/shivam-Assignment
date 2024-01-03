// Task.js
import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="task">
      <div className="task-title">{task.title}</div>
      <div className="task-details">
        <div>Status: {task.status}</div>
        <div>User: {task.userId}</div>
        <div>Priority: {task.priority}</div>
      </div>
    </div>
  );
};

export default Task;
