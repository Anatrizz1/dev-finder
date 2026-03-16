import { useState } from 'react';
import { Search } from 'lucide-react';
import { buscarUsuariosGitHub } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [termo, setTermo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1); // O novo estado aqui
  const navigate = useNavigate();

  const itensPorPagina = 3;

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const usuariosExibidos = usuarios.slice(indicePrimeiroItem, indiceUltimoItem);

  async function lidarComBusca() {
    if (termo === "") return;
    try {
      const resultados = await buscarUsuariosGitHub(termo);
      setUsuarios(resultados);
      setPaginaAtual(1);
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  }

  return (
  <div style={{ 
    minHeight: '100vh',
    width: '100%', // Crucial para centralizar
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'flex-start', // Começa do topo
    padding: '80px 0', // Espaço no topo e embaixo
    boxSizing: 'border-box'
  }}>
      
      {/* Header Centralizado */}
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          letterSpacing: '-2px', 
          margin: '0 0 10px 0',
          color: '#ffffff'
        }}>
          DevFinder
        </h1>
        <p style={{ color: '#a0a0a0', fontSize: '1.2rem', fontWeight: '400' }}>
          Explore a rede de desenvolvedores do GitHub.
        </p>
      </header>

      {/* Formulário de Busca */}
      <form 
        onSubmit={(e) => { e.preventDefault(); lidarComBusca(); }}
        style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '500px', 
          gap: '10px',
          marginBottom: '80px'
        }}
      >
        <input 
          type="text" 
          placeholder="Nome do usuário..." 
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          style={{ 
            flex: 1,
            padding: '16px 20px', 
            borderRadius: '12px', 
            border: '1px solid #333',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.2s'
          }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '0 25px', 
            backgroundColor: '#ffffff', 
            color: '#000000', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.9'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          <Search size={20} /> Buscar
        </button>
      </form>

      {/* Grid de Resultados */}
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '30px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        {usuariosExibidos && usuariosExibidos.map((user) => (
          <div key={user.id} style={{ 
            backgroundColor: '#1a1a1a',
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            border: '1px solid #2a2a2a',
            transition: 'transform 0.2s'
          }}>
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                marginBottom: '20px',
                border: '3px solid #333'
              }} 
            />
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '20px', 
              color: '#fff',
              fontWeight: '600' 
            }}>{user.login}</h3>
            
            <button 
              onClick={() => navigate(`/perfil/${user.login}`)}
              style={{ 
                background: 'transparent', 
                border: '1px solid #444', 
                color: '#fff', 
                padding: '10px 20px', 
                borderRadius: '10px', 
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#252525'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Ver Perfil
            </button>
          </div>
        ))}
      </main>
      {usuarios.length > itensPorPagina && (
  <div style={{ marginTop: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
    <button 
      disabled={paginaAtual === 1}
      onClick={() => setPaginaAtual(paginaAtual - 1)}
      style={{ 
        background: 'none', border: '1px solid #444', color: paginaAtual === 1 ? '#444' : '#fff', 
        padding: '10px 20px', borderRadius: '8px', cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer' 
      }}
    >
      ← Anterior
    </button>

    <span>Página {paginaAtual}</span>

    <button 
      disabled={indiceUltimoItem >= usuarios.length}
      onClick={() => setPaginaAtual(paginaAtual + 1)}
      style={{ 
        background: 'none', border: '1px solid #444', color: indiceUltimoItem >= usuarios.length ? '#444' : '#fff', 
        padding: '10px 20px', borderRadius: '8px', cursor: indiceUltimoItem >= usuarios.length ? 'not-allowed' : 'pointer' 
      }}
    >
      Próxima →
    </button>
  </div>
)}
    </div>
  );
}