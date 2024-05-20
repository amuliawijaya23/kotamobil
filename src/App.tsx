import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<>HOME</>} />
          <Route path="*" element={<>NOT FOUND</>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
