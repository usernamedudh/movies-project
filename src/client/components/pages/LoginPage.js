import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Переключатель между входом и регистрацией
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();  // Используем хук внутри компонента

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register(email, password);
      navigate('/login'); // После регистрации перенаправляем на страницу входа
    } else {
      await login(email, password);
      navigate('/profile'); // После логина перенаправляем на профиль
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
          <button className="toggle-button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? ' Login' : ' Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
