import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element = {<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
