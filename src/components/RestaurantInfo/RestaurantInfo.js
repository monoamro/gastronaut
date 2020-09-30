import React from 'react';
import Grid from '@material-ui/core/Grid';
import GastroButton from '../GastroButton';
import moment from 'moment';
import _ from 'lodash';
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

const renderEvent = (eventSameDay, regularHours, colorPalette, index, labels) => {
    return (
    <h1>event</h1>
    )
}

const renderDay = (index, regularHours, labels, colorPalette) => {
    return (
        <h1>day</h1>
    )
}
// Takes all events after 6 days from today
const getFutureEvents = (events) => {
    const filteredEvents = [];
    const dayLimit = moment().add(6, 'days').format("YYYY-MM-DD");
    events.map((event) => {
        if(moment(event.date).diff(moment(dayLimit), 'days') > 1) filteredEvents.push(event);
      });
    return filteredEvents;
}

const renderListItem = (events, regularHours, colorPalette, labels) => {
    const neededDays = regularHours.slice(0, 6);
    return (
        labels && neededDays.map((day, index) => {
            const dayDate = moment().add(index, 'days');
            const formattedDayDate = moment(dayDate).format('YYYY-MM-DD');
            const eventSameDay = _.find(events, (event) => event.date === formattedDayDate);
            if (eventSameDay) {
                return renderEvent(eventSameDay, regularHours, colorPalette, index, labels)
            } else {
                return renderDay(index, regularHours, labels, colorPalette)
            }
        })
    )
}

const RestaurantInfo = ({image, name, products, colorPalette, restaurantId, labels, events, regularHours}) => {
    // Testing if event is in the first 6-days
    const adjustedEvents = [{date: '2020-10-14', title: 'test', status: 'closed', id: 10}, ...events]
    const filteredFutureEvents = getFutureEvents(adjustedEvents);

    // const filteredFutureEvents = getFutureEvents(events);
    return (
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <img src={image} alt={name} className="restaurant-image"/>
          </Grid>
          <Grid item xs={12} className="event">
            {/* renders the first 6 days including events */}
            {/* {renderListItem(events, regularHours, colorPalette, labels)} */}
            {// Testing if event is in the first 6-days
            renderListItem(adjustedEvents, regularHours, colorPalette, labels)
            }
            {/* {if there are events after the 6 days this shows "..."} */}
            {filteredFutureEvents && filteredFutureEvents.length > 0 && <Grid className={'align-left'} item xs={12}>...</Grid>}
            {/* this shows events after the first 6 days */}
            {filteredFutureEvents && filteredFutureEvents.map((event, index) => renderEvent(event, regularHours, colorPalette, index, labels))}
          </Grid>
          <Grid item xs={12} className={'products'}>
            {renderProducts(products, colorPalette, labels, restaurantId)}
          </Grid>
        </Grid>
    )
}

export default RestaurantInfo;