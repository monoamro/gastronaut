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
    const {label, restaurantId} = props;
    const link = 
    (label === "reservation") ? "https://r.gastronaut.ai/" : 
    (label === "menu") ? "https://menu.gastronaut.ai/" : 
    (label === "voucher") ? "https://v.gastronaut.ai/" :
    (label === "delivery") ? "https://menu.gastronaut.ai/" : ""

    return <Button className={classes.root} href={link + restaurantId } {...props}>{label}</Button>
}
export default GastroButton;