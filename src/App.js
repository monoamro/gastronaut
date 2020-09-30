import React, { useEffect, useState } from 'react';
import {Grid,CircularProgress} from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantInfo from './components/RestaurantInfo';
import axios from 'axios';
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState(null);
  const [language, setLanguage] = useState("de");
  const neoHeidelbergApiCall = "https://api.gastronaut.ai/codeTest/neo-heidelberg";
  const schillingRoofBarApiCall = "https://api.gastronaut.ai/codeTest/schillingroofbar";

  useEffect(() => {
    axios.get(neoHeidelbergApiCall)
          .then((result) => {

            const {data} = result;
            console.log("data", data);
            const {logo, link, image, events, regularHours, colorPalette, products, name, homeAddress} = data;
            setRestaurant({logo, link, image, events, regularHours, colorPalette, products, name, homeAddress}); 
            console.log(restaurant);
          })
          .catch((e) => {console.log(e)})
  }, []);

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
        
          />
          <Footer />
          </> : <CircularProgress />
        }
      </Grid>
  );
}

export default App;
