from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///esse_eu_ja_li.db'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    password_hash = db.Column(db.String(150), nullable=False)
    points = db.Column(db.Integer, default=0)
    trophies = db.Column(db.String(500), default="")

    def __init__(self, username, password):
        self.username = username
        self.password_hash = generate_password_hash(password)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(150), nullable=False)
    pages = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    users_read = db.Column(db.String(500), default="")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    books = Book.query.all()
    return jsonify([{'id': b.id, 'title': b.title, 'author': b.author, 'pages': b.pages, 'genre': b.genre} for b in books])

@app.route('/book/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    book = Book.query.get(book_id)
    return jsonify({'id': book.id, 'title': book.title, 'author': book.author, 'pages': book.pages, 'genre': book.genre})

@app.route('/mark_read', methods=['POST'])
@jwt_required()
def mark_read():
    data = request.get_json()
    book_id = data.get('book_id')
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    book = Book.query.get(book_id)
    
    if str(user.id) not in book.users_read.split(","):
        book.users_read += f"{user.id},"
        user.points += 1 + book.pages // 100

    db.session.commit()
    return jsonify({'message': 'Book marked as read'}), 200

@app.route('/ranking', methods=['GET'])
@jwt_required()
def ranking():
    users = User.query.order_by(User.points.desc()).limit(10).all()
    return jsonify([{'username': u.username, 'points': u.points} for u in users])

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    return jsonify({'username': user.username, 'points': user.points, 'trophies': user.trophies})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Dados de exemplo
        if not User.query.filter_by(username='user1').first():
            user = User(username='user1', password='password')
            db.session.add(user)
            db.session.commit()
        if not Book.query.filter_by(title='Livro Exemplo 1').first():
            book = Book(title='Livro Exemplo 1', author='Autor 1', pages=200, genre='Ficção Científica')
            db.session.add(book)
            db.session.commit()
    app.run(debug=True)
