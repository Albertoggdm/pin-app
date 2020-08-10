import React from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import PinPad from './comoponents/PinPad/PinPad';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PinPad />
      </header>
    </div>
  );
}

export default App;
