import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Leer estado de autenticación desde Redux
    const { user, status, error } = useSelector(state => state.auth);

    // Ruta a la que redirigir tras login (o "/" por defecto)
    const from = location.state?.from || '/';

    // Cuando el login sea exitoso, navegar
    useEffect(() => {
        if (status === 'succeeded' && user) {
            navigate(from, { replace: true });
        }
    }, [status, user, navigate, from]);

    const handleSubmit = e => {
        e.preventDefault();
        // Despachamos el thunk de login
        dispatch(login({ username, password }));
    };

    const loading = status === 'loading';

    return (
        <div className="login">
            <h2 className="login__title">Iniciar Sesión</h2>
            <div className="login__film-container login__film-container--top">
                <div className="login__film"></div>
                <div className="login__film"></div>
            </div>
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login__form-group">
                    <label htmlFor="username" className="login__label">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        className="login__input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                <div className="login__form-group">
                    <label htmlFor="password" className="login__label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="login__input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
                {error && <p className="login__error">{error}</p>}
                <button type="submit" className="login__button" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default Login;
