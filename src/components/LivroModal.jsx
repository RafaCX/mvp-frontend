// src/components/LivroModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Typography, Tag } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const LivroModal = ({ visible, onClose, livro, totalFavoritos, totalNaoGostou }) => {
  const [livroLocal, setLivroLocal] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [naoGostos, setNaoGostos] = useState([]);
  const [internalVisible, setInternalVisible] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
 

  const isControlled = !!livro; // se vier via props, é controlado
  const isRouted = !!id; // se veio via rota

  useEffect(() => {
    if (isRouted) {
      const livros = JSON.parse(localStorage.getItem('livrosCadastrados') || '[]');
      const encontrado = livros.find((l) => l.id.toString() === id);
      setLivroLocal(encontrado);
      setFavoritos(livros.filter((l) => l.favorito));
      setNaoGostos(livros.filter((l) => l.naoGostou));
      setInternalVisible(true);
    }
  }, [id]);

  const fecharModal = () => {
    if (isControlled) {
      onClose(); // modo normal
    } else {
      if (location.key !== 'default') {
        navigate(-1); // volta à página anterior
      } else {
        navigate('/'); // fallback
      }
    }
  };

  const livroExibir = isControlled ? livro : livroLocal;
  const showModal = isControlled ? visible : internalVisible;

  if (!livroExibir) return null;

  const totalFav = isControlled
    ? totalFavoritos
    : favoritos.filter((l) => l.titulo === livroExibir.titulo).length;

  const totalNao = isControlled
    ? totalNaoGostou
    : naoGostos.filter((l) => l.titulo === livroExibir.titulo).length;

  return (
    <Modal
      open={showModal}
      onCancel={fecharModal}
      onOk={fecharModal}
      footer={null}
      title={livroExibir.titulo}
    >
      <Title level={5}>Autor: {livroExibir.autor}</Title>
      <Paragraph><strong>Editora:</strong> {livroExibir.editora || '—'}</Paragraph>
      <Paragraph><strong>Gênero:</strong> {livroExibir.genero || '—'}</Paragraph>
      <Paragraph><strong>Ano de Publicação:</strong> {livroExibir.ano_publicacao || '—'}</Paragraph>
      <Paragraph><strong>Sinopse:</strong> {livroExibir.sinopse || '—'}</Paragraph>
      <Paragraph><strong>Nota Pessoal:</strong> {livroExibir.nota_pessoal || '—'}</Paragraph>
      <Paragraph>
        {livroExibir.favorito && <Tag color="gold">Favorito</Tag>}
        {livroExibir.naoGostou && <Tag color="red">Não Gostou</Tag>}
      </Paragraph>
      <Paragraph>
        <Tag color="green">Total Favoritado: {totalFav}</Tag>
        <Tag color="volcano">Total Não Gostou: {totalNao}</Tag>
      </Paragraph>
    </Modal>
  );
};

export default LivroModal;
