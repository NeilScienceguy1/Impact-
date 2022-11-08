import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import RealHome from './pages/RealHome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/app" element={<Home />} />
        <Route path="/" element={<RealHome/>} />
      </Routes>
    </Router>

  ); 
}

export default App;
