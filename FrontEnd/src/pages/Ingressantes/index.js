import React, { useState } from 'react';

export default function Login({ history }) {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  const estados = {
    "SP": ["Mogi das Cruzes", "Suzano", "Poá", "Guararema"],
    "RJ": ["Angra dos Reis", "Niterói", "Itaboraí"],
    "MG": ["Belo Horizonte", "Monte Azul", "Muzambinho"]
  };

  function handleCadastro(event) {
    event.preventDefault();
    // Gravar no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('curso', curso);
    localStorage.setItem('estado', estado);
    localStorage.setItem('cidade', cidade);
    // Redirecionar para a página de sucesso
    history.push('/dashboard');
  }

  function handleEstadoChange(event) {
    setEstado(event.target.value);
    setCidade('');
  }

  function handleCidadeChange(event) {
    setCidade(event.target.value);
  }

  return (
    <div className={"container"}>
      <div className='content'>
        <h1>
          Cadastro de Ingressantes
        </h1>
        <form onSubmit={handleCadastro}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome"
            value={nome}
            onChange={event => setNome(event.target.value)}
          />
          <label htmlFor="curso">Curso</label>
          <select name="curso" id="curso" value={curso} onChange={event => setCurso(event.target.value)}>
            <option value="matematica">Matemática</option>
            <option value="letras">Letras</option>
            <option value="geografia">Geográfia</option>
          </select>
          <label htmlFor="estado">Estado</label>
          <select name="estado" id="estado" value={estado} onChange={handleEstadoChange}>
            <option value="">Selecione um estado</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
          </select>
          <label htmlFor="cidade">Cidade</label>
          <select name="cidade" id="cidade" value={cidade} onChange={handleCidadeChange} disabled={!estado}>
            <option value="">Selecione uma cidade</option>
            {estados[estado] && estados[estado].map(cidade => (
              <option key={cidade} value={cidade}>{cidade}</option>
            ))}
          </select>
          <div className='center-form'>
            <button className="btn-voltar" type="button" onClick={() => history.goBack()}>Voltar</button>
            <button className="btn" type="submit">Gravar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
