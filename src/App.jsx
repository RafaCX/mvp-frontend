// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Livros from './pages/Livros';
import Cadastro from './pages/Cadastro';
import NotFound from './pages/NotFound';
import LivroModal from './components/LivroModal'; // Importa o modal

function App() {
  return (
    <Router>
      {/* Header presente em todas as páginas */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/livro/:id" element={<LivroModal />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
