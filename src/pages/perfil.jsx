import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarDetalhesUsuario } from '../services/api';
import { ArrowLeft, Users, Book, MapPin } from 'lucide-react';

export default function Perfil() {
  const { id } = useParams(); // Pega o nome do usuário da URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      const dados = await buscarDetalhesUsuario(id);
      setUsuario(dados);
    }
    carregarDados();
  }, [id]);

  if (!usuario) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Carregando...</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff', 
      padding: '40px 20px',
      fontFamily: '"Inter", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Botão Voltar */}
      <button 
        onClick={() => navigate('/')}
        style={{ 
          alignSelf: 'flex-start', 
          background: 'none', 
          border: 'none', 
          color: '#aaa', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '40px',
          fontSize: '1rem'
        }}
      >
        <ArrowLeft size={20} /> Voltar para a busca
      </button>

      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        textAlign: 'center',
        backgroundColor: '#1a1a1a',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid #2a2a2a'
      }}>
        <img 
          src={usuario.avatar_url} 
          alt={usuario.login} 
          style={{ width: '150px', borderRadius: '50%', marginBottom: '20px', border: '4px solid #333' }} 
        />
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>{usuario.name || usuario.login}</h1>
        <p style={{ color: '#646cff', fontSize: '1.2rem', marginBottom: '20px' }}>@{usuario.login}</p>
        
        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '30px' }}>
          {usuario.bio || "Este desenvolvedor prefere manter o mistério e não escreveu uma bio."}
        </p>

        {/* Info Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          borderTop: '1px solid #333',
          paddingTop: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Users size={18} color="#aaa" />
            <span><strong>{usuario.followers}</strong> seguidores</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Book size={18} color="#aaa" />
            <span><strong>{usuario.public_repos}</strong> repositórios</span>
          </div>
          {usuario.location && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', gridColumn: 'span 2' }}>
              <MapPin size={18} color="#aaa" />
              <span>{usuario.location}</span>
            </div>
          )}
        </div>

        <a 
          href={usuario.html_url} 
          target="_blank" 
          rel="noreferrer"
          style={{ 
            display: 'inline-block',
            marginTop: '40px',
            padding: '12px 30px',
            backgroundColor: '#fff',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600'
          }}
        >
          Ver no GitHub oficial
        </a>
      </div>
    </div>
  );
}