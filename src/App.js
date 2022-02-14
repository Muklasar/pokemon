import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Details from './components/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
