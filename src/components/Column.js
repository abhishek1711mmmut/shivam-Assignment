// Column.js
import React from 'react';
import Task from './Task';

const Column = ({ column, tasks }) => {
  return (
    <div className="column">
      <h3>{column}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
