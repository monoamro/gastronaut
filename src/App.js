import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Footer from './components/Footer';
import RestaurantInfo from './components/RestaurantInfo';
import './App.css';

function App() {
  return (
    <Grid container>
      <Grid container item>
        <Header></Header>
      </Grid>
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
