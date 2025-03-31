import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from './client/layout/Header';
import Footer from './client/layout/Footer';
import Main from './client/layout/Main';
import Movies from './client/components/Movies';
import { AuthProvider } from './client/components/context/AuthContext';
import LoginPage from './client/components/pages/LoginPage';
import ProfilePage from './client/components/pages/ProfilePage';

function App() {
  return (
    <AuthProvider> {/* Здесь оборачиваем все компоненты в AuthProvider */}
      <Router>
        <Header />
        <nav className="navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
