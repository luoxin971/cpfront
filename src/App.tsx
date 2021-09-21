
import './App.css';
import * as service from './copypaste/service/copypaste';

import Offical from './copypaste/Official';
import { Button } from 'antd';

function App() {
  return (
    <div className="App">
      <h1>在线编辑器</h1>
      <Offical />
    </div>

  );
}

export default App;
