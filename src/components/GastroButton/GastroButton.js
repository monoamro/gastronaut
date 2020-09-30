import React from "react";
import {Button, withStyles} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
    const {label} = props;
    return <Button className={classes.root} {...props}>{label}</Button>
}
export default GastroButton;