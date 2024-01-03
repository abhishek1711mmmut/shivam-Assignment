// Board.js
import React from 'react';
import Column from './Column';

const Board = ({ columns, groupedTasks }) => {
    // console.log('gptsk', groupedTasks)
    // console.log(groupedTasks)
    // console.log('column', columns)
  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column}
          column={column}
          tasks={groupedTasks[column] || []}
        />
      ))}
    </div>
  );
};

export default Board;
