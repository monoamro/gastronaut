import React from 'react';
import Grid from '@material-ui/core/Grid';
import GastroButton from '../GastroButton';
import './index.css';

const renderProducts = (products, colorPalette, labels, restaurantId) => {
    return (
        products && labels && products.map((product, index) => {
            return (
              <Grid key={index} item xs={12}>
                <GastroButton 
                fullWidth 
                primaryColor={colorPalette.contrastText} 
                cotrastText={colorPalette.primaryColor} 
                product={product} 
                labels={labels}
                restaurantId={restaurantId}
                />
              </Grid>
            );
          })
    );
}

const RestaurantInfo = ({image, name, products, colorPalette, restaurantId, labels}) => {
    return (
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <img src={image} alt={name} className="restaurant-image"/>
          </Grid>
          <Grid>

          </Grid>
          <Grid item xs={12} className={'products'}>
          {
              renderProducts(products, colorPalette, labels, restaurantId)
          }
          </Grid>
        </Grid>
    )
}

export default RestaurantInfo;