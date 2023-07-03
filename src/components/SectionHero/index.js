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
  const [select, setSelect] = React.useState('StandAlone');
  const [captaStyle, setCaptaStyle] = useState(null);
  const [docscanStyle, setDocscanStyle] = useState(null);
  const [pixprintStyle, setPixprintStyle] = useState(null);

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
    //setCaptaStyle({ opacity: 0.5 });
  }

  async function handleEnviarFormulario(event) {
    event.preventDefault();

    if (select === 'enterprise') dados.software_capta_mode = 'enterprise';

    const dados = {
      name: nome,
      client: cliente,
      station: estacao,
      date: dataExpir,
      email: email,
      software: aplicacao,
      software_capta_mode: select,
    };

    console.log(dados);

    axios
      .post('/api/seu-endpoint', dados)
      .then((response) => {
        console.log(response.data); // Lida com a resposta da API
      })
      .catch((error) => {
        console.error(error); // Lida com erros na requisição
      });
  }

  function handleClick() {
    
  }

  return (
    <SectioHeroStyle>
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
              <li style={captaStyle}>
                <Image
                  src={ImageCapta}
                  alt="capta"
                  data-aplicacao="Capta"
                  onClick={handleClickAplicacao}
                />
              </li>
              <li>
                <Image
                  src={ImagePixprint}
                  alt="pixprint"
                  data-aplicacao="PixPrint"
                  onClick={handleClickAplicacao}
                />
              </li>
              <li>
                <Image
                  src={ImageDocscan}
                  alt="docscan"
                  data-aplicacao="Docscan"
                  onClick={handleClickAplicacao}
                />
              </li>
            </ul>
          </div>
          <button>Gerar Licença</button>
        </form>
      </Container>
    </SectioHeroStyle>
  );
}
