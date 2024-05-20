import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Paper } from '@mui/material';

function App() {
  return (
    <Router>
      <main>
        <Box component={Paper}>
          <Routes>
            <Route path="/" element={<>HOME</>} />
            <Route path="*" element={<>NOT FOUND</>} />
          </Routes>
        </Box>
      </main>
    </Router>
  );
}

export default App;
