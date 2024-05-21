import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>HOME</>} />
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </Router>
  );
}

export default App;
