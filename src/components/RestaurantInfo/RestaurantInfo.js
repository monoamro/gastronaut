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
                fontSize="16px"
                />
              </Grid>
            );
          })
    );
}

const renderEvent = (event, neededDays, colorPalette, index, labels, restaurantId) => {
    const formattedToday = moment().format("YYYY-MM-DD");
    const eventDateValue = moment(event.date).diff(moment(formattedToday), 'days') === 0 ? labels.date.today : moment(event.date).diff(moment(formattedToday), 'days') === 1 ? labels.date.tomorrow : moment(event.date).format("ddd. DD. MM. YY");
    return (
        labels && 
            <Grid container alignItems="center" className="item" >
                <Grid item xs={4}>
                    {eventDateValue}
                </Grid>
                <Grid item xs={4}>
                    {event.available ? event.title : labels.closed }
                </Grid>
                <Grid item xs={4}>
                    {event.available &&
                    <GastroButton
                    fullWidth
                    primaryColor={colorPalette.contrastText} 
                    cotrastText={colorPalette.primaryColor}
                    fontSize="12px"
                    labels={labels}
                    restaurantId={restaurantId}
                    product={event}
                    />}
                </Grid>
            </Grid>
    )
}

const renderDay = (index, neededDays, labels, colorPalette, dayDateValue, dayDate, restaurantId) => {
    return (
        <Grid container alignItems="center" className="item" >
            <Grid item xs={4}>
                {dayDateValue}
            </Grid>
            <Grid item xs={4}>
                {neededDays[index] || labels.closed }
            </Grid>
            <Grid item xs={4}>
                {neededDays[index] && 
                    <GastroButton
                    fullWidth 
                    primaryColor={colorPalette.primaryColor} 
                    cotrastText={colorPalette.contrastText}
                    fontSize="12px"
                    labels={labels}
                    restaurantId={restaurantId}
                    product={"reserveSmall"}
                    date={dayDate}
                    />
                }
            </Grid>
        </Grid>
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

const renderListItem = (events, regularHours, colorPalette, labels, restaurantId) => {
    
    const firstDays = regularHours.slice((moment().day() - 1 ), -1);
    const secondDays = regularHours.slice(0, (6 - firstDays.length))
    const neededDays = firstDays.concat(secondDays);
    return (
        labels && neededDays.map((day, index) => {
            const dayDate = moment().add(index, 'days');
            const formattedDayDate = moment(dayDate).format('YYYY-MM-DD');
            const eventSameDay = _.find(events, (event) => event.date === formattedDayDate);
            const dayDateValue = index === 0 ? labels.date.today : index === 1 ? labels.date.tomorrow : moment().add(index, 'days').format("ddd DD. MM. YY");
            if (eventSameDay) {
                return renderEvent(eventSameDay, neededDays, colorPalette, index, labels, restaurantId)
            } else {
                return renderDay(index, neededDays, labels, colorPalette, dayDateValue, dayDate, restaurantId)
            }
        })
    )
}

const RestaurantInfo = ({image, name, products, colorPalette, restaurantId, labels, events, regularHours}) => {
    // TESTING if event is in the first 6-days
    // const adjustedEvents = [{date: '2020-10-14', title: 'Parakuya', status: 'BOOKABLE', id: 10, available: true}, ...events]
    // const filteredFutureEvents = getFutureEvents(adjustedEvents);
    const filteredFutureEvents = getFutureEvents(events);
    return (
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <img src={image} alt={name} className="restaurant-image"/>
          </Grid>
          <Grid item xs={12} className="event">
            {/* RENDERS the first 6 days including events */}
            {renderListItem(events, regularHours, colorPalette, labels)}

            {/* TESTS the first 6 days including events */}
            {/* {renderListItem(adjustedEvents, regularHours, colorPalette, labels, restaurantId)} */}

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