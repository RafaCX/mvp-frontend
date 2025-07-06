import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Typography, Checkbox } from 'antd';
import { useLocalStorage } from '../hooks/useLocalStorage';
import FeedbackMessage from '../components/FeedbackMessage';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import LivroModal from '../components/LivroModal'; // Novo componente importado

const { TextArea } = Input;
const { Text } = Typography;

const Cadastro = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [genero, setGenero] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [favorito, setFavorito] = useState(false);
  const [naoGostou, setNaoGostou] = useState(false);
  const [notaPessoal, setNotaPessoal] = useState('');
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('sucesso');
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [livros, setLivros] = useLocalStorage('livrosCadastrados', []);

  // Modal
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = (livro) => {
    setLivroSelecionado(livro);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setLivroSelecionado(null);
  };

  const contarFavoritos = (titulo) =>
    livros.filter((livro) => livro.titulo === titulo && livro.favorito).length;

  const contarNaoGostou = (titulo) =>
    livros.filter((livro) => livro.titulo === titulo && livro.naoGostou).length;

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTentouEnviar(true);

    if (!titulo.trim() || !autor.trim()) {
      setMensagem('❗ Preencha pelo menos os campos obrigatórios: Título e Autor.');
      setTipoMensagem('aviso');
      return;
    }

    const novoLivro = {
      id: Date.now(),
      titulo,
      autor,
      editora,
      genero,
      ano_publicacao: anoPublicacao,
      sinopse,
      favorito,
      naoGostou,
      nota_pessoal: notaPessoal,
    };

    const atualizados = [...livros, novoLivro];
    setLivros(atualizados);

    try {
      await axios.post('http://localhost:3001/livros', novoLivro);
      setMensagem('✅ Livro cadastrado com sucesso!');
      setTipoMensagem('sucesso');
    } catch (err) {
      console.error('Erro ao salvar no backend:', err);
      setMensagem('⚠️ Erro ao salvar o livro no servidor. Mas ele foi salvo localmente.');
      setTipoMensagem('aviso');
    }

    setTitulo('');
    setAutor('');
    setEditora('');
    setGenero('');
    setAnoPublicacao('');
    setSinopse('');
    setFavorito(false);
    setNaoGostou(false);
    setNotaPessoal('');
    setTentouEnviar(false);
  };

  const handleBusca = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/externo/livros?titulo=${busca}`);
      setResultados(res.data.livros);
    } catch (err) {
      setMensagem('Erro ao buscar livros na API externa.');
      setTipoMensagem('erro');
    }
  };

  const preencherCampos = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setEditora(livro.editora);
    setAnoPublicacao(livro.ano_publicacao);
    setSinopse(livro.sinopse);
    setMensagem('Dados preenchidos a partir da API externa.');
    setTipoMensagem('sucesso');
  };

  const deletarLivro = (id) => {
    const atualizados = livros.filter((livro) => livro.id !== id);
    setLivros(atualizados);
    setMensagem('✅ Livro deletado com sucesso!');
    setTipoMensagem('sucesso');
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Header />
      <div style={{ padding: '0px 24px' }}>
        <Card
          style={{
            width: '100%',
            margin: '24px auto',
            borderRadius: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderColor: '#649FBF',
          }}
          headStyle={{
            backgroundColor: '#649FBF',
            color: '#fff',
            fontSize: '20px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
          title="Cadastrar Livro"
        >
          {mensagem && (
            <div style={{ marginBottom: 8 }}>
              <FeedbackMessage tipo={tipoMensagem} mensagem={mensagem} />
            </div>
          )}

          <Input.Search
            placeholder="Buscar na API externa (Google Books)"
            enterButton="Buscar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onSearch={handleBusca}
            style={{ width: '100%', marginBottom: 12, height: 32 }}
          />

          {resultados.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <h3>📚 Resultados encontrados:</h3>
              <ul className="space-y-2">
                {resultados.map((livro, i) => (
                  <li key={i} className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm">
                    <strong>{livro.titulo}</strong> — {livro.autor}
                    <Button type="link" onClick={() => preencherCampos(livro)} style={{ padding: 0 }}>
                      Usar este
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ flex: '1 1 48%' }}>
                <Campo label="Título" valor={titulo} setValor={setTitulo} obrigatorio tentouEnviar={tentouEnviar} />
              </div>
              <div style={{ flex: '1 1 48%' }}>
                <Campo label="Autor" valor={autor} setValor={setAutor} obrigatorio tentouEnviar={tentouEnviar} />
              </div>
              <div style={{ flex: '1 1 48%' }}>
                <Campo label="Editora" valor={editora} setValor={setEditora} />
              </div>
              <div style={{ flex: '1 1 48%' }}>
                <Campo label="Gênero" valor={genero} setValor={setGenero} />
              </div>
              <div style={{ flex: '1 1 48%' }}>
                <Campo label="Ano de Publicação" valor={anoPublicacao} setValor={setAnoPublicacao} tipo="number" />
              </div>
              <div style={{ flex: '1 1 48%' }}>
                <div >
                  <Text strong style={{ fontSize: '15px' }}>Sinopse</Text>
                  <TextArea
                    placeholder="Breve descrição da obra"
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    rows={1}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 10, marginTop:8 }}>
              <Text strong style={{ fontSize: '15px' }}>Nota pessoal</Text>
              <TextArea
                placeholder="Observações pessoais sobre o livro"
                value={notaPessoal}
                onChange={(e) => setNotaPessoal(e.target.value)}
                rows={1}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Checkbox checked={favorito} onChange={(e) => setFavorito(e.target.checked)} disabled={naoGostou}>
                Marcar como favorito
              </Checkbox>
              <Checkbox checked={naoGostou} onChange={(e) => setNaoGostou(e.target.checked)} disabled={favorito}>
                Não gostei do livro
              </Checkbox>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#649FBF',
                borderRadius: '8px',
                width: '100%',
                height: '34px',
                fontSize: '14px',
              }}
            >
              Cadastrar
            </Button>
          </form>
        </Card>

        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Livros cadastrados localmente:</h2>

          {livros.length === 0 ? (
            <p className="text-gray-500">Nenhum livro cadastrado ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              {livros.map((livro) => (
                <div key={livro.id} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                  <BookCard
                    livro={livro}
                    onDelete={() => deletarLivro(livro.id)}
                    onClick={() => abrirModal(livro)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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
};

const Campo = ({ label, valor, setValor, tipo = 'text', obrigatorio = false, tentouEnviar }) => {
  const mostrarErro = obrigatorio && tentouEnviar && !valor.trim();

  return (
    <div style={{ marginBottom: 8 }}>
      <Text strong style={{ fontSize: '15px' }}>
        {label} {obrigatorio && <span style={{ color: 'red' }}>*</span>}
      </Text>
      <Input
        type={tipo}
        placeholder={label}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        style={{
          ...inputStyle,
          borderColor: mostrarErro ? 'red' : inputStyle.borderColor,
        }}
      />
    </div>
  );
};

const inputStyle = {
  width: '100%',
  maxWidth: '100%',
  borderColor: '#649FBF',
  borderRadius: '10px',
  marginTop: '6px',
  fontSize: '14px',
};

export default Cadastro;
