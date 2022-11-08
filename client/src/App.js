import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

  ); 
}

export default App;
