import React from 'react';
import './header.css';
import news_img from '../../images/news.svg';

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__img"
        src={news_img}
        alt="Imagem da logo: Um desenho do planeta terra"
      />
      <h1 className="header__title">News Searcher Web App</h1>
    </header>
  );
}
