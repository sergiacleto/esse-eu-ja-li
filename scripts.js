fetch('data/livros.json')
  .then(response => response.json())
  .then(livros => {
    const listaLivros = document.getElementById('livros');

    livros.forEach(livro => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${livro.titulo}</strong><br>
        Autor: ${livro.autor}<br>
        Gênero: ${livro.genero}<br>
        Lido: ${livro.lido ? 'Sim' : 'Não'}
      `;
      listaLivros.appendChild(li);
    });
  });
   
