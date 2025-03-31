// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'moviesecret'; // Ты можешь хранить это в переменной окружения

// Подключение базы данных SQLite
const db = new sqlite3.Database('./movies.db', (err) => {
  if (err) {
    console.error('Ошибка подключения к SQLite:', err);
  } else {
    console.log('✅ Подключение к SQLite успешно');
    // Создание таблицы пользователей, если она не существует
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    // Создание таблицы фильмов
    db.run(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        release_date DATE NOT NULL,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Регистрация пользователя
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Введите email и пароль' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
    if (err) {
      return res.status(400).json({ message: 'Ошибка регистрации' });
    }
    res.status(201).json({ message: 'Регистрация успешна' });
  });
});

// Вход пользователя
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Введите email и пароль' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, message: 'Вход успешен' });
  });
});

// Защищенный маршрут для профиля
app.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: 'Нет токена, доступ запрещен' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Неверный или просроченный токен' });
    }

    const userId = decoded.id;
    db.all('SELECT * FROM movies WHERE user_id = ?', [userId], (err, movies) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка при получении фильмов' });
      }
      res.json({ user: decoded, movies });
    });
  });
});

// Добавление фильма
app.post('/add-movie', (req, res) => {
  const { title, genre, release_date } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: 'Нет токена, доступ запрещен' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Неверный или просроченный токен' });
    }

    const userId = decoded.id;
    db.run('INSERT INTO movies (title, genre, release_date, user_id) VALUES (?, ?, ?, ?)',
      [title, genre, release_date, userId], function(err) {
        if (err) {
          return res.status(500).json({ message: 'Ошибка при добавлении фильма' });
        }
        res.status(201).json({ message: 'Фильм добавлен' });
      });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
