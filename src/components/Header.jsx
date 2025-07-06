// src/components/Header.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  // Define o título conforme a rota atual
  let titulo = 'Minha Biblioteca';
  if ( location.pathname === '/livros') {
    titulo = 'Livros';
  } else if (location.pathname === '/cadastro') {
    titulo = 'Cadastro ';
  }  {
    
  }

  return (
    <header className="header">
      <h1 className="header__title">{titulo}</h1>
      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'header__link header__link--active' : 'header__link'
          }
          end
        >
          Início
        </NavLink>
        <NavLink
          to="/livros"
          className={({ isActive }) =>
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Livros
        </NavLink>
        <NavLink
          to="/cadastro"
          className={({ isActive }) =>
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Cadastro
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
