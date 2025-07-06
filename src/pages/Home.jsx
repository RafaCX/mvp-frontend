import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Card, Statistic } from 'antd';
import { BookOutlined, PlusOutlined, StarOutlined, FrownOutlined } from '@ant-design/icons';
import BookCard from '../components/BookCard';
import LivroModal from '../components/LivroModal'; // Importa o modal
import Loader from '../components/Loader';
import FeedbackMessage from '../components/FeedbackMessage';
import { searchBooks } from '../services/api';

const { Title, Paragraph } = Typography;

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, categories: 0, recent: 0 });
  const [modalAberto, setModalAberto] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData();
    loadUserData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const response = await searchBooks('bestsellers OR popular books', 6);
      setFeaturedBooks(response.items || []);
    } catch (err) {
      setError('Erro ao buscar livros em destaque.');
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = () => {
    const savedBooks = JSON.parse(localStorage.getItem('livrosCadastrados') || '[]');

    const recent = savedBooks.filter(book => {
      const date = new Date(book.dateAdded || book.id);
      const limit = new Date();
      limit.setDate(limit.getDate() - 30);
      return date > limit;
    });

    const categories = new Set(savedBooks.map(b => b.genero || b.category)).size;

    setAllBooks(savedBooks);
    setStats({ total: savedBooks.length, categories, recent: recent.length });
  };

  const abrirModal = (livro) => {
    setLivroSelecionado(livro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setLivroSelecionado(null);
    setModalAberto(false);
  };

  const contarFavoritos = (titulo) =>
    allBooks.filter((livro) => livro.titulo === titulo && livro.favorito).length;

  const contarNaoGostou = (titulo) =>
    allBooks.filter((livro) => livro.titulo === titulo && livro.naoGostou).length;

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh', padding: 24 }}>
      <Card style={{ borderRadius: 16, background: '#649FBF', color: '#fff' }}>
        <Title level={2} style={{ color: '#fff' }}>
          Bem-vindo à Biblioteca Interativa
        </Title>
        <Paragraph style={{ color: '#fff' }}>
          Explore nosso acervo, cadastre novos livros e descubra o poder da leitura!
        </Paragraph>
        <Button
          type="default"
          icon={<BookOutlined />}
          onClick={() => navigate('/livros')}
          style={{ marginRight: 12 }}
        >
          Ver Livros
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/cadastro')}
          style={{ background: '#fff', color: '#649FBF' }}
        >
          Cadastrar Livro
        </Button>
      </Card>

    <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
  <Col xs={24} sm={12} md={12} lg={6}>
    <Card>
      <Statistic title="Livros Cadastrados" value={stats.total} />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={12} lg={6}>
    <Card>
      <Statistic title="Recentes (30 dias)" value={stats.recent} />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={12} lg={6}>
    <Card>
      <Statistic
        title="Favoritos"
        value={allBooks.filter(b => b.favorito).length}
        prefix={<StarOutlined />}
      />
    </Card>
  </Col>
  <Col xs={24} sm={12} md={12} lg={6}>
    <Card>
      <Statistic
        title="Não Gostou"
        value={allBooks.filter(b => b.naoGostou).length}
        prefix={<FrownOutlined />}
      />
    </Card>
  </Col>
</Row>


      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700"> Livros cadastrados localmente:</h2>

        {allBooks.length === 0 ? (
          <p className="text-gray-500">Nenhum livro cadastrado ainda.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            {allBooks.map((livro) => (
              <div key={livro.id} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                <BookCard livro={livro} onClick={() => abrirModal(livro)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DETALHES DO LIVRO */}
      <LivroModal
        visible={modalAberto}
        onClose={fecharModal}
        livro={livroSelecionado}
        totalFavoritos={livroSelecionado ? contarFavoritos(livroSelecionado.titulo) : 0}
        totalNaoGostou={livroSelecionado ? contarNaoGostou(livroSelecionado.titulo) : 0}
      />
    </div>
  );
}
