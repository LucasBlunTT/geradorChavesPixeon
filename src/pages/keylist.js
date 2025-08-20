// pages/keylist.jsx
import axios from 'axios';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

// helper: "dd/mm/yyyy" | "yyyy-mm-dd" -> timestamp
function dateToTs(str) {
  if (!str) return 0;
  const s = String(str).trim();

  // dd/mm/yyyy ou dd-mm-yyyy
  let m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const d = parseInt(m[1], 10);
    const mo = parseInt(m[2], 10) - 1;
    const y = parseInt(m[3], 10);
    return new Date(y, mo, d).getTime();
  }

  // yyyy-mm-dd ou yyyy/mm/dd
  m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (m) {
    const y = parseInt(m[1], 10);
    const mo = parseInt(m[2], 10) - 1;
    const d = parseInt(m[3], 10);
    return new Date(y, mo, d).getTime();
  }

  const t = Date.parse(s);
  return Number.isNaN(t) ? 0 : t;
}

// chave não expirada = expiração >= hoje 00:00
function isNotExpired(expStr) {
  const expTs = dateToTs(expStr);
  if (!expTs) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expTs >= today.getTime();
}

// converte href do backend para passar pelo proxy /api
function toProxyHref(href) {
  if (!href) return '';
  if (href.startsWith('http')) {
    try {
      const u = new URL(href);
      return `${API_BASE}${u.pathname}${u.search || ''}`;
    } catch {
      return href; // fallback
    }
  }
  return `${API_BASE}${href.startsWith('/') ? href : `/${href}`}`;
}

// Parse simples no navegador (sem cheerio)
function parseHtmlToItems(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let table =
    doc.querySelector('.CSSTableGenerator table') || doc.querySelector('table');
  if (!table) return [];

  const rows = Array.from(table.querySelectorAll('tr'));
  const items = [];

  rows.forEach((tr, i) => {
    const tds = tr.querySelectorAll('td');
    if (tds.length === 7 && i > 0) {
      const a = tds[6].querySelector('a');
      const href = a?.getAttribute('href') || '';
      const downloadUrl = toProxyHref(href);
      items.push({
        name: tds[0].textContent.trim(),
        client: tds[1].textContent.trim(),
        station: tds[2].textContent.trim(),
        expiration: tds[3].textContent.trim(),
        application: tds[4].textContent.trim(),
        email: tds[5].textContent.trim(),
        downloadUrl,
      });
    }
  });

  return items
    .filter((it) => isNotExpired(it.expiration))
    .sort((a, b) => dateToTs(b.expiration) - dateToTs(a.expiration));
}

export default function KeylistPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [sortDir, setSortDir] = useState('desc'); // 'desc' = mais recente primeiro
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      // same-origin → passa pelo Nginx/rewrites
      const { data: html } = await axios.get(
        `${API_BASE}/keylist?_=${Date.now()}`,
        {
          responseType: 'text',
        },
      );
      setItems(parseHtmlToItems(html));
    } catch (e) {
      setItems([]);
      setError(String(e?.message || e));
    }
  }, []);

  useEffect(() => {
    // busca sempre que carregar/der refresh
    load();
  }, [load]);

  const filteredSorted = useMemo(() => {
    const query = q.trim().toLowerCase();

    const base = (
      query
        ? items.filter((r) =>
            [r.name, r.client, r.station, r.email, r.application]
              .filter(Boolean)
              .some((v) => v.toLowerCase().includes(query)),
          )
        : items
    ).filter((r) => isNotExpired(r.expiration));

    const sorted = [...base].sort(
      (a, b) => dateToTs(b.expiration) - dateToTs(a.expiration),
    );
    return sortDir === 'desc' ? sorted : sorted.reverse();
  }, [items, q, sortDir]);

  return (
    <div className="wrap">
      <header className="header">
        <h1>Chaves Geradas</h1>
        <div className="actions">
          <input
            placeholder="Pesquisar por nome, cliente, e-mail, aplicação…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            title="Alternar ordem por expiração"
          >
            {sortDir === 'desc' ? 'Mais recente ↓' : 'Mais antiga ↑'}
          </button>
          <button className="btn" onClick={load}>
            Atualizar agora
          </button>
        </div>
      </header>

      {error && <p className="error">Falha ao carregar: {error}</p>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cliente</th>
              <th>Estação</th>
              <th>Expira</th>
              <th>Aplicação</th>
              <th>Email</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredSorted.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.client}</td>
                <td className="mono">{r.station}</td>
                <td>{r.expiration}</td>
                <td>
                  <span
                    className={`badge ${`app_${(
                      r.application || ''
                    ).toLowerCase()}`}`}
                  >
                    {r.application}
                  </span>
                </td>
                <td>{r.email}</td>
                <td>
                  {r.downloadUrl ? (
                    <a
                      className="link"
                      href={r.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download da chave
                    </a>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredSorted.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        :global(body) {
          background: #f6f7fb;
        }
        .wrap {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .header h1 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .header input {
          width: 360px;
          max-width: 60%;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          background: #fff;
        }
        .btn {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
        }
        .btn:hover {
          background: #f3f4f6;
        }
        .card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        .table thead th {
          background: #f9fafb;
          font-weight: 700;
          text-align: left;
          padding: 12px 16px;
          border-bottom: 1px solid #eef2f7;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .table tbody td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .table tbody tr:hover td {
          background: #fafafa;
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          background: #eef2f7;
        }
        .app_capta {
          background: #eef2ff;
          color: #3730a3;
        }
        .app_pixprint {
          background: #fff7ed;
          color: #9a3412;
        }
        .app_docscan {
          background: #ecfdf5;
          color: #065f46;
        }
        .empty {
          text-align: center;
          padding: 24px;
          color: #6b7280;
        }
        .muted {
          color: #94a3b8;
        }
        .link {
          text-decoration: none;
          border: 1px solid #e5e7eb;
          padding: 6px 10px;
          border-radius: 10px;
          display: inline-block;
          transition: transform 0.08s ease, background 0.2s ease;
        }
        .link:hover {
          background: #f3f4f6;
          transform: translateY(-1px);
        }
        .error {
          color: #b91c1c;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}
