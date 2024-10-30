from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

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
