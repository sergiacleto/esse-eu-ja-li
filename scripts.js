// Dados simulados
const users = [
    { username: "user1", password: "password", points: 10, trophies: "Leitor de Ficção Científica" }
];

const books = [
    { id: 1, title: "Livro Exemplo 1", author: "Autor 1", pages: 200, genre: "Ficção Científica" },
    { id: 2, title: "Livro Exemplo 2", author: "Autor 2", pages: 300, genre: "Fantasia" }
];

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        document.querySelector('header').style.display = 'none';
        document.querySelector('main').style.display = 'block';
        loadBooks();
        loadRanking();
        loadProfile();
    } else {
        document.getElementById('message').textContent = 'Invalid credentials';
    }
});

function loadBooks() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} - ${book.author}`;
        booksList.appendChild(li);
    });
}

function loadRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    users.sort((a, b) => b.points - a.points).forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} - ${user.points
