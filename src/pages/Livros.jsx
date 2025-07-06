import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Input } from 'antd';
import api from '../services/api';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import { Tooltip } from 'antd';

import LivroModal from '../components/LivroModal';

const { Title } = Typography;
const { Search } = Input;

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [naoGostos, setNaoGostos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = (livro) => {
    setLivroSelecionado(livro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setLivroSelecionado(null);
    setModalAberto(false);
  };

  const contarFavoritos = (titulo) =>
    [...favoritos, ...livros].filter((livro) => livro.titulo === titulo && livro.favorito).length;

  const contarNaoGostou = (titulo) =>
    [...naoGostos, ...livros].filter((livro) => livro.titulo === titulo && livro.naoGostou).length;

  useEffect(() => {
    const livrosLocal = JSON.parse(localStorage.getItem('livrosCadastrados')) || [];
    setFavoritos(livrosLocal.filter((livro) => livro.favorito === true));
    setNaoGostos(livrosLocal.filter((livro) => livro.naoGostou === true));
  }, []);

  const buscarLivrosExternos = async (termo) => {
    if (!termo.trim()) {
      setErro('Digite um termo para busca.');
      setLivros([]);
      return;
    }

    setCarregando(true);
    setErro('');
    try {
      const response = await api.get('/externo/livros', { params: { titulo: termo } });
      const livrosEncontrados = response.data.livros || response.data || [];
      setLivros(livrosEncontrados);
      if (livrosEncontrados.length === 0) {
        setErro('Nenhum livro encontrado na API externa.');
      }
    } catch (error) {
      setErro('Erro ao buscar livros na API externa.');
      setLivros([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />

      <div style={{ background: '#f2f2f2', minHeight: '100vh', padding: '0px 24px' }}>
        <Card style={{ borderRadius: 16, background: '#f2f2f2', marginBottom: 16 }}>
          <Title level={2} style={{ color: '#000', textAlign: 'center' }}>
            Busca de Livros na API Externa
          </Title>
  <Tooltip title="Digite o título de um livro e clique em 'Buscar' para consultar na API externa"
   placement="topLeft"
   arrow={false}
    overlayInnerStyle={{
    backgroundColor: '#649FBF',
    color: '#fff',
    fontSize: '14px',
  }}>
  <Search
    placeholder="Digite o título do livro"
    enterButton="Buscar"
    size="large"
    value={termoBusca}
    onChange={(e) => setTermoBusca(e.target.value)}
    onSearch={buscarLivrosExternos}
    loading={carregando}
    allowClear
  />
</Tooltip>

        </Card>

        {/* Seção da busca */}
        <div style={{ marginTop: 32 }}>
          {carregando && <Loader />}
          {erro && <FeedbackMessage tipo="erro" mensagem={erro} />}
          {!carregando && livros.length === 0 && !erro && (
            <FeedbackMessage tipo="aviso" mensagem="Nenhum livro buscado." />
          )}

          <Row gutter={[16, 16]}>
            {livros.map((livro, index) => (
              <Col xs={24} sm={12} md={8} key={`api-${index}`}>
                <BookCard livro={livro} onClick={() => abrirModal(livro)} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Favoritos */}
        {favoritos.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <Title level={3} style={{ color: '#649FBF' }}>
              ⭐ Meus Favoritos
            </Title>
            <Row gutter={[16, 16]}>
              {favoritos.map((livro, index) => (
                <Col xs={24} sm={12} md={8} key={`fav-${index}`}>
                  <BookCard livro={livro} onClick={() => abrirModal(livro)} />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Não Gostou */}
        {naoGostos.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <Title level={3} style={{ color: '#BF6464' }}>
              ❌ Livros que Não Gostei
            </Title>
            <Row gutter={[16, 16]}>
              {naoGostos.map((livro, index) => (
                <Col xs={24} sm={12} md={8} key={`naoGostou-${index}`}>
                  <BookCard livro={livro} onClick={() => abrirModal(livro)} />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Modal de Detalhes */}
        <LivroModal
          visible={modalAberto}
          onClose={fecharModal}
          livro={livroSelecionado}
          totalFavoritos={livroSelecionado ? contarFavoritos(livroSelecionado.titulo) : 0}
          totalNaoGostou={livroSelecionado ? contarNaoGostou(livroSelecionado.titulo) : 0}
        />
      </div>
    </>
  );
};

export default Livros;
