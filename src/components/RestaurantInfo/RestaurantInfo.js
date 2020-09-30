import React from 'react';
import Grid from '@material-ui/core/Grid';
import GastroButton from '../GastroButton';
import './index.css';

const renderProducts = ({products, colorPalette}) => {
    return (
        products.map((product, index) => {
            return (
              <Grid key={index} item xs={12}>
                <GastroButton 
                fullWidth primaryColor={colorPalette.contrastText} 
                cotrastText={colorPalette.primaryColor} 
                label={product}  
                />
              </Grid>
            );
          })
    );
}

const RestaurantInfo = ({image, name, products, colorPalette}) => {


    const renderProducts = (products, colorPalette) => {
        return (
          products.map((product, index) => {
            // const productLabel = product === "reservation" ? strings.reservationButton : product === "voucher" ? strings.voucherButton : product === "menu" ? strings.menuButton : product === "delivery" ? strings.deliveryButton : null
            return (
            <>
              <Grid key={index} item xs={12}>
              <GastroButton fullWidth primaryColor={colorPalette.contrastText} 
                       cotrastText={colorPalette.primaryColor} 
                       label={product}  
                       />
              </Grid>
            </>
            );
          })
        )
      }

    return (
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <img src={image} alt={name} className="restaurant-image"/>
          </Grid>
          <Grid>

          </Grid>
          <Grid item xs={12} className={'products'}>
          {
              renderProducts(products, colorPalette)
          }
          </Grid>
        </Grid>
    )
}

export default RestaurantInfo;