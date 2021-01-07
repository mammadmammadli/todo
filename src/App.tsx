import * as React from 'react';
import './App.scss';
import { Tasks } from './modules/Tasks';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
