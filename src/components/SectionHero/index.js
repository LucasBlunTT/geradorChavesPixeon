import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ImageCapta from '../../assets/Capta.ico';
import ImageDocscan from '../../assets/DocScan.ico';
import ImagePixprint from '../../assets/PixPrint.ico';
import { SectioHeroStyle } from './styles';
import { Container } from '../../styles/global';
import { Input } from '../Input';
import Image from 'next/image';
import axios from 'axios';

export function SectionHero() {
  const [nome, setNome] = useState('');
  const [estacao, setEstacao] = useState('');
  const [email, setEmail] = useState('');
  const [aplicacao, setAplicacao] = useState('');
  const [cliente, setCliente] = useState('');
  const [dataExpir, setDataExpir] = useState('');
  const [select, setSelect] = useState('StandAlone');
  const [file, setFile] = useState(null);

  useEffect(() => {
    let date = new Date();

    let diaAtual = date.getDate();
    let mesAtual = date.getMonth() + 1;
    let anoAtual = date.getFullYear();
    let anoFuturo = anoAtual + 3;
    let dataFormatada = `${anoFuturo}-${
      mesAtual < 10 ? '0' + mesAtual : mesAtual
    }-${diaAtual < 10 ? '0' + diaAtual : diaAtual}`;
    setDataExpir(dataFormatada);
  }, []);

  function handleClickAplicacao(event) {
    event.preventDefault;
    setAplicacao(event.target.getAttribute('data-aplicacao'));
  }

  function handleFileChange(event) {
    event.preventDefault();

    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  async function handleEnviarFormulario(event) {
    event.preventDefault();

    const dados = {
      name: nome,
      client: cliente,
      station: estacao,
      date: dataExpir,
      email: email,
      software: aplicacao,
      software_capta_mode: aplicacao !== 'Capta' ? 'StandAlone' : select,
    };

    const formData = new FormData();
    formData.append('name', dados.name);
    formData.append('client', dados.client);
    formData.append('station', dados.station);
    formData.append('date', dados.date);
    formData.append('email', dados.email);
    formData.append('software', dados.software);
    formData.append('software_capta_mode', dados.software_capta_mode);
    formData.append('file', file);

    formData.forEach((form) => console.log(form));

    axios
      .post('http://10.10.1.84:3333/keygen', formData)
      .then((response) => {
        console.log(response.data); // Lida com a resposta da API
      })
      .catch((error) => {
        console.error(error); // Lida com erros na requisição
      });
  }

  return (
    <SectioHeroStyle aplicacao={aplicacao}>
      <Container>
        <h1>Ativação de Chave de Software Pixeon</h1>

        <form onSubmit={handleEnviarFormulario}>
          <Input
            required
            id="nome"
            label="Nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Nome"
          />
          <Input
            required
            id="estacao"
            label="Estacao"
            type="text"
            value={estacao}
            onChange={(event) => setEstacao(event.target.value)}
            placeholder="Estacao"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <Input
            id="cliente"
            label="Cliente"
            type="text"
            required
            value={cliente}
            onChange={(event) => setCliente(event.target.value)}
            placeholder="Cliente"
          />
          <Input
            required
            id="data"
            label="Data Expiração"
            type="date"
            min="2023-06-28"
            max={dataExpir}
            value={dataExpir}
            onChange={(event) => setDataExpir(event.target.value)}
          />
          <label htmlFor="file-input" className="file-label">
            <span>{file ? file.name : 'Escolher Arquivo'}</span>
            <Input
              id="file-input"
              className="file-input"
              required
              type="file"
              onChange={handleFileChange}
            />
          </label>

          <div className="produtos">
            {aplicacao === 'Capta' && (
              <select
                value={select}
                onChange={({ target }) => setSelect(target.value)}
              >
                <option value="StandAlone">StandAlone</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            )}
            <ul>
              <li>
                <Image
                  src={ImageCapta}
                  alt="capta"
                  data-aplicacao="Capta"
                  onClick={handleClickAplicacao}
                />
                <span>Capta</span>
              </li>
              <li>
                <Image
                  src={ImagePixprint}
                  alt="pixprint"
                  data-aplicacao="PixPrint"
                  onClick={handleClickAplicacao}
                />
                <span>Pixprint</span>
              </li>
              <li>
                <Image
                  src={ImageDocscan}
                  alt="docscan"
                  data-aplicacao="Docscan"
                  onClick={handleClickAplicacao}
                />
                <span>Docscan</span>
              </li>
            </ul>
          </div>
          <button>Gerar Licença</button>
        </form>
      </Container>
    </SectioHeroStyle>
  );
}
