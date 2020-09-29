import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
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
            const {logo, link, image, events, regularHours, colorPalette, products, name, homeAddress} = data;
            setRestaurant({logo, link, image, events, regularHours, colorPalette, products, name, homeAddress}); 
          }, [])
          .catch((e) => {console.log(e)})
  }, []);
  
  console.log(restaurant);

  return (
    <Grid container>
        <Header 
        name={restaurant.name} 
        logo={restaurant.logo} 
        link={restaurant.link} 
        language={language} 
        setSelectedLanguage={(selLang) => setLanguage(selLang)}
        />
      <Grid container item>
        <RestaurantInfo></RestaurantInfo>
      </Grid>
      <Grid container item>
        <Footer></Footer>
      </Grid>
    </Grid>
  );
}

export default App;
