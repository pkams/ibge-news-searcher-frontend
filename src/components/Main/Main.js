import React from 'react';
import Preloader from '../Preloader/Preloader';
import Card from '../Card/Card';
import './main.css';

const { v4: uuid } = require('uuid');

export default function Main(props) {
  function handleSelectUf(evt) {
    const uf = evt.target.value;
    props.setSelectedCity('0');
    props.setSelectedUf(uf);
  }

  function handleSelectCity(evt) {
    const city = evt.target.value;
    props.setSelectedCity(city);
  }

  function handleSelectDate(evt) {
    const date = evt.target.value;
    props.setSelectedDate(date);
  }

  function activateSearch() {
    props.setItemsToShow(3);
    props.setsearchTrigger(!props.searchTrigger);
  }

  function increaseSeeMoreState() {
    props.setItemsToShow(props.itemsToShow + 3);
  }

  return (
    <main className="main">
      <h2 className="main__title">
        Selecione o estado, cidade e data de inicio para encontrar noticias
        relacionadas!
      </h2>
      <div className="main__forms">
        <div className="main__forms-item">
          <label>UF:</label>
          <select
            name="uf"
            id="uf"
            value={props.selectedUf}
            onChange={handleSelectUf}
            className="main__forms-item-input"
          >
            <option value="0" key="select_uf">
              Selecione uma UF
            </option>
            {props.ufs.map((uf) => (
              <option value={uf.sigla} key={uf.sigla}>
                {uf.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="main__forms-item">
          <label>Cidade:</label>
          <select
            name="city"
            id="city"
            value={props.selectedCity}
            onChange={handleSelectCity}
            className="main__forms-item-input"
          >
            <option value="0" key="select_city">
              Selecione uma cidade
            </option>
            {props.cities.map((city) => (
              <option value={city.nome} key={city.id}>
                {city.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="main__forms-item">
          <label>Data de inicio:</label>
          <input
            type="date"
            onChange={handleSelectDate}
            className="main__forms-item-input"
            value={props.selectedDate}
          />
        </div>

        <button
          onClick={activateSearch}
          className="main__forms-item-button"
          ref={props.refVar}
          disabled={props.disableButton}
        >
          Pesquisar
        </button>
      </div>

      <div className="main__content">
        {(props.selectedNews[0] === '') | props.searching
          ? ''
          : `${props.selectedNews.length} notícias encontradas.`}

        {props.searching ? (
          <Preloader />
        ) : (
          props.selectedNews
            .slice(0, props.itemsToShow)
            .map((news, i) =>
              news.length === 0 ? '' : <Card key={uuid()} news={news} idx={i} />
            )
        )}

        {(props.itemsToShow >= props.selectedNews.length) | props.searching ? (
          ''
        ) : (
          <button
            className="main__forms-see-more main__forms-item-button"
            onClick={increaseSeeMoreState}
          >
            Ver mais
          </button>
        )}
      </div>
    </main>
  );
}
