import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, SearchResults, ItemDetail } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
