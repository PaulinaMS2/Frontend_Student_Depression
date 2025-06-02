import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home'
import Form from './Pages/Form/form'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/form' element = {<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
