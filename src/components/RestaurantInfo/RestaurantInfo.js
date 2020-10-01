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

const renderEvent = (event, regularHours, colorPalette, index, labels, restaurantId) => {
    const formattedToday = moment().format("YYYY-MM-DD");
    const eventDateValue = moment(event.date).diff(moment(formattedToday), 'days') === 0 ? labels.date.today : moment(event.date).diff(moment(formattedToday), 'days') === 1 ? labels.date.tomorrow : moment(event.date).format("ddd. DD. MM. YY");
    return (
        <Grid container alignItems="center" className="item" >
            <Grid item xs={4}>
                {eventDateValue}
            </Grid>
            <Grid item xs={4}>
                event
            </Grid>
            <Grid item xs={4}>
                { labels &&
                <GastroButton
                fullWidth
                primaryColor={colorPalette.primaryColor} 
                cotrastText={colorPalette.contrastText} 
                labels={labels}
                restaurantId={restaurantId}
                product={"ticket"}
                />}
            </Grid>
        </Grid>
    )
}

const renderDay = (index, regularHours, labels, colorPalette, dayDateValue, restaurantId) => {
    return (
        <Grid container alignItems="center" className="item" >
            <Grid item xs={4}>
                {dayDateValue}
            </Grid>
            <Grid item xs={4}>
                {regularHours[index] || labels.closed }
            </Grid>
            <Grid item xs={4}>
                {regularHours[index] && 
                    <GastroButton
                    fullWidth 
                    primaryColor={colorPalette.contrastText} 
                    cotrastText={colorPalette.primaryColor} 
                    labels={labels}
                    restaurantId={restaurantId}
                    product={"reserveSmall"}
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
    const neededDays = regularHours.slice(0, 6);
    return (
        labels && neededDays.map((day, index) => {
            console.log(labels)
            const dayDate = moment().add(index, 'days');
            const formattedDayDate = moment(dayDate).format('YYYY-MM-DD');
            const eventSameDay = _.find(events, (event) => event.date === formattedDayDate);
            const dayDateValue = index === 0 ? labels.date.today : index === 1 ? labels.date.tomorrow : moment().add(index, 'days').format("ddd. DD. MM. YY");
            if (eventSameDay) {
                return renderEvent(eventSameDay, regularHours, colorPalette, index, labels, restaurantId)
            } else {
                return renderDay(index, regularHours, labels, colorPalette, dayDateValue, restaurantId)
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
            {/* testing the first 6 days including events */}
            {renderListItem(adjustedEvents, regularHours, colorPalette, labels, restaurantId)}
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