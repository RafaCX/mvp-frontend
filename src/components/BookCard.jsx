import React from 'react';
import { Card, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ livro, onDelete }) => {
  const navigate = useNavigate();

  if (!livro) return null;

  return (
    <Card
      onClick={() => navigate(`/livro/${livro.id}`)}
      title={
        <span>
          {livro.titulo} {livro.favorito && <span style={{ color: '#FFD700' }}>★</span>}
        </span>
      }
      bordered={false}
      style={{
        borderRadius: 16,
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}
      hoverable
      extra={
        onDelete && (
          <div onClick={(e) => e.stopPropagation()}>
            <Popconfirm
              title="Deseja remover este livro?"
              onConfirm={onDelete}
              okText="Sim"
              cancelText="Não"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </div>
        )
      }
    >
      <p><strong>Autor:</strong> {livro.autor || '—'}</p>
      <p><strong>Editora:</strong> {livro.editora || '—'}</p>
      <p><strong>Ano:</strong> {livro.ano_publicacao || '—'}</p>

      {livro.sinopse && <p><strong>Sinopse:</strong> {livro.sinopse}</p>}
      {livro.nota_pessoal && <p><strong>Nota Pessoal:</strong> {livro.nota_pessoal}</p>}

      {livro.naoGostou && (
        <p><strong style={{ color: 'red' }}>👎 Não gostou do livro</strong></p>
      )}
    </Card>
  );
};

export default BookCard;
