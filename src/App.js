import React, { useEffect, useState } from 'react';
import {Grid,CircularProgress} from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantInfo from './components/RestaurantInfo';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de'
import './App.css';
import LanguageToggle from './components/LanguageToggle';
import { Alert } from '@material-ui/lab';

function App(props) {
  let defaultLanguage;
  navigator.languages.map((lang) => {
    lang.includes('de') ? defaultLanguage = 'de' : defaultLanguage = 'en'
    })
  const [restaurant, setRestaurant] = useState(null);
  const [labels, setLabels] = useState(null)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState(defaultLanguage);
  const restaurantId = props.match.params.restaurantId;

// Calls restaurant API for info 
useEffect(() => {
    axios.get(`https://api.gastronaut.ai/v02/language/codeTest/${language}`)
    .then((response) => {
      const { data } = response;
      setLabels(data);
    })
    .catch((error) => setError(error.response.data.message))
    moment.locale(language)
  }, [language]);

  useEffect(() => {
    axios.get(`https://api.gastronaut.ai/codeTest/${restaurantId}`)
    .then((response) => {
      const {data} = response;
      const {logo, link, image, events, regularHours, colorPalette, products, name, homeAddress} = data;
      setRestaurant({logo, link, image, events, regularHours, colorPalette, products, name, homeAddress}); 
    })
    .catch((error) => {
      setError(error.response.data.message);
      })
  }, [restaurantId]);

  // Renders alert message using Material UI Alern component

  const renderAlert = () => {
    return (
      <Grid container >
          <Grid item xs={11}>
              <Alert severity="error">{error}</Alert> 
          </Grid>
          <Grid item xs={1} className="language-toggle">
              <LanguageToggle language={language} setlanguage={(language) => setLanguage(language)} />
          </Grid>
      </Grid>
    )
  }

  // calls language API


  if (error) {
    return renderAlert();
  } else {
    return (
      <Grid container className={'content-container'}>
          {
            restaurant && language ? <>
            <Header 
            logo={restaurant.logo} 
            link={restaurant.link} 
            language={language} 
            setSelectedLang={(val) => setLanguage(val)}
            /> 
            <RestaurantInfo
            image={restaurant.image} 
            name={restaurant.name}
            products={restaurant.products}
            colorPalette={restaurant.colorPalette}
            events={restaurant.events}
            regularHours={restaurant.regularHours}
            restaurantId={restaurantId}
            labels={labels}
            />
            <Footer />
            </> : <CircularProgress />
          }
        </Grid>
    );
  }
}

export default App;
