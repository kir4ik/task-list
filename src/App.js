import React from 'react';
import ReactDOM from 'react-dom';

import './styles/app.scss';
import TaskList from'./components/TaskList';

ReactDOM.render(
  <TaskList />,
  document.getElementById('app'));