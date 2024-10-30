document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            document.querySelector('header').style.display = 'none';
            document.querySelector('main').style.display = '[_{{{CITATION{{{_1{](https://github.com/AlexNJ91/testimonials/tree/3760e931f3dfa33fe84649b8468f05d62768beeb/testimonials%2Froutes.py)[_{{{CITATION{{{_2{](https://github.com/ricardo-cas/pandas/tree/eefd8f3ed9250c15e029b7ae59a24ef9f7ffc4ab/GUIA_MARKDOWN.MD)[_{{{CITATION{{{_3{](https://github.com/stefaniaelenaa/Task3Tema/tree/44ef259f09d0c6f7c7eb6eb0c15ac0e2511a7f3b/login.php)[_{{{CITATION{{{_4{](https://github.com/constructorlabs/express-auth/tree/5726e181ceebb41d36f5301cf61c6ca31a8348d7/static%2Fclient.js)[_{{{CITATION{{{_5{](https://github.com/kurtp23/recipe-book/tree/e947ebd5a601a1323439482e4615f8b056bf7b55/public%2Fjs%2Flogin.js)[_{{{CITATION{{{_6{](https://github.com/wojtaszek171/SmartHome/tree/62a82f5e40989637e6de84a3e0793cf4bf446c9b/client%2Fsrc%2FrestService%2FrestService.js)
