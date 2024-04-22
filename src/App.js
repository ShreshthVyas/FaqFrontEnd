import { BrowserRouter as Router, Routes, Link , Route} from 'react-router-dom';
import HomePage from './HomePage'
import Admin from './Admin'
function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/admin/add" element={<Admin />} />  
        </Routes>
    </Router>
  );
}

export default App;