export async function buscarUsuariosGitHub(nome) {
  const resposta = await fetch(`https://api.github.com/search/users?q=${nome}`);
  const dados = await resposta.json();
  return dados.items; // O GitHub retorna os usuários dentro de uma lista chamada 'items'
}

// src/services/api.js

export async function buscarDetalhesUsuario(nome) {
  const resposta = await fetch(`https://api.github.com/users/${nome}`);
  const dados = await resposta.json();
  return dados;
}