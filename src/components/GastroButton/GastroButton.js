import React from "react";
import {Button, withStyles} from '@material-ui/core'
import { makeStyles, link } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        margin: `8px auto`,
        borderColor: props => props.primaryColor,
        color: props => props.primaryColor,
        backgroundColor: props => props.cotrastText
    },
  }));

const GastroButton = (props) => {
    const classes = useStyles(props);
    const {product, restaurantId, labels} = props;
    let link;
    let label;
    if (product === "reservation") {
        link = "https://r.gastronaut.ai/";
        label = labels.reservationButton;
    } else if (product === "menu") {
        link = "https://menu.gastronaut.ai/";
        label = labels.menuButton;
    } else if (product === "voucher") { 
        link = "https://v.gastronaut.ai/" 
        label = labels.voucherButton;
    } else if (product === "delivery") { 
        link = "https://menu.gastronaut.ai/"
        label = labels.deliveryButton;
    }

    return <Button className={classes.root} href={link + restaurantId } {...props}>{label}</Button>
}
export default GastroButton;