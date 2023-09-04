import {browserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

//Pages and components
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <browserRouter>
        <div className='pages'>
          <Routes>
            <Routes path="/"element={<Home />} />
          
          </Routes>
        </div>
      </browserRouter>
    </div>
  );
}

export default App;
