// App.js
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import './App.css';

const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [data, setData] = useState(null);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');

  var [columns, setcolumns] = useState(['Todo', 'Backlog', 'In progress']);

  useEffect(()=>{
    if(groupingOption==='status'){
      setcolumns(['Todo', 'Backlog', 'In progress']);
    }else if(groupingOption==='userId'){
      setcolumns(['usr-1','usr-2','usr-3','usr-4','usr-5']);
    }else{
      setcolumns(['0','1','2','3','4'])
    }
  },[groupingOption])


  // making api call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingOption = localStorage.getItem('sortingOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    localStorage.setItem('groupingOption', option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
    localStorage.setItem('sortingOption', option);
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  const { tickets } = data;

  function getGroupedAndSortedTasks (tickets) {
    let groupedTasks = {};
    tickets.forEach((ticket) => {
      const groupKey = ticket[groupingOption];
      // console.log('grpkey',groupKey)
      if (!groupedTasks[groupKey]) {
        groupedTasks[groupKey] = [];
      }
      groupedTasks[groupKey].push(ticket);
    });

    Object.keys(groupedTasks).forEach((key) => {
      groupedTasks[key] = groupedTasks[key].sort((a, b) => {
        if (sortingOption === 'priority') {
          return b.priority - a.priority;
        } else if (sortingOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return groupedTasks;
  };

  const groupedAndSortedTasks = getGroupedAndSortedTasks(tickets);


  return (
    <div className="App">
      <h1>Lead Frontend assignment by Shivam Gupta</h1>
      {/* <h1>Kanban Board App</h1> */}
      <div className="options">
        <label>
          Group by:
          <select onChange={(e) => handleGroupingChange(e.target.value)} value={groupingOption}>
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select onChange={(e) => handleSortingChange(e.target.value)} value={sortingOption}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <Board columns={columns} groupedTasks={groupedAndSortedTasks} />
    </div>
  );
}

export default App;
