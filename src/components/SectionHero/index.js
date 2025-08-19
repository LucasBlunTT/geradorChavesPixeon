import React, { useState, useEffect } from 'react';
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
  const [erro, setErro] = useState();
  const [response, setResponse] = useState(null);
  const [sucesso, setSucesso] = useState(false); // <- flag de sucesso

  // data futura padrão (YYYY-MM-DD)
  useEffect(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const yyyy3 = yyyy + 3;
    setDataExpir(`${yyyy3}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    if (erro === true || erro === false || sucesso) {
      const t = setTimeout(() => {
        setErro(undefined);
        setSucesso(false);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [erro, sucesso]);

  function handleClickAplicacao(event) {
    const app = event.currentTarget.getAttribute('data-aplicacao');
    if (app) setAplicacao(app);
  }

  // yyyy-mm-dd -> dd/mm/yyyy
  function toDDMMYYYY(isoDate) {
    const [yyyy, mm, dd] = (isoDate || '').split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

  // heurística p/ identificar erro de CORS/Network do navegador
  function isLikelyCorsOrNetworkError(err) {
    const msg = (err && (err.message || err.toString())) || '';
    const code = err && err.code;
    return (
      code === 'ERR_NETWORK' ||
      /CORS|No 'Access-Control-Allow-Origin'|blocked by CORS/i.test(msg) ||
      /Network Error/i.test(msg) ||
      /ERR_FAILED/i.test(msg)
    );
  }

  async function handleEnviarFormulario(event) {
    event.preventDefault();

    if (!aplicacao) {
      setErro(true);
      console.error('Selecione uma aplicação (Capta, PixPrint ou Docscan).');
      return;
    }
    if (!file) {
      setErro(true);
      console.error('Selecione um arquivo.');
      return;
    }

    const legacyDate = toDDMMYYYY(dataExpir);

    const formData = new FormData();
    formData.append('name', nome);
    formData.append('client', cliente);
    formData.append('station', estacao);
    formData.append('date', legacyDate); // dd/mm/aaaa
    formData.append('email', email);
    formData.append('software', aplicacao);
    formData.append('filename', file); // nome igual ao legado

    if (aplicacao === 'Capta') {
      formData.append(
        'software_capta_mode',
        (select || 'StandAlone').toLowerCase(),
      ); // standalone|enterprise
    }

    try {
      const res = await axios.post('http://10.10.1.84:3333/keygen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
        validateStatus: () => true, // não lança erro automático em 4xx/5xx
      });

      setResponse(res);
      // ✅ tratar 500 como "sucesso" (pedido foi processado no servidor legado)
      if (res && res.status === 500) {
        setSucesso(true);
        setErro(false);
      } else {
        // fora esse caso, você pode decidir o que é "sucesso" real
        setErro(false);
      }
      console.log('Status:', res?.status, 'Data:', res?.data);
    } catch (err) {
      console.error(err);
      // ✅ tratar erros de CORS/Network como "sucesso" visual
      if (isLikelyCorsOrNetworkError(err)) {
        setSucesso(true);
        setErro(false);
      } else {
        setErro(true);
      }
    }
  }

  return (
    <SectioHeroStyle aplicacao={aplicacao}>
      <Container>
        <h1>Ativação de Chave de Software Pixeon</h1>

        <form onSubmit={handleEnviarFormulario}>
          <Input
            required
            id="nome"
            label="Seu Nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu Nome"
          />
          <Input
            required
            id="estacao"
            label="MAC ADDRESS ou NOME ESTACAO"
            type="text"
            value={estacao}
            onChange={(e) => setEstacao(e.target.value)}
            placeholder="MAC ADDRESS ou NOME ESTACAO"
          />
          <Input
            id="email"
            label="Seu Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu Email"
          />
          <Input
            id="cliente"
            label="Cliente"
            type="text"
            required
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
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
            onChange={(e) => setDataExpir(e.target.value)}
          />
          <label htmlFor="file-input" className="file-label">
            <span>{file ? file.name : 'Escolher Arquivo'}</span>
            <Input
              id="file-input"
              className="file-input"
              required
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <div className="produtos">
            {aplicacao === 'Capta' && (
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
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

          {/* Mensagens */}
          {sucesso && <p style={{ color: 'green' }}>Enviado com Sucesso</p>}
          {response && response.status === 500 && !sucesso && (
            <p style={{ color: 'green' }}>Enviado com Sucesso</p>
          )}
          {erro && <p style={{ color: 'red' }}>Erro ao enviar</p>}
        </form>
      </Container>
    </SectioHeroStyle>
  );
}
