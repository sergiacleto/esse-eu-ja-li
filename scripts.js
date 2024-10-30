// Função para verificar o hash da senha
function verificarSenha(senha, hash) {
  // Neste exemplo, estamos usando a biblioteca bcrypt para comparar o hash
  const bcrypt = require('bcrypt');
  return bcrypt.compare(senha, hash);
}

// Função para realizar o login
async function realizarLogin(usuario, senha) {
  const response = await fetch('data/usuarios.json');
  const usuarios = await response.json();

  if (usuarios[usuario]) {
    const senhaHash = usuarios[usuario];
    if (await verificarSenha(senha, senhaHash)) {
      // Login bem-sucedido
      console.log('Login bem-sucedido!');
      // Aqui você pode redirecionar para outra página ou habilitar funcionalidades
    } else {
      console.log('Senha incorreta.');
    }
  } else {
    console.log('Usuário não encontrado.');
  }
}

// Exemplo de uso
realizarLogin('user1', 'password');
   
