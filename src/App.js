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
  // const restaurantId = "neo-heidelberg";
  // Testing the other restaurant 
  const restaurantId = "schillingroofbar";


  useEffect(() => {
    axios.get("https://api.gastronaut.ai/codeTest/" + restaurantId)
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
          image={restaurant.image} 
          name={restaurant.name}
          products={restaurant.products}
          colorPalette={restaurant.colorPalette}
          restaurantId={restaurantId}
          />
          <Footer />
          </> : <CircularProgress />
        }
      </Grid>
  );
}

export default App;
