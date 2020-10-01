import React from "react";
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    root: {
        margin: `8px auto`,
        border: props => `${props.primaryColor} 1px solid`,
        color: props => props.primaryColor,
        backgroundColor: props => props.cotrastText,
        fontSize: props => props.fontSize,
        fontFamily: '"Ubuntu", sans-serif',
        borderRadius: '8px',
        "&:hover": {
            border: props => `${props.primaryColor} 1px solid`,
            color: props => props.primaryColor,
            backgroundColor: props => props.cotrastText,
        }
    },


  }));

const GastroButton = (props) => {
    const classes = useStyles(props);
    const {product, restaurantId, labels} = props;
    let link;
    let label;
    if (product === "reservation") {
        link = `https://r.gastronaut.ai/${restaurantId}`;
        label = labels.reservationButton;
    } else if (product === "menu") {
        link = `https://menu.gastronaut.ai/${restaurantId}`;
        label = labels.menuButton;
    } else if (product === "voucher") { 
        link = `https://v.gastronaut.ai/${restaurantId}` 
        label = labels.voucherButton;
    } else if (product === "delivery") { 
        link = `https://menu.gastronaut.ai/${restaurantId}`;
        label = labels.deliveryButton;
    } else if (product === "reserveSmall") {
        link = `https://r.gastronaut.ai/${restaurantId}/?date=${moment(props.date).format('YYYY-MM-DD')}`;
        label = labels.reservationButtonSmall;
    } else if (product.status === "BOOKABLE") {
        link = `https://t.gastronaut.ai/${restaurantId}/${product.id}`
        label = `${labels.ticketButton}`;
    } else if (product.status === "CLOSED") {
        link = ``
        label = `${labels.closed}`;
    }

    return <Button className={classes.root} href={link} {...props}>{label}</Button>
}
export default GastroButton;