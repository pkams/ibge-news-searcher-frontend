import { createRef, useEffect, useState } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import About from '../About/About';
import api from '../../utils/api.js';
import { validateDate, convertDate, sortByKey } from '../../utils/utils.js';

require('dotenv').config();

function App() {
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedDate, setSelectedDate] = useState('dd/mm/aaaa');
  const [selectedNews, setSelectedNews] = useState(['']);
  const [searchTrigger, setsearchTrigger] = useState(false);
  const [searching, setSearching] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(3);
  const ref = createRef();

  useEffect(() => {
    if (
      (localStorage.getItem('uf') !== null) &
      (localStorage.getItem('city') !== null) &
      (localStorage.getItem('date') !== null)
    ) {
      setSelectedUf(JSON.parse(localStorage.getItem('uf')));
      setSelectedCity(JSON.parse(localStorage.getItem('city')));
      setSelectedDate(JSON.parse(localStorage.getItem('date')));
      setsearchTrigger(true);
    }
    api.getUf().then((response) => {
      setUfs(sortByKey(response, 'nome'));
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    api.getCities(selectedUf).then((response) => {
      setCities(sortByKey(response, 'nome'));
    });
  }, [selectedUf]);

  useEffect(() => {
    const button = ref.current;
    if (button == null) {
      return;
    }
    if ((selectedCity !== '0') & validateDate(selectedDate)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [selectedCity, selectedDate, ref]);

  useEffect(() => {
    if (
      !validateDate(selectedDate) |
      (selectedCity === '0') |
      (selectedUf === '0')
    ) {
      return;
    }

    api
      .getNews(selectedUf, selectedCity, selectedDate)
      .then(setSearching(true))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        if (response != null) {
          setSelectedNews(response.items);
          setSearching(false);
        }
      });
  }, [searchTrigger]);

  useEffect(() => {
    if (selectedNews[0] !== '') {
      localStorage.setItem('uf', JSON.stringify(selectedUf));
      localStorage.setItem('city', JSON.stringify(selectedCity));
      localStorage.setItem('date', JSON.stringify(selectedDate));
    }
  }, [selectedNews]);

  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<About />} />
        <Route
          path="/main"
          element={
            <Main
              selectedUf={selectedUf}
              selectedCity={selectedCity}
              selectedNews={selectedNews}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setSelectedCity={setSelectedCity}
              setSelectedUf={setSelectedUf}
              setsearchTrigger={setsearchTrigger}
              searchTrigger={searchTrigger}
              ufs={ufs}
              cities={cities}
              searching={searching}
              refVar={ref}
              disableButton={disableButton}
              convertDate={convertDate}
              itemsToShow={itemsToShow}
              setItemsToShow={setItemsToShow}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
