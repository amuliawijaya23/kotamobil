import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<>Hello</>} />
          <Route path="/login" element={<>Login</>} />
          <Route path="/register" element={<>Register</>} />
          <Route path="/listings" element={<>Listings</>} />
        </Route>
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </Router>
  );
}

export default App;
